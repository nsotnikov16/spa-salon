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

const swipersCatalog = document.querySelectorAll('.girls__swiper')
if (swipersCatalog.length > 0) {
    swipersCatalog.forEach((swiper, ind) => {
        swiper.classList.add(`girls__swiper_${ind + 1}`)
        var swiperCatalog = new Swiper(`.girls__swiper_${ind + 1}`, {
            loop: true,
            pagination: {
                el: `.girls__swiper_${ind + 1} .swiper-pagination`,
                clickable: true,
            },
        })
        if (window.innerWidth > 1150) {
            const bullets = swiper.querySelectorAll('.swiper-pagination-bullet')
            if (bullets.length > 0) bullets.forEach(bullet => {
                const aria = bullet.getAttribute('aria-label')
                const nextSlide = aria[aria.length - 1]
                bullet.addEventListener('mouseenter', () => { swiperCatalog.slideTo(nextSlide) })
            })
        }
    })
}


/* Спойлеры */
const spoilers = document.querySelectorAll('.spoiler')
if (spoilers.length > 0) spoilers.forEach(spoiler => {
    spoiler.querySelector('.spoiler__top').addEventListener('click', () => spoiler.classList.toggle('open'))
})

/* Достоинства свайпер */
var swiperAdvantageThumbs = new Swiper(".advantage-swiper-thumbs", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
        1000: {
            spaceBetween: 10,
        },
        580: {
            spaceBetween: 8,
        }
    },
});
var swiperAdvantage = new Swiper(".advantage-swiper", {
    spaceBetween: 10,
    loop: true,
    thumbs: {
        swiper: swiperAdvantageThumbs,
    },
    navigation: {
        nextEl: '.advantage__swiper .swiper-button-next',
        prevEl: '.advantage__swiper .swiper-button-prev',
    },
})

