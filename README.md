# Shri_1

Одно из заданий [Школы Разработчиков Интерфейсов 2021](https://academy.yandex.ru/schools/frontend) проводимой Яндексом

Необходимо написать API по удалению фона у изображения.

## Endpoints
post `/upload` - загрузить изображение на сервер

get `/image/id` - получить изображение по id

get `/delete/id` - удалить изображение по id

get `/list` - получить список id доступных изображений

get `/merge?front={frontId}&back={backId}&color={color}&threshold={threshold}` - удалить цвет `color` в формате 'r,g,b' у изображения `frontId` и установить изображение `backId` в качестве фона. `threshold` - сила замены, представлена числом.

*Примечание:* У изображений должны быть одинаковые размеры

## Запуск проекта
Установить зависимости `npm install`

Запустить сервер `npm run start`

Перейти на https://localhost:8080
