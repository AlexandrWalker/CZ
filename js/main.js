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

    function accordionFunc() {
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

    accordionFunc();
  });
})();