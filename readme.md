#Yandex Music Fisher (0.2.6)

Расширение Chromium для загрузки музыки с сервиса [Яндекс.Музыка](http://music.yandex.ru/).

![Yandex Music Fisher](/publish/screen.png)

[Список изменений](/changes.md)

### Требования
1. Браузер на базе Chromium версии большей или равной __31__
([Chrome](http://www.google.com/chrome) [31+], [Яндекс.Браузер](http://browser.yandex.ru),
[Амиго](http://amigo.mail.ru), [Opera](http://www.opera.com/) [25+])
2. Включенная новая версия сайта Яндекс.Музыка
(Из старой версии можно перейти на новую нажав на ссылку в верхнем меню "Новая Музыка").


### Подключение

[Скачайте](https://github.com/egoroof/yandex-music-fisher/archive/master.zip), 
перенесите папку __src__ на страницу расширений.

### Как пользоваться

Открыть страницу на [Яндекс.Музыка](http://music.yandex.ru/) с нужным ![blue](/src/img/blue.png) треком,
![yellow](/src/img/yellow.png) альбомом или ![green](/src/img/green.png) плейлистом, нажать на появившуюся иконку.
Далее пойдёт автоматический процесс скачивания. Можно покинуть сайт Яндекс Музыки.
Кроме того, со страницы исполнителя можно скачать его дискографию.

![Yandex Music Fisher](/publish/discography.png)

### Пути сохранения

- Все загрузки сохраняются в папку, которая указана в настройке браузера "__Расположение загружаемых файлов__".
- Для __дискографии__ создаётся отдельная папка с именем исполнителя, в которую сохраняются альбомы.
- Для __альбома__ / __плейлиста__ создаётся отдельная папка с именем исполнителя и названием альбома / плейлиста.
- Если __альбом__ состоит из нескольких дисков, то создаются соответствующие папки.

![Yandex Music Fisher](/publish/notifications.png)
