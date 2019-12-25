// Превый интерсептор, который на response (ответ от сервера) устанавливать token, сохранять его в localstorage.

const lsTokenKey = 'my_app_token'; // это ключ, под которым хранится token в localStorage мы вынесли в переменную

// следующий interceptor - установление token при запросах, которые уходят на любые адреса, кроме адресов, содержащих аутентификацию.
function serToken(req) { // применяется в запросе - request
    // мы должны проверить, что запрос идет не на адреса, связанные с аутентификацией
    const isAuthUrl = req.url.includes('auth'); // если в url содержится auth - адрес, то хначит, что запрос идет на аутентификацию.

    // далее мы проверяем, если текущий request не идет на адрес аутентификации, то мы обращаемся к нашему localStorage, делаем getItem по ключу, где хранится наш token и дальше в request добавляем заголовок  
    if (!isAuthUrl) {
        const token = localStorage.getItem(lsTokenKey);
        req.headers['x-access-token'] = token; // это заголовок для данного сервера и устанавливаем нужный нам token
    }

    return req;
}

function setTokenOnLogin(res) {
    // далее мы проверяем в конфигурации response адрес запроса содержит строку login
    const isLoginUrl = res.config.url.includes('login');

    if (isLoginUrl) {
        const token = res.data.token;
        localStorage.setItem(lsTokenKey, token);
    }
    
    return res;
}

// добавим еще один interceptor
function getClearResponse(res) {
    return res.data;
}

// мы можем обрабатывать ошибки в interceptors
function onError(err) {
    console.dir(err);
    // функция должна возвращать promise.reject для того, чтобы у на сотработал наш try/catch
    return Promise.reject(err);
}

export default function (axios) { // принимает экземпляр axios, который мы про-update-им в index.js
    axios.interceptors.request.use(setToken);
    // добавим interceptor
    axios.interceptors.response.use(setTokenOnLogin); // теперь при ответе сервера, если он был успешен, у нас сработает интерсептор и мы увидим в консоли response
    axios.interceptors.response.use(getClearResponse, onError); // первый интерсептор отработает, если запрос прошел успешно, а второй, если запрос прошел с ошибкой
}