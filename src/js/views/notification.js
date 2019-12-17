let notifyContainer = document.querySelector('.notify-container');


/**
 * Function notify. Show notification message.
 * @param {Object} settings
 * @param {String} settings.msg
 * @param {String} settings.className
 * @param {Number} settings.timeout
 */

export function notify({msg = 'Info message', className = 'alert-info', timeout = 2000} = {}) {
    // проверяем, существует ли этот контейнер
    if (!notifyContainer) {
        
    }
}