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

let swipers = [];

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
            swipers.push({ swiper: swiperCatalog, className: `.girls__swiper_${ind + 1}`, bulletsLength: bullets.length })
        }


    })
}

function setListenerBullets(swipers) {
    swipers.forEach(({ swiper, bulletsLength, className }) => {
        if (window.innerWidth > 1150 && bulletsLength == 0) {
            const bullets = document.querySelectorAll(`${className} .swiper-pagination-bullet`)
            if (bullets.length > 0) bullets.forEach(bullet => {
                const aria = bullet.getAttribute('aria-label')
                const nextSlide = aria[aria.length - 1]
                bullet.addEventListener('mouseenter', () => { swiper.slideTo(nextSlide) })
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

// Табы
const tabsBlock = document.querySelector('.tabs')
if (tabsBlock) {
    const labels = tabsBlock.querySelectorAll('.tabs__label')
    const inputs = tabsBlock.querySelectorAll('.tabs__label input')
    const tabs = tabsBlock.querySelectorAll('.tabs__tab')
    const spoiler = tabsBlock.querySelector('.tabs__spoiler span')
    console.log(labels.length)
    if (labels.length > 2) {
        tabsBlock.classList.add('with_spoiler')
        spoiler.parentNode.addEventListener('click', () => tabsBlock.classList.toggle('open'))
    }

    inputs.forEach(input => {
        const label = tabsBlock.querySelector(`.tabs__label[for="${input.id}"]`)
        const span = label.querySelector('span')
        const tab = tabsBlock.querySelector(`.tabs__tab#${input.id}`)
        if (input.checked) {
            label.classList.add('active')
            tab.classList.add('active')
            spoiler.textContent = span.textContent
            setTimeout(() => setListenerBullets(swipers), 100)
        }
        input.addEventListener('click', () => {
            labels.forEach(item => item.classList.remove('active'))
            tabs.forEach(item => item.classList.remove('active'))
            label.classList.add('active')
            tab.classList.add('active')
            spoiler.textContent = span.textContent
            setTimeout(() => setListenerBullets(swipers), 100)
            if (tabsBlock.classList.contains('open')) tabsBlock.classList.remove('open')
        })
    })
}


/* Девушка детально */
var swiperGirlsThumbs = new Swiper(".swiper-girl-thumbs", {
    spaceBetween: 8,
    slidesPerView: 6,
    freeMode: true,
    watchSlidesProgress: true,
    navigation: {
        nextEl: '.girl__thumbs .swiper-button-next',
        prevEl: '.girl__thumbs .swiper-button-prev',
    },

});
var swiperGirl = new Swiper(".swiper-girl", {
    spaceBetween: 10,
    loop: true,
    thumbs: {
        swiper: swiperGirlsThumbs,
    },
    pagination: {
        el: '.swiper-girl .swiper-pagination',
        type: 'bullets',
    },
})

/* Свайпер "О нас" */
const swiperAboutOriginal = document.querySelector('.swiper-about')
if (swiperAboutOriginal) {
    const swiperAboutCopy = swiperAboutOriginal.cloneNode(true)
    swiperAboutCopy.classList.add('copy')
    swiperAboutCopy.classList.remove('swiper-about-original')
    swiperAboutOriginal.parentNode.append(swiperAboutCopy)
}

var swiperAbout = new Swiper(".swiper-about-original", {
    loop: true,
    pagination: {
        el: '.swiper-about-original .swiper-pagination',
        type: 'bullets',
    },
    navigation: {
        nextEl: '.swiper-about-original .swiper-button-next',
        prevEl: '.swiper-about-original .swiper-button-prev',
    },
})


// YMaps
if (document.querySelector('#map')) ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map(
        "map",
        {
            center: [61.246552, 73.463541],
            zoom: 16,
        },
        {
            searchControlProvider: "yandex#search",
        }
    )

    var myPlacemarkWithContent = new ymaps.Placemark(
        [61.246552, 73.463541],
        {
            balloonContent: '<strong>Массаж</strong>',
        },
        {
            preset: 'islands#redDotIconWithCaption'
        }
    );

    myMap.geoObjects.add(myPlacemarkWithContent);
}



/* Popups */
// Popups
class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
        this._closeButton = this._popupElement.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this)
        this._openingLinks = document.querySelectorAll(`[data-pointer="${this._popupElement.id}"]`)
        this.setEventListeners()
    }

    open(el) {
        document.body.style.overflow = "hidden";
        this._popupElement.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.body.style.overflow = "visible";
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.keyCode === 27) {
            this.close();
        }
    }

    _handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._openingLinks.forEach(link => link.addEventListener('click', (e) => { e.preventDefault(); this.open(e.target) }))
        this._closeButton.addEventListener('click', () => this.close());
        this._popupElement.addEventListener('click', this._handleOverlayClick.bind(this));
    }
}

const popups = document.querySelectorAll('.popup')

if (popups.length > 0) popups.forEach(item => new Popup(item))

