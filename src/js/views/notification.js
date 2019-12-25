
function getConteiner() {
    return document.querySelector('.notify-container');
}

function alertTemplate(masg, className, index) {
    return `
        <div class="alert ${className}" data-index="${index}">
            ${msg};
        </div>
    `;
}

function notifyContainerTemplate() {
    return `
        <div class="notify-container" style="position: fixed; top: 10px; right: 10px; z-index: 999;"></div>
    `;
}

function createNotifyContainer() {
    const template = notifyContainerTemplate();
    document.body.insertAdjacentHTML('afterbegin', template);
}

// генерируем индекс
function getAlertIndex() {
    return document.querySelectorAll('.notify-container .alert'); // вернем сколько у нас сейчас уже есть alrt-ов в контейнере.
}

/**
 * Function notify. Show notification message.
 * @param {Object} settings
 * @param {String} settings.msg
 * @param {String} settings.className
 * @param {Number} settings.timeout
 */

export function notify({
    msg = 'Info message', 
    className = 'alert-info', 
    timeout = 2000,
} = {}) {
    // проверяем, существует ли этот контейнер
    if (!getConteiner()) {
        createNotifyContainer(); // если его не было, то мы его вызываем
    }

    // передаем в качестве индекса число index
    const index = getAlertIndex();

    // теперь мы должны создать сам alert
    const template = alertTemplate(msg, className, index); // index - мы планируем удалять наши alert (пока ошибка в том, что удалится первый подходящий под селектор). Индекс - определяет, при удалении элемента, какой именно элемент нам нужно удалить.

    // иначе:
    const container = getConteiner();

    container.insertAdjacentHTML('beforeend', template);

    setTimeout(() => closeNotify(index), timeout); 
}

export function closeNotify(index) {
    // будем проверять, если индекса нет, то мы будем удалять первый попавшийся alert, если индекс передан, то будем удалять alert по этому индексу.
    let alert;

    if (index === undefined) {
        alert = document.querySelector('.notify-cintainer .alert');
    } else {
        alert = document.querySelector(`.notify-cintainer .alert[data-index="${index}"]`);
    }

    // если alert нет,
    if (!alert) {
        console.warn('Alert not found');
        return;
    }

    const container = getConteiner();
    container.removeChild(alert);
}