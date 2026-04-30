# Домашняя работа: Doc as Code

> Инструкция для студентов.

**IDE:** рекомендуем [VS Code](https://code.visualstudio.com/) — бесплатный, работает на Windows и macOS, есть встроенный терминал и удобная работа с git.

**Терминал:** все команды в этой инструкции выполняются в терминале. В VS Code открой его через меню **Terminal → New Terminal** или сочетанием клавиш `` Ctrl+` `` (Windows) / `` Cmd+` `` (macOS).

**Демо-репозиторий:** все примеры из лекции доступны по ссылке — [github.com/itikineva/doc-as-a-code-workshop](https://github.com/itikineva/doc-as-a-code-workshop). Там можно посмотреть структуру папок, готовые конфиги и примеры документов.

## Содержание

- [Перед началом — проверь окружение](#перед-началом--проверь-окружение)
- [Шаг 1 — Создать репозиторий и склонировать](#шаг-1--создать-репозиторий-и-склонировать)
- [Вариант 1 — Markdown в GitHub](#вариант-1--markdown-в-github)
- [Вариант 2 — Docusaurus + GitHub Pages](#вариант-2--docusaurus--github-pages)
- [Структура проекта (пример)](#структура-проекта-пример)
- [Пример frontmatter](#пример-frontmatter)
- [Частые ошибки](#частые-ошибки)

---

## Перед началом — проверь окружение

Убедись, что установлены все необходимые инструменты. Выполни команды в терминале:

```bash
git --version    # нужна любая версия ≥ 2.x
node --version   # нужна версия ≥ 18.x (для Варианта 2)
npm --version    # нужна версия ≥ 9.x (для Варианта 2)
```

Если что-то не установлено:

| Инструмент | Windows | macOS |
|---|---|---|
| git | [git-scm.com](https://git-scm.com/downloads/win) | `brew install git` |
| Node.js + npm | [nodejs.org](https://nodejs.org/en) | `brew install node` |
| VS Code | [code.visualstudio.com](https://code.visualstudio.com/) | [code.visualstudio.com](https://code.visualstudio.com/) |

> **macOS:** если нет Homebrew, установи его сначала: [brew.sh](https://brew.sh)

После установки git настрой имя пользователя:

```bash
git config --global user.name "Имя Фамилия"
git config --global user.email "your_email@example.com"
```

---

## Шаг 1 — Создать репозиторий и склонировать

Этот шаг одинаков для обоих вариантов.

1. Создай **публичный** репозиторий на [github.com](https://github.com/).
2. Скопируй HTTPS-ссылку на репозиторий (кнопка **Code → HTTPS**, выглядит как `https://github.com/<username>/<repo>.git`).
3. Склонируй репозиторий на компьютер:

```bash
git clone https://github.com/<username>/<repo>.git
cd <repo>
```

4. Проверь, что всё настроено правильно:

```bash
git remote -v
# Должно вывести:
# origin  https://github.com/<username>/<repo>.git (fetch)
# origin  https://github.com/<username>/<repo>.git (push)
```

---

## Вариант 1 — Markdown в GitHub

Создаёшь техническую документацию в Markdown и публикуешь в репозиторий. Никакого дополнительного ПО не нужно.

### Структура папки docs

Создай в репозитории папку `docs` и разложи документацию по разделам.
Пример:

```
docs/
├── intro.md             # Карточка сервиса / обзор проекта
├── architecture/
│   └── arch.md          # Архитектура системы
├── api/
│   └── api-reference.md # Описание API
├── db/
│   └── data-model.md    # Модель данных
└── scenarios/
    └── scenario1.md     # Пользовательские сценарии
```

> Если артефакта нет — создай шаблон с заголовками разделов и кратким описанием каждого.

### Пример frontmatter

Добавляй в начало каждого `.md`-файла блок с метаданными — он помогает организовать навигацию:

```markdown
---
title: Архитектура системы
sidebar_position: 1
---

# Архитектура системы

Текст документа...
```

### Запушить документацию

```bash
git add .
git commit -m "docs: добавить техническую документацию"
git push
```

Готово. Пришли ссылку на репозиторий.

---

## Вариант 2 — Docusaurus + GitHub Pages

Разворачиваешь Docusaurus для генерации статического сайта и публикуешь на GitHub Pages.

### 2.1 Установить Docusaurus

В корне склонированного репозитория выполни:

```bash
npx create-docusaurus@latest my-website classic
cd my-website
```

> `my-website` — имя папки, можно изменить.

Проверь, что всё работает локально:

```bash
npm run start
```

Откроется браузер с `http://localhost:3000/`.

### 2.2 Настроить docusaurus.config.js

Открой `my-website/docusaurus.config.js` и измени следующие поля:

```js
url: 'https://<username>.github.io',      // твой GitHub username
baseUrl: '/<repository-name>/',           // имя репозитория, со слешами!
organizationName: '<username>',
projectName: '<repository-name>',
onBrokenLinks: 'warn',
onBrokenMarkdownLinks: 'warn',
trailingSlash: false,
deploymentBranch: 'gh-pages',
```

> **Важно:** `baseUrl` должен начинаться и заканчиваться на `/`. Например: `'/my-docs/'`.

Чтобы отключить раздел блога, найди в `presets` блок `classic` и добавь:

```js
presets: [
  ['classic', {
    blog: false,   // <-- отключить блог
    docs: { ... },
  }],
],
```

### 2.3 Установить плагины

```bash
npm install redocusaurus
npm install docusaurus-plugin-drawio
npm install @akebifiky/remark-simple-plantuml
```

| Плагин | Для чего |
|---|---|
| `redocusaurus` | Отображение OpenAPI-спецификации как документации |
| `docusaurus-plugin-drawio` | Встраивание диаграмм Draw.io прямо в страницы |
| `remark-simple-plantuml` | Рендеринг PlantUML-диаграмм из кода в Markdown |

Настройку плагинов в `docusaurus.config.js` смотри в примере этого репозитория: [my-website/docusaurus.config.js](my-website/docusaurus.config.js).

### 2.4 Добавить документацию

Помести документацию в папку `my-website/docs/`:

```
my-website/docs/
├── intro.md
├── architecture/
│   └── arch.md
├── api/
│   └── api-reference.md
└── ...
```

Не удаляй `intro.md` — он нужен как стартовая страница.

### 2.5 Настроить автодеплой через GitHub Actions

Создай файл `.github/workflows/deploy.yml` в корне репозитория (не внутри `my-website/`):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm
          cache-dependency-path: my-website/package-lock.json

      - name: Install dependencies
        run: npm ci
        working-directory: my-website

      - name: Build
        run: npm run build
        working-directory: my-website

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: my-website/build
```

> Токены и пароли не нужны — GitHub Actions использует встроенный `GITHUB_TOKEN`.

### 2.6 Настроить GitHub Pages

Затем в настройках репозитория: **Settings → Pages → Source** → выбери ветку `gh-pages`(или `main`), папку `/ (root)`.

### 2.7 Запушить

```bash
git add .
git commit -m "docs: добавить документацию Docusaurus"
git push
```

После пуша:
1. Перейди в **Actions** в своём репозитории — увидишь запущенный workflow.
2. Через 1–2 минуты сайт будет доступен по адресу `https://<username>.github.io/<repository-name>/`.

Пришли ссылку на репозиторий и на сайт.

---

## Структура проекта (пример)

```
<repo>/
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD для автодеплоя
├── my-website/
│   ├── docs/                 # Markdown-документация
│   │   ├── intro.md
│   │   ├── architecture/
│   │   └── api/
│   ├── static/               # Статические файлы (картинки и т.д.)
│   ├── src/                  # Кастомизация React-компонентов (не трогай пока)
│   ├── docusaurus.config.js  # Основной конфиг сайта
│   ├── sidebars.js           # Настройка навигации
│   └── package.json
└── README.md
```

---

## Пример frontmatter

Каждый Markdown-файл может начинаться с блока метаданных в формате YAML:

```markdown
---
title: Архитектура системы
sidebar_position: 2
description: Описание компонентов и взаимодействий
---

# Архитектура системы
```

| Поле | Что делает |
|---|---|
| `title` | Заголовок в навигации и вкладке браузера |
| `sidebar_position` | Порядок в боковом меню (чем меньше число, тем выше) |
| `description` | Описание для SEO и превью |

---

## Частые ошибки

### Сайт открывается, но стили сломаны / ссылки ведут не туда

Скорее всего, неверный `baseUrl`. Проверь:

```js
// ❌ Неверно
baseUrl: 'my-repo',

// ✅ Верно
baseUrl: '/my-repo/',
```

### `npm run start` — ошибка порта

Порт 3000 уже занят другим приложением. Запусти на другом порту:

```bash
npm run start -- --port 3001
```

### GitHub Actions упал с ошибкой `Permission denied`

В настройках репозитория: **Settings → Actions → General → Workflow permissions** → выбери **Read and write permissions**.

### После пуша сайт не обновился

Проверь вкладку **Actions** в репозитории — возможно, workflow ещё выполняется или завершился с ошибкой. Кликни на запуск, чтобы увидеть детали.

### Страница 404 на GitHub Pages

Убедись, что в **Settings → Pages** выбрана ветка `gh-pages`, а не `main`. Ветка появится после первого успешного деплоя.

### Плагин drawio / plantuml не работает

Убедись, что плагин добавлен в `docusaurus.config.js`, а не только установлен через `npm install`.
