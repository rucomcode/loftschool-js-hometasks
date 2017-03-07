/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    return full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1;
}

/**
 * Создает новый tr для таблицы со списком cookie
 *
 * @param name - имя cookie
 * @param value - значение cookie
 */
function createCookieTr(name, value) {
    let tr = document.createElement('tr');

    tr.innerHTML = `<td>${name}</td>
                    <td>${value}</td>
                    <td><button class='delete-cookie'>x</button></td>`;

    return tr;
}

function createArrayFromCookies(cookies) {
    var result = [];
    var cookiesArray = cookies.split('; ').filter(item => Boolean(item));

    cookiesArray.forEach(item => {
        let splitedCookie = item.split('=');
        let obj = {
            name: splitedCookie[0],
            value: splitedCookie[1]
        };

        result.push(obj);
    });

    return result;
}

function filterCookies(cookiesArray, filterValue) {
    return cookiesArray.filter(item => {
        return isMatching(item.name, filterValue) || isMatching(item.value, filterValue);
    });
}

function showTable(cookiesArray) {
    listTable.innerHTML = '';
    cookiesArray.forEach(item => {
        let tr = createCookieTr(item.name, item.value);

        listTable.appendChild(tr);
    });
}

function showFileredTable(cookies, filerValue) {
    let cookiesArray = createArrayFromCookies(cookies);
    let filteredCookies = filterCookies(cookiesArray, filerValue);

    showTable(filteredCookies);
}

filterNameInput.addEventListener('keyup', function(e) {
    showFileredTable(document.cookie, e.target.value)
});

addButton.addEventListener('click', () => {
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    showFileredTable(document.cookie, filterNameInput.value);
});

listTable.addEventListener('click', (e) => {
    if (e.target.className === 'delete-cookie') {
        let name = e.target.parentNode.parentNode.children[0].innerText;

        document.cookie = `${name}=;expires=${new Date(0)}`;
        showFileredTable(document.cookie, filterNameInput.value);
    }
});
