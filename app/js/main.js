// const { init } = require("browser-sync");
gsap.registerPlugin(ScrollTrigger);

(() => {
  document.addEventListener('DOMContentLoaded', () => {

    const catalog = document.querySelector('.catalog');
    if (catalog) {
      const catalogFilters = catalog.querySelectorAll('.catalog__filter');
      const catalogTypes = catalog.querySelectorAll('.catalog__type');
      const catalogCategories = catalog.querySelectorAll('.catalog__category');
      const catalogPrimaries = catalog.querySelectorAll('.catalog__primary');
      const catalogHead = catalog.querySelector('.catalog__head');
      const catalogBody = catalog.querySelector('.catalog__body');
      const catalogFilterItemsAll = catalog.querySelector('.catalog__filter-item--all');

      catalogCategories.forEach(catalogCategory => {
        catalogCategory.addEventListener('click', e => {
          if (catalogFilters.length > 0) {
            catalogFilters.forEach(catalogFilter => {
              catalogFilter.classList.remove('show');
            });
          }
          document.getElementById(catalogCategory.dataset.category).classList.toggle('show');

          if (catalogCategory.dataset.category == 'category-maslo' && document.querySelector('.catalog__head').dataset.primary == 'b2b') {
            document.getElementById('category-maslo-wt').classList.add('show');
          } else {
            console.log('NOPE');
          }

          catalogBody.setAttribute('data-category', catalogCategory.dataset.category);
          console.log(catalogCategory.dataset.category);
          const allCategory = document.getElementById(catalogCategory.dataset.category).querySelector('.catalog__filter-item--all');
          allCategory.querySelector('.catalog__type').click();
          catalogUpdate();
          catalogAll();
        })
      });

      catalogPrimaries.forEach(catalogPrimary => {
        catalogPrimary.addEventListener('click', e => {
          catalogBody.setAttribute('data-primary', catalogPrimary.dataset.primary);
          catalogHead.setAttribute('data-primary', catalogPrimary.dataset.primary);

          const catalogFilter = document.querySelector('.catalog__filter.show');
          const catalogFilterItemAll = catalogFilter.querySelector('.catalog__filter-item--all');
          catalogFilterItemAll.querySelector('label').click();
          catalogUpdate();
          catalogAll();
        })
      });

      catalogTypes.forEach(catalogType => {
        if (!catalogType.parentNode.classList.contains('catalog__filter-item--all')) {
          catalogType.addEventListener('click', e => {
            catalogBody.setAttribute('data-filter', catalogType.dataset.filter);
            catalogUpdate();
          })
        } else {
          catalogType.addEventListener('click', e => {
            catalogBody.removeAttribute('data-filter');
            catalogAll();
          })
        }
      });

      function catalogUpdate() {
        const catalogBody = catalog.querySelector('.catalog__body');
        const catalogItems = catalog.querySelectorAll('.catalog__item');

        catalogItems.forEach(catalogItem => {
          if (catalogBody.dataset.primary == catalogItem.dataset.primary && catalogBody.dataset.category == catalogItem.dataset.category && catalogBody.dataset.filter == catalogItem.dataset.filter) {
            catalogItem.classList.add('catalog__item--show');
          } else {
            catalogItem.classList.remove('catalog__item--show');
          }
        });
      }
      catalogUpdate();

      function catalogAll() {
        const catalogBody = catalog.querySelector('.catalog__body');
        const catalogItems = catalog.querySelectorAll('.catalog__item');

        catalogItems.forEach(catalogItem => {
          if (catalogBody.dataset.primary == catalogItem.dataset.primary && catalogBody.dataset.category == catalogItem.dataset.category) {
            catalogItem.classList.add('catalog__item--show');
          } else {
            catalogItem.classList.remove('catalog__item--show');
          }
        });
      }
      catalogAll();
    }

    var product__slider = new Swiper(".product__slider-init", {
      slidesPerView: 2,
      spaceBetween: 10,
      loop: true,
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
          slidesPerView: 2,
          spaceBetween: 20,
        },
        769: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });

    (function () {
      const btn = document.querySelector('.header__contact');
      if (!btn) return;

      document.addEventListener('click', (e) => {
        if (window.innerWidth > 521) return;

        if (btn.contains(e.target)) {
          btn.classList.toggle('header__contact-active');
          return;
        }

        btn.classList.remove('header__contact-active');
      });

      window.addEventListener('scroll', () => {
        if (window.innerWidth > 521) return;

        if (btn.classList.contains('header__contact-active')) {
          btn.classList.remove('header__contact-active');
        }
      });
    })();

    // var history__slider = new Swiper(".history__slider-init", {
    //   slidesPerView: "auto",
    //   spaceBetween: 0,
    //   slidesPerGroup: 1,
    //   watchSlidesProgress: true,
    //   speed: 600,
    //   init: false,
    //   mousewheel: {
    //     forceToAxis: true,
    //   },
    //   on: {
    //     slideChange: () => updateLineFills(history__slider),
    //   },
    // });

    // updateLineFills(history__slider);

    /**
     * Обновление состояния линий в слайдере.
     * Активные линии соответствуют текущему слайду и всем предыдущим.
     *
     * тут - Экземпляр слайдера Swiper.
     */
    // @param {Swiper} history__slider - этот
    // function updateLineFills(history__slider) {
    //   const { slides, activeIndex } = history__slider;

    //   slides.forEach((slide, index) => {
    //     const lineSpan = slide.querySelector('.history__slider-line span');
    //     lineSpan?.classList.toggle('active', index <= activeIndex);
    //   });
    // }

    var values__thumbs = new Swiper(".values__thumbs-init", {
      spaceBetween: 30,
      speed: 600,
      loop: true,
      watchSlidesProgress: true,
      grabCursor: false,
      mousewheel: false,
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
      mousewheel: {
        forceToAxis: true,
      },
      navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      },
    });

    values__thumbs.controller.control = values__slider;
    values__slider.controller.control = values__thumbs;

    /**
     * Инициализация Lenis
     */
    const lenis = new Lenis({
      anchors: {
        offset: 100,
      },
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // lenis.on('scroll', ScrollTrigger.update);

    // gsap.ticker.add((time) => {
    //   lenis.raf(time * 1000);
    // });

    // gsap.ticker.lagSmoothing(0);


    function harmonicFunc() {
      const items = document.querySelectorAll('.work__item'),
        itemsActive = document.getElementsByClassName('work__item-active'),
        worthRePrev = document.getElementsByClassName('re-prev'),
        worthPrev = document.getElementsByClassName('prev'),
        worthNext = document.getElementsByClassName('next'),
        worthReNext = document.getElementsByClassName('re-next');

      items.forEach(element => {
        if (element !== items[0]) {
          element.addEventListener('mouseover', function () {
            if (itemsActive.length > 0 && itemsActive[0] !== this) {
              itemsActive[0].classList.remove('work__item-active');
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
            if (worthReNext.length > 0) {
              worthReNext[0].classList.remove('re-next');
            }

            this.classList.add('work__item-active');

            var prePrev = this.previousElementSibling;
            var preNext = this.nextElementSibling;

            if (this.previousElementSibling) {
              this.previousElementSibling.classList.add('prev');

              if (prePrev.previousElementSibling) {
                prePrev.previousElementSibling.classList.add('re-prev');
              }
            }
            if (this.nextElementSibling) {
              this.nextElementSibling.classList.add('next');

              if (preNext.nextElementSibling) {
                preNext.nextElementSibling.classList.add('re-next');
              }
            }
          });
          element.addEventListener('mouseout', function () {
            if (worthRePrev.length > 0) {
              worthRePrev[0].classList.remove('re-prev');
            }
            if (worthPrev.length > 0) {
              worthPrev[0].classList.remove('prev');
            }
            if (worthNext.length > 0) {
              worthNext[0].classList.remove('next');
            }
            if (worthReNext.length > 0) {
              worthReNext[0].classList.remove('re-next');
            }
            items[0].classList.add('work__item-active');
            this.classList.remove('work__item-active');
            if (items[0].nextElementSibling) {
              items[0].nextElementSibling.classList.add('next');
              items[1].nextElementSibling.classList.add('re-next');
            }
          });
        }
      });
    }
    harmonicFunc();

    function accordionFunc() {
      var accordionHead = document.querySelectorAll('.accordion'),
        accordionActive = document.getElementsByClassName('active');

      Array.from(accordionHead).forEach(function (accordionItem, i, accordionHead) {
        accordionItem.addEventListener('click', function (e) {
          if (accordionActive.length > 0 && accordionActive[0] !== this) {
            accordionActive[0].classList.remove('active');
          }
          this.classList.toggle('active');
          console.log('ass');

          if (document.getElementById('menu')) {
            const menu = document.getElementById('menu');
            if (menu.querySelector('.active')) {
              menu.classList.add('menu-active');
            } else {
              menu.classList.remove('menu-active');
            }
          }
        });
      });
    }
    accordionFunc();

    /**
     * Активация любого количества модальных окон
     */
    function modalFunc() {
      var modal__btn = document.querySelector('.modal__btn');

      if (!modal__btn) {
        return;
      } else {

        var close = document.querySelectorAll('.modal__close-btn');
        var openBtn = document.querySelectorAll('.modal__btn');

        Array.from(openBtn, openButton => {
          openButton.addEventListener('click', e => {

            let open = document.getElementsByClassName('open');

            if (open.length > 0 && open[0] !== this) {
              open[0].classList.remove('open');
            }

            let modalId = e.target.getAttribute('data-id');
            if (modalId) {
              document.getElementById(modalId).classList.add('open');
              document.body.classList.add('no-scroll');
              // lenis.stop();
            } else {
              return
            }

            Array.from(close, closeButton => {
              closeButton.addEventListener('click', e => {
                document.getElementById(modalId).classList.remove("open");
                document.body.classList.remove('no-scroll');
                // lenis.start();
              });

              window.addEventListener('keydown', (e) => {
                if (e.key === "Escape") {
                  document.getElementById(modalId).classList.remove("open")
                  document.body.classList.remove('no-scroll');
                  // lenis.start();
                }
              });

              document.querySelector(".modal.open .modal__box").addEventListener('click', event => {
                event._isClickWithInModal = true;
              });

              document.getElementById(modalId).addEventListener('click', event => {
                if (event._isClickWithInModal) return;
                event.currentTarget.classList.remove('open');
                document.body.classList.remove('no-scroll');
                // lenis.start();
              });
            });
          });
        });
      }
    };
    modalFunc();

    /**
     * Управляет поведением меню-бургера.
     */
    function burgerNav() {
      const burger = document.getElementById('burger');
      const menu = document.getElementById('menu');
      const closeButton = document.querySelector('.menu__close');
      const overlay = document.querySelector('.menu__overlay');

      /**
       * Переключает видимость меню.
       */
      const toggleMenu = () => {
        const isOpened = burger.classList.toggle('burger--opened');
        menu.classList.toggle('menu--opened', isOpened);
        lenis.stop();
      };

      /**
       * Закрывает меню.
       */
      const closeMenu = () => {
        burger.classList.remove('burger--opened');
        menu.classList.remove('menu--opened');

        const accordionActive = menu.getElementsByClassName('active');

        if (accordionActive.length > 0 && accordionActive[0] !== this) {
          accordionActive[0].classList.remove('active');
        }

        menu.classList.remove('menu-active');

        lenis.start();
      };

      // Открытие/закрытие меню по клику на бургер
      burger.addEventListener('click', toggleMenu);

      // Закрытие меню по клику на кнопку закрытия или на overlay
      [closeButton, overlay].forEach((element) => element.addEventListener('click', closeMenu));

      // Закрытие меню при клике вне области меню и бургера
      document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !burger.contains(event.target)) {
          closeMenu();
        }
      });

      document.querySelectorAll('.menu__list a').forEach((element) => element.addEventListener('click', closeMenu));
    }
    burgerNav();

    const numbs = document.querySelector('.numbs');
    if (numbs) {
      function counter(array, time = 2000) {
        let n = 0;
        const num = Number(array.dataset.val);
        let interval = setInterval(() => {
          n < num ? (n += num / (time / 10)) : clearInterval(interval);
          n < num ? (n += num / (time / 10)) : numbs.classList.add('active');
          array.classList.contains('frac')
            ? (array.innerHTML = new Intl.NumberFormat('ru-RU').format(n.toFixed(1)))
            : (array.innerHTML = new Intl.NumberFormat('ru-RU').format(Math.round(n)));
        }, 10);
      }

      const numbBoxes = document.querySelectorAll('.numbs');
      numbBoxes.forEach((numbBox) => {
        const numbs = numbBox.querySelectorAll('.number');
        numbs.forEach((numb) => {
          gsap.to(numb, {
            scrollTrigger: {
              trigger: numbBox,
              start: `top 80%`,
              // start: `top 60%`,
              // markers: true,
            },
            onStart: () => counter(numb),
          });
        });
      });
    }

    const searchBtn = document.getElementById('search__btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', function () {

        searchBtn.parentNode.classList.toggle('search--show');

        window.addEventListener('keydown', (e) => {
          if (e.key === "Escape") {
            searchBtn.parentNode.classList.remove("search--show")
          }
        });

        document.addEventListener('click', (e) => {
          const withinBoundaries = e.composedPath().includes(searchBtn.parentNode);

          if (!withinBoundaries) {
            searchBtn.parentNode.classList.remove("search--show")
          }
        })
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
          const tabsFilter = Array.from(currentTabsContainer.querySelectorAll('.tabs__filter'));

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

          tabsFilter.forEach((filter) => {
            if (filter.closest('.tabs') === currentTabsContainer) {
              filter.classList.remove('tabs__filter--active');
              filter.parentNode.classList.remove('show');
            }
          });

          // Устанавливаем активное состояние для выбранной вкладки
          tabsBtn.classList.add('tabs__btn--active');
          const targetPanel = currentTabsContainer.querySelectorAll(
            `.tabs__panel[data-tab="${tabsBtn.dataset.tab}"]`,
          );
          const targetFilter = currentTabsContainer.querySelectorAll(
            `.tabs__filter[data-tab="${tabsBtn.dataset.tab}"]`,
          );
          if (targetPanel) {
            targetPanel.forEach(targetPanels => {
              targetPanels.classList.add('tabs__panel--active');
            });
          }
          if (targetFilter) {
            targetFilter.forEach(targetFilters => {
              targetFilters.classList.add('tabs__filter--active');
              targetFilters.parentNode.classList.add('show');
            });
          }
        });

        tabsContainer.addEventListener('click', (event) => {
          const tabsBtn = event.target.closest('.tabs__c_btn');
          if (!tabsBtn || !tabsContainer.contains(tabsBtn)) return;

          // Останавливаем всплытие, чтобы вложенные табы не влияли на родительские
          event.stopPropagation();

          // Ищем ближайший контейнер, к которому принадлежит нажатая кнопка
          const currentTabsContainer = tabsBtn.closest('.tabs');
          if (!currentTabsContainer) return;

          // Сбрасываем активные состояния кнопок и панелей только внутри текущего уровня
          const tabsBtns = Array.from(currentTabsContainer.querySelectorAll('.tabs__c_btn'));
          const tabsCatalog = Array.from(currentTabsContainer.querySelectorAll('.tabs__catalog'));

          tabsBtns.forEach((btn) => {
            if (btn.closest('.tabs') === currentTabsContainer) {
              btn.classList.remove('tabs__c_btn--active');
            }
          });

          tabsCatalog.forEach((catalog) => {
            if (catalog.closest('.tabs') === currentTabsContainer) {
              event.stopPropagation();
              catalog.classList.remove('tabs__catalog--active');
            }
          });

          // Устанавливаем активное состояние для выбранной вкладки
          tabsBtn.classList.add('tabs__c_btn--active');
          const targetCatalog = currentTabsContainer.querySelector(
            `.tabs__catalog[data-tab="${tabsBtn.dataset.tab}"]`,
          );
          if (targetCatalog) {
            targetCatalog.classList.add('tabs__catalog--active');
          }

          console.log(tabsBtn.dataset.tab);
          if (tabsBtn.dataset.tab == 'b2b') {
            tabsBtn.parentNode.parentNode.classList.add('filter__parent--active');
          } else {
            tabsBtn.parentNode.parentNode.classList.remove('filter__parent--active');
          }
        });
      });
    };
    tabsFunc();

    /**
     * Выпадашка
     */
    const dropdown = document.querySelector('.dropdown--js');
    if (dropdown) {
      let dropdowns = document.querySelectorAll('.dropdown--js');
      dropdowns.forEach(dropdown => {

        function updateSelected() {
          let selectedValue = dropdown.querySelector('.dropdown__value');
          let selectedOption = document.querySelector('.dropdown__radio:checked');
          let selectedLabel = selectedOption.parentElement.querySelector('.dropdown__label');
          let text = selectedLabel.textContent;
          let data = selectedLabel.dataset.tab;
          let selectedDropdown = dropdown.querySelector('.dropdown__selected--js');
          selectedDropdown.querySelector('span').textContent = text;
          selectedValue.dataset.value = text;
          selectedDropdown.dataset.tab = data;
        }

        function toggleClass(el, className, add) {
          let addClass = add;
          if (typeof addClass === 'undefined') {
            addClass = !el.classList.contains(className);
            dropdown.querySelector('.dropdown__selected--js').click();
          }
          if (addClass) {
            el.classList.add(className);
          } else {
            el.classList.remove(className);
          }
        }

        let radios = dropdown.querySelectorAll('.dropdown__radio');
        let root = dropdown;

        for (let i = 0; i < radios.length; ++i) {
          let radio = radios[i];
          radio.addEventListener('change', function () {
            updateSelected();
          });
          radio.addEventListener('click', function () {
            toggleClass(root, 'is-active', false);
          });
        }

        let selectedLabel = dropdown.querySelector('.dropdown__selected--js');
        selectedLabel.addEventListener('click', function () {
          toggleClass(root, 'is-active');
        });

        // updateSelected();
      });
    }

    $(window).on('resize load', function () {

      const headerPhone = document.getElementById('header-phone');

      if (headerPhone) {
        if (window.innerWidth <= 520) {
          headerPhone.innerHTML = 'Связаться';
        } else {
          headerPhone.innerHTML = headerPhone.dataset.value;
        }
      }

      const cookieBtn = document.getElementById('cookie-btn');

      if (cookieBtn) {
        if (window.innerWidth <= 520) {
          cookieBtn.innerHTML = 'Ок';
        } else {
          cookieBtn.innerHTML = 'Принять';
        }
      }

      const productHeadDownload = document.querySelector('.product__head-download');

      if (productHeadDownload) {
        if (window.innerWidth <= 768) {
          productHeadDownload.querySelector('span').innerHTML = 'Каталог продукции';
        } else {
          productHeadDownload.querySelector('span').innerHTML = productHeadDownload.querySelector('span').dataset.value;
        }
      }
    });

    /**
     * Инициализация TransferElements
     */
    const madeLink = document.getElementById('made-link');
    const roskachestvo = document.getElementById('roskachestvo');
    const productDownload = document.querySelector('.product__head-download');
    const videoLink = document.querySelector('.video__link');
    const newsMain = document.querySelector('.news--main');

    if (madeLink) {
      new TransferElements(
        {
          sourceElement: madeLink,
          breakpoints: {
            768: {
              targetElement: document.querySelector('.transfer-pos--1')
            }
          },
        }
      );
    }
    if (roskachestvo) {
      new TransferElements(
        {
          sourceElement: roskachestvo,
          breakpoints: {
            768: {
              targetElement: document.querySelector('.transfer-pos--2')
            }
          },
        }
      );
    }
    if (productDownload) {
      new TransferElements(
        {
          sourceElement: productDownload,
          breakpoints: {
            768: {
              targetElement: document.querySelector('.product__body')
            }
          },
        }
      );
    }
    if (videoLink) {
      new TransferElements(
        {
          sourceElement: videoLink,
          breakpoints: {
            768: {
              targetElement: document.querySelector('.about__content')
            }
          },
        }
      );
    }
    if (newsMain) {
      new TransferElements(
        {
          sourceElement: newsMain.querySelector('.news__head-btn'),
          breakpoints: {
            768: {
              targetElement: newsMain.querySelector('.news__inner')
            }
          },
        }
      );
    }



    $('.video__link').fancybox({
      openEffect: 'none',
      closeEffect: 'none',
      helpers: {
        media: {}
      }
    });
    // $("a.video__link").fancybox({
    //   type: 'iframe',
    //   iframe: {
    //     allowfullscreen: 'true',
    //     allowautoplay: 'true',
    //     // allowpicture-in -picture: 'true',
    //     // allowencrypted media: 'true',
    //     allowgyroscope: 'true',
    //     allowaccelerometer: 'true',
    //     // allowclipboard- write: 'true',
    //     // screen - wake - lock: 'true',
    //     frameborder: 0,
    //     width: 3840,
    //     height: 2160,
    //   }
    // });

    // $(function () {
    //   $('.promo_present').fancybox
    //     (
    //       {
    //         type: 'iframe',
    //         href: "https://kinescope.io/embed/jYTJ2ukSa875vHWnJWk1HC",
    //         iframe: {
    //           scrolling: 'auto',
    //           allowfullscreen: 'true',
    //           allowautoplay: 'true',
    //           preload: true
    //         },
    //         width: '3840',
    //         height: '2160'
    //       }
    //     )
    // }
    // );

    const parallaxImgContainers = document.querySelectorAll('[data-animation="parallax-img"]');
    parallaxImgContainers.forEach(parallaxImgContainer => {
      const image = parallaxImgContainer.querySelector('img');
      gsap.fromTo(image,
        { y: '-7%' },
        {
          y: '7%',
          scrollTrigger: {
            trigger: parallaxImgContainer,
            start: 'top 60%',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });

    /**
     * Таймлайн
     */
    const TimelineScroll = {

      defaultConfig: {
        breakpoint: 768,
        selectors: {
          placeholder: '.timeline-placeholder',
          container: '.timeline-container',
          timeline: '.timeline',
          wrapper: '.timeline-wrapper',
          items: '.timeline-item',
          btnPrev: '.timeline-button-prev',
          btnNext: '.timeline-button-next'
        }
      },

      init(placeholderSelector = '.timeline-placeholder', customSelectors = {}) {

        this.config = {
          ...this.defaultConfig,
          selectors: { ...this.defaultConfig.selectors, ...customSelectors }
        };

        this.state = {
          rootElement: null,
          timelinePlaceholder: null,
          timelineContainer: null,
          timeline: null,
          timelineWrapper: null,
          timelineItems: null,
          btnPrev: null,
          btnNext: null,

          itemWidth: 0,
          containerWidth: 0,
          totalWidth: 0,
          maxScroll: 0,
          placeholderHeight: 0,
          containerHeight: 0,
          scrollDistance: 0,

          timelineProgress: 0,
          currentIndex: 0,
          isAnimating: false,
          startX: 0,
          startY: 0,
          currentX: 0,
          isDragging: false,
          startScroll: 0,
          xSwipe: false,

          scrollTimeout: null,
          isScrolling: false,

          buttonHoldInterval: null,
          buttonHoldDirection: null,
          buttonHoldDelay: 300,
          buttonHoldSpeed: 100,
          initialButtonPress: true
        };

        this.setRootElement(placeholderSelector);

        this.cacheElements();
        this.calculatePlaceholderHeight();
        this.bindEvents();
        this.updateButtons();
        this.updateActiveItem(0);
        return this;
      },

      setRootElement(selector) {
        const element = typeof selector === 'string'
          ? document.querySelector(selector)
          : selector;

        if (!element) {
          console.warn(`TimelineScroll: Root element not found with selector "${selector}"`);
        }

        this.state.rootElement = element;
      },

      destroy() {
        window.removeEventListener('resize', this.onResize.bind(this));
        this.stopButtonHold();
      },

      next() {
        this.goToIndex(this.state.currentIndex + 1);
      },

      prev() {
        this.goToIndex(this.state.currentIndex - 1);
      },

      goTo(index) {
        this.goToIndex(index);
      },

      getCurrentIndex() {
        return this.state.currentIndex;
      },

      startButtonHold(direction) {
        const s = this.state;

        if (s.buttonHoldInterval) {
          clearInterval(s.buttonHoldInterval);
        }

        s.buttonHoldDirection = direction;
        s.initialButtonPress = true;

        if (direction === 'next') {
          this.next();
        } else {
          this.prev();
        }

        s.buttonHoldInterval = setTimeout(() => {
          s.initialButtonPress = false;
          s.buttonHoldInterval = setInterval(() => {
            if (s.buttonHoldDirection === 'next') {
              this.next();
            } else {
              this.prev();
            }
          }, s.buttonHoldSpeed);
        }, s.buttonHoldDelay);
      },

      stopButtonHold() {
        const s = this.state;

        if (s.buttonHoldInterval) {
          clearTimeout(s.buttonHoldInterval);
          clearInterval(s.buttonHoldInterval);
          s.buttonHoldInterval = null;
          s.buttonHoldDirection = null;
        }
      },

      cacheElements() {
        const s = this.state;
        const selectors = this.config.selectors;

        s.timelinePlaceholder = s.rootElement;
        s.timelineContainer = this.findElement(selectors.container);
        s.timeline = this.findElement(selectors.timeline);
        s.timelineWrapper = this.findElement(selectors.wrapper);
        s.timelineItems = this.findElement(selectors.items, true);
        s.btnPrev = this.findElement(selectors.btnPrev);
        s.btnNext = this.findElement(selectors.btnNext);

        this.validateRequiredElements();
      },

      findElement(selector, all = false) {
        if (all) {
          return this.state.rootElement.querySelectorAll(selector);
        }
        return this.state.rootElement.querySelector(selector);
      },

      validateRequiredElements() {
        const s = this.state;
        const required = [
          { element: s.timelineContainer, name: 'container' },
          { element: s.timeline, name: 'timeline' },
          { element: s.timelineWrapper, name: 'wrapper' },
          { element: s.timelineItems, name: 'items' }
        ];

        required.forEach(({ element, name }) => {
          if (!element || (Array.isArray(element) && element.length === 0)) {
            console.warn(`TimelineScroll: Required element "${name}" not found with selector "${this.config.selectors[name]}"`)
          }
        });
      },

      isMobileDevice() {
        return window.innerWidth <= this.config.breakpoint;
      },

      calculatePlaceholderHeight() {
        const s = this.state;

        if (this.isMobileDevice()) {
          s.timelinePlaceholder.style.height = 'auto';
          return;
        }

        s.containerHeight = s.timelineContainer.offsetHeight;
        s.itemWidth = s.timelineItems[0].offsetWidth;
        s.containerWidth = s.timeline.offsetWidth;
        s.totalWidth = s.itemWidth * s.timelineItems.length;
        s.maxScroll = Math.max(0, s.totalWidth - s.containerWidth);
        s.scrollDistance = s.maxScroll;
        s.placeholderHeight = s.containerHeight + s.scrollDistance;

        s.timelinePlaceholder.style.height = `${s.placeholderHeight}px`;
      },

      updateButtons() {
        const s = this.state;
        if (this.isMobileDevice() || !s.btnPrev || !s.btnNext) return;

        s.btnPrev.disabled = s.currentIndex === 0;
        s.btnNext.disabled = s.currentIndex === s.timelineItems.length - 1;
      },

      goToIndex(index) {
        if (this.isMobileDevice()) {
          return this.goToIndexMobile(index);
        }

        const s = this.state;
        if (s.isAnimating) return;

        index = Math.max(0, Math.min(index, s.timelineItems.length - 1));
        if (index === s.currentIndex) return;

        s.isAnimating = true;

        const maxIndex = s.timelineItems.length - 1;
        const targetProgress = index / maxIndex;
        const containerTop = s.timelinePlaceholder.offsetTop;
        const targetScroll = containerTop + (targetProgress * s.scrollDistance);

        lenis.scrollTo(targetScroll, {
          duration: 0.4, // Было 0.7, стало 0.4
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          onComplete: () => {
            s.isAnimating = false;
          }
        });
      },

      goToIndexMobile(index) {
        const s = this.state;
        index = Math.max(0, Math.min(index, s.timelineItems.length - 1));
        const item = s.timelineItems[index];
        const itemLeft = item.offsetLeft;
        const itemWidth = item.offsetWidth;
        const containerWidth = s.timeline.offsetWidth;

        const scrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2);

        s.timeline.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });

        this.updateActiveItemMobile(index);
      },

      updateTimeline(scrollY) {
        const s = this.state;
        if (this.isMobileDevice()) return;

        const containerTop = s.timelinePlaceholder.offsetTop;

        let scrollProgress = (scrollY - containerTop) / s.scrollDistance;
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));

        if (scrollY >= containerTop && scrollY <= containerTop + s.scrollDistance) {
          s.timelineProgress = scrollProgress;

          const translateX = -s.timelineProgress * s.maxScroll;
          s.timelineWrapper.style.transform = `translateX(${translateX}px)`;

          this.updateActiveItem(s.timelineProgress);

        } else {
          if (scrollY < containerTop) {
            s.timelineProgress = 0;
            s.timelineWrapper.style.transform = 'translateX(0px)';
            this.updateActiveItem(0);
          } else if (scrollY > containerTop + s.scrollDistance) {
            s.timelineProgress = 1;
            s.timelineWrapper.style.transform = `translateX(${-s.maxScroll}px)`;
            this.updateActiveItem(1);
          }
        }
      },

      updateActiveItem(progress) {
        const s = this.state;
        const maxIndex = s.timelineItems.length - 1;
        const newIndex = Math.min(
          maxIndex,
          Math.round(progress * maxIndex)
        );

        if (newIndex !== s.currentIndex) {
          s.currentIndex = newIndex;

          s.timelineItems.forEach((item, index) => {
            item.classList.toggle('timeline-active', index === s.currentIndex);
          });

          this.updateButtons();
        }
      },

      updateActiveItemMobile(index) {
        const s = this.state;
        if (index !== s.currentIndex) {
          s.currentIndex = index;

          s.timelineItems.forEach((item, i) => {
            item.classList.toggle('timeline-active', i === s.currentIndex);
          });
        }
      },

      handleMobileScroll() {
        const s = this.state;
        if (!this.isMobileDevice()) return;

        clearTimeout(s.scrollTimeout);
        s.isScrolling = true;

        const scrollLeft = s.timeline.scrollLeft;
        const containerWidth = s.timeline.offsetWidth;
        const itemWidth = s.timelineItems[0].offsetWidth;

        const center = scrollLeft + (containerWidth / 2);

        let closestIndex = 0;
        let minDistance = Infinity;

        s.timelineItems.forEach((item, index) => {
          const itemLeft = item.offsetLeft;
          const itemCenter = itemLeft + (itemWidth / 2);
          const distance = Math.abs(center - itemCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        });

        this.updateActiveItemMobile(closestIndex);

        s.scrollTimeout = setTimeout(() => {
          s.isScrolling = false;

          if (!s.isScrolling) {
            this.goToIndex(closestIndex);
          }
        }, 100);
      },

      handleTouchStart(e) {
        const s = this.state;
        if (s.isAnimating) return;

        s.startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        s.startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        s.currentX = parseInt(getComputedStyle(s.timelineWrapper).transform.split(',')[4] || 0, 10);
        s.startScroll = lenis.scroll;
        s.isDragging = true;
        s.xSwipe = false;
        s.timelineWrapper.classList.add('grabbing');
      },

      handleTouchMove(e) {
        const s = this.state;
        if (!s.isDragging) return;
        e.preventDefault();

        const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const y = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

        if (!s.xSwipe) {
          const diffX = Math.abs(x - s.startX);
          const diffY = Math.abs(y - s.startY);

          if (diffY > diffX && diffY > 10) {
            s.isDragging = false;
            s.timelineWrapper.classList.remove('grabbing');
            return;
          }

          if (diffX > 10) {
            s.xSwipe = true;
            e.preventDefault();
          }
        }

        if (s.xSwipe) {
          const diff = x - s.startX;

          let newX = s.currentX + diff;

          newX = Math.min(Math.max(newX, -s.maxScroll), 0);

          s.timelineWrapper.style.transform = `translateX(${newX}px)`;

          lenis.scrollTo(s.startScroll, { immediate: true });
        }
      },

      handleTouchEnd(e) {
        const s = this.state;
        if (!s.isDragging) return;
        s.isDragging = false;
        s.timelineWrapper.classList.remove('grabbing');

        const x = e.type === 'touchend' ? (e.changedTouches ? e.changedTouches[0].clientX : 0) : e.clientX;
        const diff = x - s.startX;
        const velocity = diff / 100;

        if (Math.abs(diff) > 50 || Math.abs(velocity) > 0.5) {
          if (diff > 0) {
            this.goToIndex(s.currentIndex - 1);
          } else {
            this.goToIndex(s.currentIndex + 1);
          }
        } else {
          this.goToIndex(s.currentIndex);
        }
      },

      onLenisScroll({ scroll }) {
        if (!this.state.isDragging) {
          this.updateTimeline(scroll);
        }
      },

      onResize() {
        this.calculatePlaceholderHeight();
        this.updateTimeline(lenis.scroll);
        this.updateButtons();
      },

      bindEvents() {
        const s = this.state;

        if (s.btnPrev) {
          s.btnPrev.addEventListener('click', () => {
            this.goToIndex(s.currentIndex - 1);
          });

          s.btnPrev.addEventListener('mousedown', () => {
            this.startButtonHold('prev');
          });

          s.btnPrev.addEventListener('touchstart', () => {
            this.startButtonHold('prev');
          });

          s.btnPrev.addEventListener('mouseup', () => {
            this.stopButtonHold();
          });

          s.btnPrev.addEventListener('touchend', () => {
            this.stopButtonHold();
          });

          s.btnPrev.addEventListener('mouseleave', () => {
            this.stopButtonHold();
          });
        }

        if (s.btnNext) {
          s.btnNext.addEventListener('click', () => {
            this.goToIndex(s.currentIndex + 1);
          });

          s.btnNext.addEventListener('mousedown', () => {
            this.startButtonHold('next');
          });

          s.btnNext.addEventListener('touchstart', () => {
            this.startButtonHold('next');
          });

          s.btnNext.addEventListener('mouseup', () => {
            this.stopButtonHold();
          });

          s.btnNext.addEventListener('touchend', () => {
            this.stopButtonHold();
          });

          s.btnNext.addEventListener('mouseleave', () => {
            this.stopButtonHold();
          });
        }

        document.addEventListener('mouseup', () => {
          this.stopButtonHold();
        });

        document.addEventListener('touchend', () => {
          this.stopButtonHold();
        });

        if (!this.isMobileDevice()) {
          s.timelineWrapper.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
          s.timelineWrapper.addEventListener('mousedown', this.handleTouchStart.bind(this));

          s.timelineWrapper.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
          s.timelineWrapper.addEventListener('mousemove', this.handleTouchMove.bind(this));

          s.timelineWrapper.addEventListener('touchend', this.handleTouchEnd.bind(this));
          s.timelineWrapper.addEventListener('mouseup', this.handleTouchEnd.bind(this));
          s.timelineWrapper.addEventListener('mouseleave', this.handleTouchEnd.bind(this));
        }

        s.timeline.addEventListener('scroll', this.handleMobileScroll.bind(this));

        lenis.on('scroll', this.onLenisScroll.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
      }
    };

    TimelineScroll.create = function (placeholderSelector = '.timeline-placeholder', customSelectors = {}) {
      const instance = Object.create(this);
      return instance.init(placeholderSelector, customSelectors);
    };
    // можно вынести в отдельный файл - КОНЕЦ

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (document.getElementById('timelinePlaceholder')) {
      const timeline = TimelineScroll.create('#timelinePlaceholder');
    }

    if (document.querySelector('.about-page')) {
      document.documentElement.classList.add('about-page');
    }

  });
})();

function checkCookies() {
  document.cookie = 'COOKIE_ACCEPT=1;path=\'/\';expires:' + (new Date(new Date().getTime() + 86400e3 * 365).toUTCString());
  document.getElementById('cookie').remove();
}