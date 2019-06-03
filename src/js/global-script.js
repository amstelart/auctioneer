// Подключение и настройка библиотек

$(document).ready(function() {

  $(".phone-mask").mask("+7(999) 999-9999");
  $(".time-mask").mask("99:99");

  var sync1 = jQuery("#sync1");
  var sync2 = jQuery("#sync2");
  var slidesPerPage = 3; //globaly define number of elements per page
  var syncedSecondary = true;

  sync1.owlCarousel({
      items: 1,
      slideSpeed: 3000,
      nav: true,
      autoplay: false,
      mouseDrag: false,
      touchDrag: false,

      //   animateOut: 'fadeOut',
      animateIn: "fadeIn",
      nav: false,
      autoplayHoverPause: true,
      autoplaySpeed: 1400, //過場速度
      dots: false,
      loop: true,
      responsiveClass: true,
      responsiveRefreshRate: 200
    })
    .on("changed.owl.carousel", syncPosition);

  sync2.on("initialized.owl.carousel", function() {
      sync2.find(".owl-item")
        .eq(0)
        .addClass("current");
    })
    .owlCarousel({
      items: slidesPerPage,
      dots: false,
      smartSpeed: 1000,
      margin: 10,
      slideSpeed: 1000,
      slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
      responsiveRefreshRate: 100
    })
    .on("changed.owl.carousel", syncPosition2);

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current = el.item.index;

    //if you disable loop you have to comment this block
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }

    //end block

    sync2.find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync2.find(".owl-item.active").length - 1;
    var start = sync2
      .find(".owl-item.active")
      .first()
      .index();
    var end = sync2
      .find(".owl-item.active")
      .last()
      .index();

    if (current > end) {
      sync2.data("owl.carousel").to(current, 100, true);
    }
    if (current < start) {
      sync2.data("owl.carousel").to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      sync1.data("owl.carousel").to(number, 100, true);
    }
  }

  sync2.on("click", ".owl-item", function(e) {
    e.preventDefault();
    var number = jQuery(this).index();
    sync1.data("owl.carousel").to(number, 300, true);
  });
});

$(".popular-carousel").owlCarousel({
  items: 6,
  nav: true,
  loop: true,
  margin: 30,
  center: false,
  navContainer: ".popular-carousel__nav",
  responsive : {
    0 : {
      items: 1,
      nav: true,
      loop: true,
      center: true,
    },
    480 : {
      items: 2,
    },
    768 : {
      items: 3,
    },
    992 : {
      items: 4,
    },
    1200 : {
      items: 6,
    },
    1800 : {
      items: 6,
    }
  }
});

// List view and Grid view
$(".category-view__control .category-view__control-icon._list").click(function (e) {
    e.preventDefault();
    $('.layout-category__list > .card').addClass("card--list");
    $('.category-view__control-icon._table').removeClass("active");
    $('.category-view__control-icon._list').addClass("active");
});

$(".category-view__control .category-view__control-icon._table").click(function (e) {
    e.preventDefault();
    $('.layout-category__list > .card').removeClass("card--list");
    $('.category-view__control-icon._list').removeClass("active");
    $('.category-view__control-icon._table').addClass("active")

    setTimeout(function () {

    }, 300);
});

$( document ).ready(function() {
  // steps-slider
  var stepsSlider = document.getElementById('steps-slider');
  var input0 = document.getElementById('input-with-keypress-0');
  var input1 = document.getElementById('input-with-keypress-1');
  var inputs = [input0, input1];

    noUiSlider.create(stepsSlider, {
        start: [20, 80],
        connect: true,
        range: {
            'min': [0],
            '10%': [10, 10],
            '50%': [80, 50],
            '80%': 150,
            'max': 200
        }
    });

    stepsSlider.noUiSlider.on('update', function (values, handle) {
        inputs[handle].value = values[handle];
    });

    // Listen to keydown events on the input field.
    inputs.forEach(function (input, handle) {

        input.addEventListener('change', function () {
            stepsSlider.noUiSlider.setHandle(handle, this.value);
        });

        input.addEventListener('keydown', function (e) {

            var values = stepsSlider.noUiSlider.get();
            var value = Number(values[handle]);

            // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
            var steps = stepsSlider.noUiSlider.steps();

            // [down, up]
            var step = steps[handle];

            var position;

            // 13 is enter,
            // 38 is key up,
            // 40 is key down.
            switch (e.which) {

                case 13:
                    stepsSlider.noUiSlider.setHandle(handle, this.value);
                    break;

                case 38:

                    // Get step to go increase slider value (up)
                    position = step[1];

                    // false = no step is set
                    if (position === false) {
                        position = 1;
                    }

                    // null = edge of slider
                    if (position !== null) {
                        stepsSlider.noUiSlider.setHandle(handle, value + position);
                    }

                    break;

                case 40:

                    position = step[0];

                    if (position === false) {
                        position = 1;
                    }

                    if (position !== null) {
                        stepsSlider.noUiSlider.setHandle(handle, value - position);
                    }

                    break;
            }
        });
    });
});
