---
title: Архитектура
sidebar_position: 1
description: Контекстная (C1) и контейнерная (C2) диаграммы системы HeroTask
hide_table_of_contents: false
---

## C1 — Контекстная диаграмма

Диаграмма показывает систему HeroTask в окружении внешних участников и сервисов.

```plantuml
@startuml
!define RECTANGLE class

actor "Диспетчер" as dispatcher
actor "Супергерой" as hero

rectangle "HeroTask System" as herotask {
}

rectangle "Alert Service\n(внешний)" as alert
rectangle "Map API\n(внешний)" as maps
rectangle "Notification Service\n(внешний)" as notify

dispatcher --> herotask : регистрирует инциденты,\nназначает героев
hero --> herotask : обновляет статус задачи
alert --> herotask : входящие сигналы об угрозах
herotask --> maps : геолокация инцидентов
herotask --> notify : push-уведомления герою

@enduml
```

## C2 — Контейнерная диаграмма

Диаграмма раскрывает внутренние компоненты системы HeroTask и их взаимодействие.

```plantuml
@startuml
actor "Диспетчер" as dispatcher

rectangle "Frontend\n[React 18]" as frontend
rectangle "Backend API\n[Spring Boot 3]" as backend
database "PostgreSQL 15\n[основное хранилище]" as db
rectangle "Redis 7\n[кэш, сессии]" as redis
rectangle "Kafka 3\n[очередь событий]" as kafka
rectangle "Notification Worker\n[Spring Boot]" as worker

dispatcher --> frontend : HTTPS
frontend --> backend : REST API
backend --> db : SQL
backend --> redis : кэширование\nстатусов
backend --> kafka : события\n(task_assigned, task_done)
kafka --> worker : подписка
worker --> dispatcher : push-уведомления

@enduml
```

## Внешние зависимости

| Сервис | Тип интеграции | Описание |
| ------ | -------------- | -------- |
| Alert Service | REST (входящий) | Автоматическая передача сигналов о новых угрозах |
| Map API (Yandex Maps) | REST (исходящий) | Геолокация и маршруты к инцидентам |
| Notification Service | Kafka (исходящий) | Push-уведомления на устройства супергероев |
| Yandex Cloud S3 | SDK (исходящий) | Хранение фотографий профилей героев |
