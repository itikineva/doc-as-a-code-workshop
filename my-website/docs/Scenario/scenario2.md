---
title: Назначение героя на инцидент
sidebar_position: 2
description: Сценарий назначения доступного супергероя на зарегистрированный инцидент
---

Диспетчер выбирает свободного супергероя и назначает его на открытый инцидент. Система проверяет доступность героя и создаёт задачу. Предварительное условие: инцидент зарегистрирован ([сценарий 1](./scenario1)) и имеет статус `open`.

```plantuml
@startuml

actor "Диспетчер" as dispatcher
participant "HeroTask API" as api
participant "База данных" as db
participant "Kafka" as kafka

== Назначение героя ==

dispatcher -> api: POST /tasks\n{hero_id: 42, incident_id: 7}
api -> db: SELECT status FROM hero WHERE id = 42
db --> api: status = "available"

alt Герой доступен
    api -> db: INSERT INTO task\n(hero_id=42, incident_id=7, status="active")
    api -> db: UPDATE hero SET status = "on_mission"\nWHERE id = 42
    api -> db: UPDATE incident SET status = "assigned"\nWHERE id = 7
    db --> api: OK
    api -> kafka: событие task_assigned\n{task_id, hero_id, incident_id}
    api --> dispatcher: 201 Created\n{id: 99, status: "active"}
else Герой недоступен (on_mission / resting)
    api --> dispatcher: 409 Conflict\n{code: "HERO_NOT_AVAILABLE"}
end

@enduml
```

## Алгоритм

1. Диспетчер отправляет запрос `POST /tasks` с телом:
   - `hero_id` — идентификатор выбранного героя (обязательно)
   - `incident_id` — идентификатор открытого инцидента (обязательно)

2. API проверяет статус героя в базе данных:
   - Если `available` — переходит к шагу 3
   - Если `on_mission` или `resting` — возвращает `409 Conflict`

3. При успешной проверке API атомарно:
   - Создаёт запись в таблице `TASK` со статусом `active`
   - Переводит героя в статус `on_mission`
   - Переводит инцидент в статус `assigned`

4. Отправляет событие `task_assigned` в Kafka для уведомления героя.

5. Возвращает диспетчеру `201 Created` с данными созданной задачи.

:::warning
Если между проверкой доступности и созданием задачи другой диспетчер успел назначить того же героя, второй запрос вернёт `409 Conflict`. Оптимистичная блокировка предотвращает двойное назначение.
:::
