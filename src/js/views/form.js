// функция показать ошибку

/**
 * Function inputErrorTemplate
 * @param {String} msg 
 */

// функция генерирует template
function inputErrorTemplate(msg) {
    return `
        <div class="invalid-feedback">${msg}</div>
    `;
}

/**
 * Function showInputError. Add input error
 * @param {HTMLInputElement} el
 */

export function showInputError(el) {
    const parent = el.parentElement; // ищем прямого родителя (забираем этот элемент)
    const msg = el.dataset.invalidMessage || 'Invalid input'; // у input забираем сообщение из data-, либо подставляем дефолтное значение
    const template = inputErrorTemplate(msg); // генерируем template
    el.classList.add('is-invalid'); // добавляем класс
    parent.insertAdjacentHTML('beforeend', template); // добавляем в шаблон наш template
}

// когда будет происходить фокусировка на input, мы будем удалять из него ошибку, которая там была. Для этго мы должны перебрать наш массив inputs и на каждой итерации навесить событие focus и обработчик этого события.

/**
 * Function removeInputError. remove input error
 * @param {HTMLInputElement} el
 */

export function removeInputError(el) {
    const parent = el.parentElement; // находим родителя (элемент)
    const err = parent.querySelector('.invalid-feedback'); // находим блок ошибки внутри родителя

    // если там нет этого элемента, мы ничего не делаем
    if (!err) return;

    el.classList.remove('is-invalid'); // если он есть, тчо мы удаляем класс с input
    parent.removeChild(err); // удаляем сам блок ошибки
}