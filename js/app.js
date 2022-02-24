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
const mobileMenuLinksDropdown = headerMobile.querySelectorAll('.menu__item-dropdown .menu__link')
mobileMenuLinksDropdown.forEach((item, ind, arr) => {
    item.addEventListener('click', () => {
        const headerOpenMenu = document.querySelector('.header.open-menu')
        item.parentNode.classList.toggle('open')
        let heightAllItems = 0
        if (item.parentNode.classList.contains('open')) {
            arr.forEach(el => heightAllItems += el.offsetHeight)
            headerOpenMenu.style.height = `calc(100vh + ${heightAllItems + 25}px)`
        } else {
            if (Array.from(arr).some(element => !element.parentNode.classList.contains('open'))) headerOpenMenu.style.cssText = ''
        }
    })
})



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


/* Скролл первой акции сториз */
const firstStock = document.querySelector('.to-stories__item.for-fixed')
function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: Math.ceil(box.top + window.pageYOffset),
        right: Math.ceil(box.right + window.pageXOffset),
        bottom: Math.ceil(box.bottom + window.pageYOffset),
        left: Math.ceil(box.left + window.pageXOffset)
    };
}
if (firstStock) {
    let coordinates = getCoords(firstStock)
    const firstStockCopy = firstStock.cloneNode(true)
    firstStockCopy.classList.add('fixed')
    firstStockCopy.querySelector('.to-stories__title').remove()
    document.querySelector('.page').append(firstStockCopy)

    window.addEventListener('scroll', () => {
        const scroll = Math.ceil(window.scrollY)
        if (scroll >= coordinates.bottom) firstStockCopy.classList.add('display')
        if (scroll < coordinates.bottom) firstStockCopy.classList.remove('display')
    })
}


// Popups
class Popup {
    constructor(popupElement) {
        this.popupElement = popupElement;
        this._closeButton = this.popupElement.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this)
        this._openingLinks = document.querySelectorAll(`[data-pointer="${this.popupElement.id}"]`)
        this.setEventListeners()
    }

    open(el) {
        document.body.style.overflow = "hidden";
        this.popupElement.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this.popupElement.classList.remove('popup_opened');
        document.body.style.overflow = "visible";
        document.removeEventListener('keydown', this._handleEscClose);
        if (this.popupElement.id === 'stories') stories.reset()
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
        this.popupElement.addEventListener('click', this._handleOverlayClick.bind(this));
    }
}

const popups = document.querySelectorAll('.popup')
let arrPopups = {}
if (popups.length > 0) popups.forEach(item => {
    const popup = new Popup(item)
    arrPopups[item.id] = popup
})



/* Сториз */
class Stories {
    constructor() {
        this.mainBlock = document.querySelector('#stories')
        if (this.mainBlock) {
            this.slides = this.mainBlock.querySelectorAll('.swiper-slide')
            this.progressSpans = this.mainBlock.querySelectorAll('.stories__progress span')
            this.nextButton = this.mainBlock.querySelector('.swiper-button-next')
            this.prevButton = this.mainBlock.querySelector('.swiper-button-prev')
            this.counters = [];
            this.time = 6000;
            this.swiperStories = new Swiper(".stories__swiper", {
                allowTouchMove: false,
                navigation: {
                    nextEl: '.stories .swiper-button-next',
                    prevEl: '.stories .swiper-button-prev',
                },
            })
            this.setEventListeners()
        }
    }

    onActiveSlide(index) {
        this.swiperStories.slideTo(index)
        this.activeSlide()
    }
    activeSlide() {
        const activeSlide = this.mainBlock.querySelector('.swiper-slide-active')

        this.nextButton.removeEventListener('click', this.handler1)
        this.nextButton.removeEventListener('click', this.handler2)

        if (activeSlide.id == this.slides.length) {
            this.nextButton.addEventListener('click', this.handler2)
        } else {
            this.nextButton.addEventListener('click', this.handler1)
        }


        const nextSlide = this.mainBlock.querySelector('.swiper-slide-next')
        const previousSlides = Array.from(this.mainBlock.querySelectorAll('.swiper-slide')).filter(item => item.id < activeSlide.id)
        if (previousSlides.length > 0) previousSlides.forEach(item => {
            const progressSpan = this.mainBlock.querySelector(`.stories__progress-block-${item.id} span`)
            progressSpan.style.width = '100%';
        })


        const progressSpanActive = this.mainBlock.querySelector(`.stories__progress-block-${activeSlide.id} span`)
        let timeActive = 0;
        this.intervalId = setInterval(() => {
            timeActive += 5
            progressSpanActive.style.width = `${(timeActive / this.time) * 100}%`
            if (timeActive === this.time) {
                clearInterval(this.intervalId)
                if (nextSlide) {
                    this.onActiveSlide(nextSlide.id - 1)
                } else {
                    this.closeStories()
                }
            }
        }, 1)
    }

    reset() {
        this.intervalId ? clearInterval(this.intervalId) : ''
        this.progressSpans.forEach(item => item.style.width = '0')
    }
    handler1 = () => {
        this.reset()
        this.activeSlide()
    }

    handler2 = () => {
        this.closeStories()
    }

    closeStories = () => {
        this.reset()
        arrPopups[this.mainBlock.id].close()
    }
    setEventListeners() {
        this.prevButton.addEventListener('click', () => {
            this.reset()
            this.activeSlide()
        })
    }
}

const stories = new Stories()


/* Высота титульников достоинств одинаковая */
$(function () {
    var column = 0;
    $('.advantage__card h4').each(function () {
        h = $(this).height();
        if (h > column) {
            column = h;
        }
    }).height(column);
});


/* Проверка на мобильник */
const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);
if (isMobile) {
    const footerMobile = document.querySelector('.footer__mobile')
    window.addEventListener('scroll', () => {
        const scroll = Math.ceil(window.scrollY)
        if (scroll >= 400) footerMobile.classList.add('show')
        if (scroll < 400) footerMobile.classList.remove('show')
    })
}


/* Анимация при скролле */
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_animate');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_animate');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    setTimeout(() => {
        animOnScroll();
    }, 10);
}