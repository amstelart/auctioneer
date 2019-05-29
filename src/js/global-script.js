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
