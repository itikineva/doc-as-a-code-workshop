---
title: Модель данных
sidebar_position: 1
description: ERD-диаграмма и описание таблиц базы данных HeroTask
---

import Drawio from '@theme/Drawio'
import diagram from '!!raw-loader!./model.drawio';

## ERD-диаграмма

<Drawio content={diagram} editable={false} />

:::note
Диаграмма отражает основные сущности системы и связи между ними. Редактируемая версия файла `model.drawio` находится рядом с этой страницей в репозитории.
:::

## HERO

Реестр супергероев.

| Название | Тип | Описание |
| -------- | --- | -------- |
| id | bigint | Идентификатор героя (PK) |
| name | varchar(100) | Псевдоним героя |
| alias | varchar(100) | Настоящее имя (засекречено) |
| abilities | text[] | Список способностей |
| status | enum | Статус: `available`, `on_mission`, `resting` |
| missions_count | int | Количество выполненных заданий |
| created_at | timestamp | Дата регистрации |

## INCIDENT

Зарегистрированные инциденты — угрозы, требующие вмешательства.

| Название | Тип | Описание |
| -------- | --- | -------- |
| id | bigint | Идентификатор инцидента (PK) |
| title | varchar(255) | Краткое описание угрозы |
| description | text | Подробное описание |
| danger_level | smallint | Уровень опасности от 1 (низкий) до 5 (критический) |
| location | varchar(255) | Адрес или координаты |
| status | enum | Статус: `open`, `assigned`, `resolved`, `cancelled` |
| created_at | timestamp | Время регистрации |

## TASK

Назначение супергероя на инцидент.

| Название | Тип | Описание |
| -------- | --- | -------- |
| id | bigint | Идентификатор задачи (PK) |
| hero_id | bigint | Ссылка на HERO (FK) |
| incident_id | bigint | Ссылка на INCIDENT (FK) |
| status | enum | Статус: `active`, `completed`, `failed` |
| assigned_at | timestamp | Время назначения |
| completed_at | timestamp | Время завершения (nullable) |
| notes | text | Комментарий по итогам задания |

:::warning Ограничение
Один герой не может иметь более одной активной задачи одновременно. Попытка назначить героя со статусом `on_mission` вернёт ошибку `409 Conflict`.
:::
