// Интерсепторы для рпиложения

/*
Как сейчас у нас работает Axios?
У нас есть некий модуль Auth service. Мы в него подключаем axios и используем для запросов login. Еще мы подключаем Config API, где у нас хранится адрес нашего api. Плюс мы проставляем заголовки.  

Под каждую конкретную сущность (например, News) нам также необходимо подключать axios и делать вес тоже самое, подставлять url, заголовки json могут быть и т.д.

Мы создадим отдельный модуль Axios, туда импортируем саму библиотеку axios. Дальше мы обновим сам instance axios (при помощи метода create), добавим сами интерсепторы. И дальше мы уже будем везде импортировать не библиотеку axios, а наш модуль, который мы создали (некая обертка над библиотекой, которая у нас была). Этот модуль будет использоваться в любом другом сервисе и у нас будет единое место для настройки.
*/