'use strict';

let swiper = new Swiper('.swiper-slider', {
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
    //enableScroll();
    modal.style.display = 'none';
    overlay.classList.remove('overlay--show');
    elem.removeEventListener('click', hideModal);
  };

  trigger.forEach(t => {
    t.addEventListener('click', e => {
      e.preventDefault();
      modal.style.display = 'block';
      overlay.classList.add('overlay--show');
      //disableScroll();

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

bindModal('.edit__btn', '.modal__edit', '.edit-form__close');
