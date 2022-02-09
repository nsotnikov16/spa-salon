// Проверка поддержки webp
function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
// Добавление класса _webp или _no-webp для HTML
testWebP(function (support) {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
});

// Меню шапка
const header = document.querySelector('.header')
const headerMobile = header.querySelector('.header__mobile')
const headerRight = header.querySelector('.header__right')
const headerRightCopy = headerRight.cloneNode(true)
const headerMenuListCopy = header.querySelector('.menu__list').cloneNode(true)
const burger = document.querySelector('.menu__burger')

headerMobile.append(headerMenuListCopy)
headerMobile.append(headerRightCopy)
burger.addEventListener('click', () => header.classList.toggle('open-menu'))