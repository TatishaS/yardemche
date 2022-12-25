'use strict';

// Разрешаем скролл заднего фона при открытом модальном окне
function enableScroll() {
  const body = document.body;
  let pagePosition = parseInt(body.dataset.position, 10);
  body.style.top = 'auto';
  body.classList.remove('disable-scroll');

  window.scroll({ top: pagePosition, left: 0 });
  //body.removeAttribute('data-position');
}
// Запрещаем скролл заднего фона при открытом модальном окне
function disableScroll() {
  const body = document.body;

  let pagePosition = window.scrollY;
  body.classList.add('disable-scroll');
  body.dataset.position = pagePosition;
  body.style.top = -pagePosition + 'px';
}

/* Burger menu */
function burgerMenu() {
  const burger = document.querySelector('.menu__burger');
  const menuList = document.querySelector('.menu__list-wrapper');

  const overlay = document.querySelector('.overlay');
  //const body = document.querySelector('body');
  const menuLinks = document.querySelectorAll('.menu__list-link');

  function hideBurgerMenu() {
    menuList.classList.remove('active');

    burger.classList.remove('active-burger');
    overlay.classList.remove('overlay--show');
  }

  burger.addEventListener('click', () => {
    if (!menuList.classList.contains('active')) {
      menuList.classList.add('active');

      burger.classList.add('active-burger');

      overlay.classList.add('overlay--show');
    } else {
      hideBurgerMenu();
    }
  });
  /* Cкрываем мобильное меню по нажатию на ссылку в меню */
  menuLinks.forEach(link => {
    link.addEventListener('click', hideBurgerMenu);
  });

  // Брейкпойнт, на котором появляется бургер-меню
  /*   window.addEventListener('resize', () => {
    if (window.innerWidth > 640) {
      menuList.classList.remove('active');

      burger.classList.remove('active-burger');
    }
  }); */

  overlay.addEventListener('click', hideBurgerMenu);
}

let swiper = new Swiper('.portfolio__swiper-slider', {
  // Optional parameters
  slidesPerView: 1,
  spaceBetween: 10,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    860: {
      slidesPerView: 3,
      spaceBetween: 22,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
});

let swiperTop = new Swiper('.top__swiper-slider', {
  // Optional parameters
  slidesPerView: 1,

  autoplay: {
    delay: 5000,
  },
  /*   effect: 'fade',
  fadeEffect: {
    crossFade: true,
  }, */
  pagination: {
    el: '.swiper-pagination--top',
    clickable: true,
  },
});

function handleImagePreview() {
  const previewContainer = document.querySelector('.edit-form__file-preview');
  const fileInput = document.querySelector('.edit-form__file-input');

  fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', function () {
        previewContainer.style.backgroundImage = `url(${this.result})`;
      });
      reader.readAsDataURL(file);
    } else {
      previewContainer.style.backgroundImage = "url('../images/expert-4.jpg')";
    }
  });
}

/* Модальное окно */
function bindModal(trigger, modal, close) {
  (trigger = document.querySelectorAll(trigger)),
    (modal = document.querySelector(modal)),
    (close = document.querySelectorAll(close));

  if (!trigger || !modal) return;

  const overlay = document.querySelector('.overlay');

  const hideModal = elem => {
    //console.log('Навешан обработчик');
    enableScroll();
    modal.style.display = 'none';
    overlay.classList.remove('overlay--show');
    elem.removeEventListener('click', hideModal);
  };

  trigger.forEach(t => {
    t.addEventListener('click', e => {
      e.preventDefault();
      modal.style.display = 'block';
      overlay.classList.add('overlay--show');
      disableScroll();

      /* Обработка загрузки превью изображения */
      handleImagePreview();

      /* Обработка клика на кнопку "закрыть" */
      close.forEach(btn => {
        btn.addEventListener('click', () => hideModal(btn));
      });

      /* Обработка клика на оверлей */
      overlay.addEventListener('click', function () {
        hideModal(overlay);
      });
    });
  });
}

burgerMenu();

bindModal('.edit__btn', '.modal__edit', '.edit-form__close');
