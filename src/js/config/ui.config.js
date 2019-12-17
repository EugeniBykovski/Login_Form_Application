// создаем объект, в котором вытягиваем из формы нужные элементы
const UI = {
    form: document.forms['loginForm'],
    inputEmail: document.getElementById('email'),
    inputPassword: document.getElementById('password'),
};

export default UI;