const https = require('https');
const fs = require('fs');
const url = require('url');
const path = require('path');
const UriTemplate = require('uritemplate');
const tokens = require('./tokens.json');
const pack = require('../package.json');
const bodyTemplate = `### Для всех браузеров

- 

### Chrome

- 

### Opera

-  

### Firefox

- 

`;

let uploadUrlTemplate;

function post(postUrl, type, data) {
    return new Promise((resolve, reject) => {
        const urlDetails = url.parse(postUrl);
        const options = {
            hostname: urlDetails.hostname,
            path: urlDetails.path,
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `token ${tokens.github}`,
                'User-Agent': 'Yandex Music Fisher',
                'Content-Type': type,
                'Content-Length': Buffer.byteLength(data)
            }
        };
        const request = https.request(options, res => {
            let data = '';

            if (res.statusCode !== 201) {
                reject(new Error(`HTTP status: ${res.statusCode}`));
            }
            res.setEncoding('utf8');
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        });

        request.write(data);
        request.on('error', reject);
        request.end();
    });
}

function createGithubRelease() {
    const releasesUrl = 'https://api.github.com/repos/egoroof/yandex-music-fisher/releases';
    const data = JSON.stringify({
        tag_name: `v${pack.version}`,
        name: pack.version,
        draft: true,
        body: bodyTemplate
    });

    return post(releasesUrl, 'application/json', data);
}

function uploadGithubAsset(platform) {
    const assetName = `yandex-music-fisher_${pack.version}_${platform}.zip`;
    const uploadUrl = uploadUrlTemplate.expand({name: assetName});
    const buffer = fs.readFileSync(path.join(path.dirname(__dirname), 'dist', assetName));

    return post(uploadUrl, 'application/zip', buffer);
}

createGithubRelease()
    .then(response => {
        console.log(`GitHub release draft '${pack.version}' was created`);
        uploadUrlTemplate = UriTemplate.parse(response.upload_url);
    })
    .then(() => uploadGithubAsset('chrome'))
    .then(() => console.log('+ chrome asset'))
    .then(() => uploadGithubAsset('firefox'))
    .then(() => console.log('+ firefox asset'))
    .then(() => uploadGithubAsset('opera'))
    .then(() => console.log('+ opera asset'))
    .catch(e => {
        console.error(e);
        process.exit(1);
    });
