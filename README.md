# Настройка Docusaurus для GitHub Pages

## 1. Создание репозитория на GitHub
1. Создай репозиторий на GitHub, если его еще нет.
2. Убедись, что у тебя есть права на запись в этот репозиторий.

## 2. Установка Docusaurus
Если ты еще не создал проект Docusaurus, сделай это:

```bash
npx create-docusaurus@latest my-website classic
cd my-website
npm install
```

## 3. Настройка docusaurus.config.js
Открой файл docusaurus.config.js и внеси следующие изменения:

Установи поле url в адрес твоего сайта:
```javascript
url: 'https://<username>.github.io'
```
Укажи baseUrl:
```javascript
baseUrl: '/<repository-name>/'
```
Если сайт будет размещаться в корне (например, в <username>.github.io), используй /.

Добавь значения organizationName и projectName:
```javascript
organizationName: '<username>', // Имя GitHub пользователя или организации
projectName: '<repository-name>', // Имя репозитория
```
Убедись, что trailingSlash установлено на false:
```javascript
trailingSlash: false
```

## 4. Установка плагина для GitHub Pages
Установи плагин:

```bash
npm install @docusaurus/plugin-pwa --save
```

Добавь плагин в docusaurus.config.js:

```javascript
plugins: [
  [
    '@docusaurus/plugin-pwa',
    {
      debug: false,
      offlineModeActivationStrategies: ['appInstalled', 'standalone'],
      injectManifestConfig: {
        maximumFileSizeToCacheInBytes: 5000000,
      },
    },
  ],
];
```

## 5. Добавление скрипта для деплоя
В файл package.json добавь команду для деплоя:

```json
"scripts": {
  "deploy": "GIT_USER=<your-github-username> USE_SSH=true docusaurus deploy"
}
```

6. Развертывание проекта
Скомпилируй проект:
bash
Копировать код
npm run build
Запусти команду деплоя:
bash
Копировать код
npm run deploy
7. Настройка GitHub Pages
В настройках репозитория на GitHub перейди в Settings → Pages.
Укажи ветку gh-pages и нажми Save.
8. Проверка
После выполнения этих шагов твой сайт станет доступен по адресу:

php
Копировать код
https://<username>.github.io/<repository-name>/