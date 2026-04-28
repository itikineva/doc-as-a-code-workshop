# Doc as Code — демо

Репозиторий для демо-лекции по подходу **Docs as Code** для системных аналитиков.

Показывает, как писать техническую документацию в Markdown, хранить её в git и публиковать как статический сайт с помощью Docusaurus.

## Что внутри

```text
.
├── my-website/               # Docusaurus-сайт с примером документации
│   ├── docs/                 # Markdown-документация (архитектура, API, БД, сценарии)
│   ├── api_specs/            # OpenAPI-спецификации
│   ├── style-guide/          # Руководство по стилю документации
│   └── docusaurus.config.js  # Конфигурация сайта
├── .github/workflows/
│   └── deploy.yml            # Автодеплой на GitHub Pages
└── HOMEWORK.md               # Инструкция для студентов
```

## Стек

| Инструмент | Назначение |
| --- | --- |
| [Docusaurus 3](https://docusaurus.io/) | Генератор статического сайта |
| [redocusaurus](https://redocusaurus.vercel.app/) | Отображение OpenAPI-документации |
| [docusaurus-plugin-drawio](https://github.com/xiguaxigua/docusaurus-plugin-drawio) | Диаграммы Draw.io |
| [@akebifiky/remark-simple-plantuml](https://github.com/akebifiky/remark-simple-plantuml) | Диаграммы PlantUML |
| GitHub Actions | CI/CD — сборка и деплой на GitHub Pages |

## Локальный запуск

```bash
cd my-website
npm install
npm run start
# → http://localhost:3000/doc-as-a-code-workshop/
```

## Для студентов

Инструкция по домашней работе — в файле [HOMEWORK.md](HOMEWORK.md).

## Полезные плагины для VS Code

- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- [Draw.io Integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)
- [OpenAPI (Swagger) Editor](https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi)
- [PlantUML](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)
- [Markdown Table](https://marketplace.visualstudio.com/items?itemName=TakumiI.markdowntable)
