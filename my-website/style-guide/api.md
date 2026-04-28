---
title: API-документация (Redocusaurus)
sidebar_position: 4
description: Как встроить интерактивную OpenAPI-документацию на страницу Docusaurus с помощью redocusaurus
---

Плагин `redocusaurus` позволяет встраивать интерактивный Swagger UI прямо в Docusaurus-страницу. Читатель видит документацию API с поиском, примерами запросов и ответов — без отдельного Swagger-сервера.

## Шаг 1 — Зарегистрировать спецификацию в конфиге

В `docusaurus.config.js` в секции `presets` добавь блок `redocusaurus` со ссылкой на OpenAPI-файл:

```js title="docusaurus.config.js"
presets: [
  ['classic', { /* ... */ }],
  [
    'redocusaurus',
    {
      specs: [
        {
          id: 'my-api',                        // уникальный идентификатор спеки
          spec: 'api_specs/my-api.yaml',       // путь к файлу относительно my-website/
        },
      ],
      theme: {
        primaryColor: '#1890ff',
      },
    },
  ],
],
```

:::note
Поле `id` используется как ключ при подключении спеки на странице. Один конфиг может содержать несколько спецификаций с разными `id`.
:::

## Шаг 2 — Создать страницу с ApiDocMdx

Создай `.md`-файл в нужном разделе `docs/` и используй компонент `ApiDocMdx`:

```md title="docs/api/herotask.md"
---
title: API Reference
sidebar_position: 1
description: Интерактивная документация REST API
hide_table_of_contents: true
---

import ApiDocMdx from '@theme/ApiDocMdx';

<ApiDocMdx id="herotask" />
```

Значение `id` в `<ApiDocMdx id="..." />` должно совпадать с `id` из `docusaurus.config.js`.

:::tip
Добавляй `hide_table_of_contents: true` во frontmatter — у страницы с Redoc не будет смысла в правой навигации Docusaurus, она перекрывала бы интерфейс.
:::

## Структура файлов

```
my-website/
├── api_specs/
│   └── my-api.yaml          # OpenAPI-спецификация
└── docs/
    └── api/
        └── my-api.md        # страница с ApiDocMdx
```

## Пример из этого проекта

Рабочий пример — в файле [`docs/api/herotask.md`](/docs/api/herotask) и спецификации `api_specs/herotask-openapi.yaml`.
