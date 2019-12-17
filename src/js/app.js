import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import {validate} from './helpers/validate';
import {showInputError, removeInputError} from './views/form';
import {login} from './services/auth.service';

// с помощью деструктуризации мы достали наши элементы
const {form, inputEmail, inputPassword} = UI;

// собираем в массив наши input, поскольку мы должны будем удалять сообщения об ошибке при фокусировке на этот input
const inputs = [inputEmail, inputPassword];

// Events
// эту функцию мы будем вызывать, когда будет происходить событие submit у нашей формы
form.addEventListener('submit', e => {
    e.preventDefault(); // отменяем стандартное действие
    onSubmit();
});

// проходимся по всем input, на каждой итерации получаем элемент, на этот элемент вешаем обработчик на событие focus, и в качестве обработчика делаем стрелочную функцию, которая вызовет remove и передаст туда этот элемент, относительно которого мы должны удалить нашу ошибку.

inputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));

// Hendlers
async function onSubmit() {
    // нужно понимать валидна лився форма, если нет, то мыне должны отправлять запрос на сервер (возвращает true или false при переборе всего массива)
    const isValidForm = inputs.every(el => { // если хотя бы один элемент не валиден, то вернет false
        const isValidInput = validate(el); // должна вернуть нам true/false
        if (!isValidInput) {
            showInputError(el); // если наш input не валиден, то мы вызываем функцию show и передаем этот элемент (выведем ошибку)
        }
        return isValidInput;
    });

    if (!isValidForm) return; // проверяем, если форма не валижна, то мы прекращаем работу этой функции

    // иначе мы делаем запрос на login
    try {
        await login (inputEmail.nodeValue, unputPassword.value);
        form.reset();
        // show success notify: notify({msg: 'Login success', className: 'aletr-success', timeout: 1000}) - объект, где был бы какой-то messageб класс для стилизации и таймаут, чтобы эта нотификация через какое-то время удалялась
        
    } catch (err) {
        // show error notify
    }
}

// смысл в том, что мы собираем наши inputs, которые мы хотим валидировать, дальше мы бы хотели для каждого input вызывать специальную функцию, передавая туда этот input, а нам бы эта функция говорила валиден этот input или не валиден.