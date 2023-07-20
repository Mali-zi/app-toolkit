# Поиск фильмов по каталогу IMDb и добавление найденных фильмов в "Избранное"

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

Также использованы библиотеки React Router и React-Bootstrap.
Задача реализована на TypeScript.

## Механика

1. Созданы роуты для поиска фильма:
-  главный роут 
<img width="900" alt="home-screenshot" src="https://github.com/Mali-zi/app-toolkit/blob/master/src/img/home-screenshot.JPG">

-  Watchlist (избранное)
<img width="900" alt="watchlist-screenshot" src="https://github.com/Mali-zi/app-toolkit/blob/master/src/img/watchlist-screenshot.JPG">

-  карточка просмотра фильма
<img width="900" alt="viewcard-screenshot" src="https://github.com/Mali-zi/app-toolkit/blob/master/src/img/viewcard-screenshot.JPG">

2. Реализованы компоненты для поиска, отображения найденных фильмов, карточку одного фильма с его описанием.
3. При вводе IMDb ID в строку поиска отправляется запрос к API. Во время запроса показывается прелодер. После успешного получения ответа убирается прелодер, показывается фильм, если таковой был найден. 
4. Любой из найденный фильмов можно добавить в "Watchlist". При переключении на вкладку "Watchlist" показываются фильмы, которые были туда добавлены. Любой фильм можно удалить из "Watchlist".
