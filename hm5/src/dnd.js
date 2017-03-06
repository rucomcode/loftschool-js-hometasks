/* ДЗ 5.2 - Div D&D */

/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом фона и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

homeworkContainer.style.position = 'absolute';
homeworkContainer.style.width = '100%';
homeworkContainer.style.height = '100%';

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    function getRandomHexDigit () {
        var a = Math.ceil((Math.random() * 255)).toString(16);
        a = (a.length === 1) ? '0' + a : a;
        return a;
    }

    function getRandomColor () {
        var b = '#' + getRandomHexDigit() + getRandomHexDigit() + getRandomHexDigit();
        return b;

    }

    var div = document.createElement('div'),
        width = Math.ceil(Math.random() * 300),
        height = Math.ceil(Math.random() * 300),
        color = getRandomColor();


    div.classList = 'draggable-div';
    div.style.width = width + 'px';
    div.style.height = height + 'px';
    div.style.backgroundColor = color;
    div.style.position = 'absolute';
    div.style.left = Math.random() * window.innerWidth - width + 'px';
    div.style.top = Math.random() * (window.innerHeight - 100) - height + 100 + 'px';
    div.style.zIndex = 0;

    return div;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    var initialLeft,
        initialTop,
        dragStartX,
        dragStartY,
        currentElement;

    target.addEventListener('mousedown', function(e) {
        e.preventDefault();

        currentElement = e.target;
        initialLeft = parseInt(currentElement.style.left);
        initialTop = parseInt(currentElement.style.top);
        dragStartX = e.clientX;
        dragStartY = e.clientY;
    });

    target.addEventListener('mousemove', function(e) {
        if (currentElement) {
            currentElement.style.left = initialLeft - (dragStartX - e.clientX) + 'px';
            currentElement.style.top = initialTop - (dragStartY - e.clientY) + 'px';
        }
    });

    target.addEventListener('mouseup', function() {
        currentElement = null;
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    // addListeners(div);
    addListeners(homeworkContainer);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
