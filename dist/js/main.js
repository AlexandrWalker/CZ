(() => {
  document.addEventListener('DOMContentLoaded', () => {

    var product__slider = new Swiper(".product__slider-init", {
      slidesPerView: 1,
      spaceBetween: 10,
      // slidesPerGroup: 1,
      speed: 600,
      mousewheel: {
        forceToAxis: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        521: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        769: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });

    var history__slider = new Swiper(".history__slider-init", {
      slidesPerView: "auto",
      spaceBetween: 0,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      speed: 600,
      mousewheel: {
        forceToAxis: true,
      },
      on: {
        slideChange: () => updateLineFills(history__slider),
      },
    });

    updateLineFills(history__slider);

    /**
     * Обновление состояния линий в слайдере.
     * Активные линии соответствуют текущему слайду и всем предыдущим.
     *
     * @param {Swiper} history__slider - Экземпляр слайдера Swiper.
     */
    function updateLineFills(history__slider) {
      const { slides, activeIndex } = history__slider;

      slides.forEach((slide, index) => {
        const lineSpan = slide.querySelector('.history__slider-line span');
        lineSpan?.classList.toggle('active', index <= activeIndex);
      });
    }

    var values__thumbs = new Swiper(".values__thumbs-init", {
      spaceBetween: 30,
      speed: 600,
      loop: true,
      watchSlidesProgress: true,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      on: {
        touchEnd: function (s, e) {
          let range = 5;
          let diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY
            - s.touches.startY
          if (diff < range || diff > -range) s.allowClick = true;
        }
      },
    });

    var values__slider = new Swiper(".values__slider-init", {
      spaceBetween: 30,
      speed: 600,
      loop: true,
      grabCursor: true,
      thumbs: {
        swiper: values__thumbs,
      },
      navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      },
    });

    function harmonicFunc() {
      var worthHead = document.querySelectorAll('.worth__item'),
        worthActive = document.getElementsByClassName('active'),

        worthRePrev = document.getElementsByClassName('re-prev'),
        worthPrev = document.getElementsByClassName('prev'),
        worthNext = document.getElementsByClassName('next');

      Array.from(worthHead).forEach(function (worthItem, i, worthHead) {
        worthItem.addEventListener('click', function (e) {
          if (worthActive.length > 0 && worthActive[0] !== this) {
            worthActive[0].classList.remove('active');
          }
          if (worthRePrev.length > 0) {
            worthRePrev[0].classList.remove('re-prev');
          }
          if (worthPrev.length > 0) {
            worthPrev[0].classList.remove('prev');
          }
          if (worthNext.length > 0) {
            worthNext[0].classList.remove('next');
          }
          this.classList.add('active');

          var prePrev = this.previousElementSibling;

          if (this.previousElementSibling) {
            this.previousElementSibling.classList.add('prev');

            if (prePrev.previousElementSibling) {
              prePrev.previousElementSibling.classList.add('re-prev');
            }
          }
          if (this.nextElementSibling) {
            this.nextElementSibling.classList.add('next');
          }
        });
      });
    }

    function accordionFunc() {
      var accordionHead = document.querySelectorAll('.accordion'),
        accordionActive = document.getElementsByClassName('active');

      Array.from(accordionHead).forEach(function (accordionItem, i, accordionHead) {
        accordionItem.addEventListener('click', function (e) {
          if (accordionActive.length > 0 && accordionActive[0] !== this) {
            accordionActive[0].classList.remove('active');
          }
          this.classList.toggle('active');
        });
      });
    }

    /**
     * Управляет переключением вкладок на странице.
     * Добавляет и удаляет классы активности для кнопок и панелей вкладок.
     * Поддерживает вложенные табы любой глубины и сохраняет активное состояние у вложенных табов при переключении внешних.
     */
    function tabsFunc() {
      document.querySelectorAll('.tabs').forEach((tabsContainer) => {
        tabsContainer.addEventListener('click', (event) => {
          const tabsBtn = event.target.closest('.tabs__btn');
          if (!tabsBtn || !tabsContainer.contains(tabsBtn)) return;

          // Останавливаем всплытие, чтобы вложенные табы не влияли на родительские
          event.stopPropagation();

          // Ищем ближайший контейнер, к которому принадлежит нажатая кнопка
          const currentTabsContainer = tabsBtn.closest('.tabs');
          if (!currentTabsContainer) return;

          // Сбрасываем активные состояния кнопок и панелей только внутри текущего уровня
          const tabsBtns = Array.from(currentTabsContainer.querySelectorAll('.tabs__btn'));
          const tabsPanels = Array.from(currentTabsContainer.querySelectorAll('.tabs__panel'));

          tabsBtns.forEach((btn) => {
            if (btn.closest('.tabs') === currentTabsContainer) {
              btn.classList.remove('tabs__btn--active');
            }
          });

          tabsPanels.forEach((panel) => {
            if (panel.closest('.tabs') === currentTabsContainer) {
              panel.classList.remove('tabs__panel--active');
            }
          });

          // Устанавливаем активное состояние для выбранной вкладки
          tabsBtn.classList.add('tabs__btn--active');
          const targetPanel = currentTabsContainer.querySelector(
            `.tabs__panel[data-tab="${tabsBtn.dataset.tab}"]`,
          );
          if (targetPanel) {
            /* HACK */
            targetPanel.classList.add('tabs__panel--active');
          }
        });
      });
    };


    /**
     * Инициализация Lenis и ScrollTrigger
     */
    // Initialize a new Lenis instance for smooth scrolling
    const lenis = new Lenis();

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);

    /**
     * dropdown
     */
    if (document.querySelectorAll('.dropdown')) {
      document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
        const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
        const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
        const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
        const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

        dropDownBtn.addEventListener('click', function (e) {
          dropDownList.classList.toggle('dropdown__list--visible');
          this.classList.add('dropdown__button--active');
        });

        dropDownListItems.forEach(function (listItem) {
          listItem.addEventListener('click', function (e) {
            e.stopPropagation();
            dropDownBtn.innerHTML = this.innerHTML;
            dropDownBtn.dataset.tab = this.dataset.tab;
            dropDownBtn.focus();
            dropDownInput.value = this.dataset.value;
            dropDownList.classList.remove('dropdown__list--visible');
          });
        });

        document.addEventListener('click', function (e) {
          if (e.target !== dropDownBtn) {
            dropDownBtn.classList.remove('dropdown__button--active');
            dropDownList.classList.remove('dropdown__list--visible');
          }
        });

        document.addEventListener('keydown', function (e) {
          if (e.key === 'Tab' || e.key === 'Escape') {
            dropDownBtn.classList.remove('dropdown__button--active');
            dropDownList.classList.remove('dropdown__list--visible');
          }
        });
      });
    }

    accordionFunc();
    harmonicFunc();
    tabsFunc();
  });
})();