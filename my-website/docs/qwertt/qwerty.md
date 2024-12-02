---
title: qwerty
sidebar_position: 1
---
# qwerty

#### qwerty

```plantuml

@startuml

actor Owner
participant "Petstore System" as System
participant "Database" as DB

== Создание питомца ==
Owner -> System: POST /pet
System -> System: Проверка данных
alt Данные корректны
    System -> DB: 
    DB --> System: 
    System --> Owner: 200 OK
else Ошибка в данных
    System --> Owner: 405 invalid input
end

@enduml


```
---
### Тут пример нумерации

1. **Owner** отправляет запрос: `POST /pet` с данными питомца.
2. **System** проверяет данные:
3. **System** сохраняет данные в **Database**.

---

### Тут таблица

| Параметр | Описание                               |
| -------- | -------------------------------------- |
| Owner    | Пользователь, который создает питомца. |
| System   | Система, которая обрабатывает запросы. |

---

### Тут список

* *Database** - база данных, в которой хранятся данные питомцев.
* *Petstore System** - система, которая обрабатывает запросы.
* *Owner** - пользователь, который создает питомца.

---

### Тут картинка -> просто вставьте ctrl+v
![ ](image.png)

### Тут ссылка 

[ссылка](https://google.com)