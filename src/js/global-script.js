// Подключение и настройка библиотек

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
