// создаем объект с регулярными выражениями, в котором мы можем спокойно добавить другой data-атрибут, написать какое-то имя, а в самом объекте создать это же свойство и написать для него регулярное выражение. Таким образом, нам не важно, какое у нам кол-во input, у нас все будет регулироваться с помощью нашего объекта.

const regExpDic = {
    email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
    password: /^[0-9a-zA-Z]{4,}$/,
};

// функция, которая занимается валидацией

/**
 * Function validate. Check input on RegExp provided in regExpDic by input data-required type
 * @param {HTMLInputElement} el
 * @returns {Boolean} - Return true if input valid or doesnt data-required attr
 */

export function validate(el) {
  const regExpName = el.dataset.required; // забирает нащвание input
  if (!regExpDic[regExpName]) return true; // если в нашем dic нет регулярного выражения под наш input, то мы делаем return true (мы считаем, что данный input не требует валидации)

  return regExpDic[regExpName].test(el.value); // иначе применяем метод test, принимает в качестве значения какую-то строку
}