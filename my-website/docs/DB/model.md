---
title: ERD
sidebar_position: 1
---

# Модель данных

import Drawio from '@theme/Drawio'
import diagram from '!!raw-loader!./model.drawio';

<Drawio content={diagram} editable={false} />


## PET

| Название | Тип     | Описание              |
| -------- | ------- | --------------------- |
| id       | int     | Идентификатор питомца |
| name     | varchar | Имя питомца           |
| status   | enum    | Статус питомца        |
| photo    | varchar | Фото                  |

