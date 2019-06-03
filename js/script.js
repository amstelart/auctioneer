// (function(){
// код
// }());

(function(){

  // Добавление/удаление модификаторов при клике на переключение видимости
  var toggler = document.getElementById('main-nav-toggler');
  if(toggler){
    toggler.addEventListener('click', mainNavVisibleToggle);

    function mainNavVisibleToggle(e) {
      e.preventDefault();
      toggler.classList.toggle('burger--close'); // модификатор иконки (должен быть .burger)
      document.getElementById('main-nav').classList.toggle('main-nav--open');
    }
  }

  // Добавление/удаление модификаторов при фокусировке на ссылочном элементе
  var linkClassName = 'main-nav__link';
  var linkClassNameShowChild = 'main-nav__item--show-child';
  var findLinkClassName = new RegExp(linkClassName);
  // Слежение за всплывшим событием focus (нужно добавить класс, показывающий потомков)
  document.addEventListener('focus', function(event) {
    // Если событие всплыло от одной из ссылок гл. меню
    if (findLinkClassName.test(event.target.className)) {
      // Добавим классы, показывающие списки вложенных уровней, на всех родителей
      event.target.parents('.main-nav__item').forEach(function(item){
        item.classList.add(linkClassNameShowChild);
      });
    }
  }, true);
  // Слежение за всплывшим событием blur (нужно убрать класс, показывающий потомков)
  document.addEventListener('blur', function(event) {
    // Если событие всплыло от одной из ссылок гл. меню
    if (findLinkClassName.test(event.target.className)) {
      // Уберем все классы, показывающие списки 2+ уровней
      // event.target.closest('.main-nav').querySelectorAll('.'+linkClassNameShowChild).forEach(function(item){
      document.querySelectorAll('.'+linkClassNameShowChild).forEach(function(item){
        item.classList.remove(linkClassNameShowChild);
      });
    }
  }, true);



  // Добавление метода .parents()
  Element.prototype.parents = function(selector) {
    var elements = [];
    var elem = this;
    var ishaveselector = selector !== undefined;

    while ((elem = elem.parentElement) !== null) {
      if (elem.nodeType !== Node.ELEMENT_NODE) {
        continue;
      }

      if (!ishaveselector || elem.matches(selector)) {
        elements.push(elem);
      }
    }

    return elements;
  };

  // Добавление метода .closest() (полифил, собственно)
  // (function(e){
  //  e.closest = e.closest || function(css){
  //    var node = this;

  //    while (node) {
  //       if (node.matches(css)) return node;
  //       else node = node.parentElement;
  //    }
  //    return null;
  //  }
  // })(Element.prototype);

}());

svg4everybody();

/*
  Форма: работа стилизованного input[type="file"]
  Автор: Osvaldas Valutis, www.osvaldas.info (адаптировано под используемую разметку)
  Available for use under the MIT License
*/

;( function ()
{
  function closest(el, selector) {
    var matchesFn;

    // find vendor prefix
    ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
      if (typeof document.body[fn] == 'function') {
        matchesFn = fn;
        return true;
      }
      return false;
    })

    var parent;

    // traverse parents
    while (el) {
      parent = el.parentElement;
      if (parent && parent[matchesFn](selector)) {
        return parent;
      }
      el = parent;
    }

    return null;
  }

  var inputs = document.querySelectorAll( '.field-file__input' );
  Array.prototype.forEach.call( inputs, function( input )
  {
    var label  = closest(input, '.field-file').querySelector( '.field-file__name-text' ),
        labelVal = label.innerHTML;

    input.addEventListener( 'change', function( e ) {
      var fileName = '';
      if( this.files && this.files.length > 1 ) {
        fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
      }
      else {
        fileName = e.target.value.split( '\\' ).pop();
      }

      if( fileName ) {
        label.innerHTML = fileName;
      }
      else {
        label.innerHTML = labelVal;
      }
    });
  });
}());

$( document ).ready(function() {

  var t0;

  $('#toTop').hide().on('click', function(event){
    event.preventDefault();
    $('html, body').animate({scrollTop:0}, 300);
  });

  $(window).on('scroll', function(){
    clearTimeout(t0);
    t0 = setTimeout(function () {
        showScrollTopButton();
      }, 100);
  });

  showScrollTopButton();

  function showScrollTopButton(){
    if ( $(document).scrollTop() >= 900 ) {
      $('#toTop').fadeIn();
    }
    else {
      $('#toTop').fadeOut();
    }
  }

});

/* ========================================================================
 * Основано на: Bootstrap dropdown.js v3.3.6
 * Все изменения сопровождены закомментироваными оригиналами
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    // $(element).on('click.bs.dropdown', this.toggle)
    $(element).on('click.nth.dropdown', this.toggle)
  }

  // Dropdown.VERSION = '3.3.6'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      // selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      // if (!$parent.hasClass('open')) return
      if (!$parent.hasClass('dropdown--open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      // Выходим, если клик пришелся на элемент внутри .dropdown__menu
      if (e && e.type == 'click' && /dropdown__menu/i.test(e.toElement.offsetParent.className)) return

      // $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      // $parent.trigger(e = $.Event('hide.nth.dropdown', relatedTarget))

      // if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      // $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
      $parent.removeClass('dropdown--open').trigger($.Event('hidden.nth.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    console.log('закрыть');
    var $this = $(this)

    // if ($this.is('.disabled, :disabled')) return
    if ($this.is(':disabled')) return

    var $parent  = getParent($this)
    // var isActive = $parent.hasClass('open')
    var isActive = $parent.hasClass('dropdown--open')

    clearMenus()

    if (!isActive) {
      // if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
      if ('ontouchstart' in document.documentElement) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      // $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))
      // $parent.trigger(e = $.Event('show.nth.dropdown', relatedTarget))

      // if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        // .toggleClass('open')
        .toggleClass('dropdown--open')
        // .trigger($.Event('shown.bs.dropdown', relatedTarget))
        .trigger($.Event('shown.nth.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    // if ($this.is('.disabled, :disabled')) return
    if ($this.is(':disabled')) return

    var $parent  = getParent($this)
    // var isActive = $parent.hasClass('open')
    var isActive = $parent.hasClass('dropdown--open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    // var desc = ' li:not(.disabled):visible a'
    // var $items = $parent.find('.dropdown-menu' + desc)
    var $items = $parent.find('.dropdown__menu a')

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      // var data  = $this.data('bs.dropdown')
      var data  = $this.data('nth.dropdown')

      // if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (!data) $this.data('nth.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    // .on('click.bs.dropdown.data-api', clearMenus)
    // .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    // .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    // .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    // .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)
    .on('click.nth.dropdown.data-api', clearMenus)
    .on('click.nth.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.nth.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.nth.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.nth.dropdown.data-api', '.dropdown__menu', Dropdown.prototype.keydown)

}(jQuery);

// $(document).ready(function(){

//   $("#owl-carousel-demo").owlCarousel({
//     items: 3,
//     nav: true,
//     loop: true,
//     center: true,
//     responsive : {
//       0 : {
//         items: 1,
//         nav: true,
//         loop: true,
//         center: true,
//       },
//       480 : {
//         items: 3,
//       },
//       768 : {
//         items: 3,
//       },
//       992 : {
//         items: 3,
//       },
//       1200 : {
//         items: 3,
//       },
//       1800 : {
//         items: 3,
//       }
//     }
//   });

// });

// document.addEventListener('DOMContentLoaded', function(){

//   window.mySwipe = new Swipe(document.getElementById('swipe-slider'), {
//     startSlide: 0,
//     speed: 400,
//     auto: 3000,
//     draggable: true,
//     continuous: true,
//     disableScroll: true,
//     stopPropagation: true,
//     callback: function(index, elem, dir) {},
//     transitionEnd: function(index, elem) {}
//   });

// });

document.addEventListener('DOMContentLoaded', function(){

  document.addEventListener('click', function(event) {
    if(event.target.dataset.toggle === 'off-canvas') {
      event.preventDefault();
      offCanvasToggle();
    }
    // возможность совместить переключение off-canvas и встроенную функ-сть
    if(event.target.dataset.toggleNative === 'off-canvas') {
      offCanvasToggle();
    }
  });

  // реакция на свайп
  // document.addEventListener('touchstart', handleTouchStart, false);
  // document.addEventListener('touchmove', handleTouchMove, false);
  // var xDown = null;
  // var yDown = null;
  // function handleTouchStart(evt) {
  //   xDown = evt.touches[0].clientX;
  //   yDown = evt.touches[0].clientY;
  // };
  // function handleTouchMove(evt) {
  //   if ( ! xDown || ! yDown ) {
  //     return;
  //   }

  //   var xUp = evt.touches[0].clientX;
  //   var yUp = evt.touches[0].clientY;

  //   var xDiff = xDown - xUp;
  //   var yDiff = yDown - yUp;
  //   if(Math.abs( xDiff )+Math.abs( yDiff )>100){ //to deal with to short swipes

  //     if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
  //       if ( xDiff > 0 ) {/* left swipe */
  //         document.getElementById('off-canvas').classList.remove('off-canvas--open');
  //       } else {/* right swipe */
  //         document.getElementById('off-canvas').classList.add('off-canvas--open');
  //       }
  //     }
  //     // else {
  //     //   if ( yDiff > 0 ) {/* up swipe */
  //     //     alert('Up!');
  //     //   } else { /* down swipe */
  //     //     alert('Down!');
  //     //   }
  //     // }
  //     /* reset values */
  //     xDown = null;
  //     yDown = null;
  //   }
  // };

  function offCanvasToggle() {
    document.getElementById('off-canvas').classList.toggle('off-canvas--open');
  }

});

/* ========================================================================
 * Основано на Bootstrap: modal.js v3.3.7
 * Изменения минимальны: имена классов, событий, методов...
 * ========================================================================
 * Copyright 2011-2017 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    // this.$dialog             = this.$element.find('.modal-dialog')
    this.$dialog             = this.$element.find('.modal__dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    // if (this.options.remote) {
    //   this.$element
    //     // .find('.modal-content')
    //     .find('.modal__content')
    //     .load(this.options.remote, $.proxy(function () {
    //       // this.$element.trigger('loaded.bs.modal')
    //       this.$element.trigger('loaded.nth.modal')
    //     }, this))
    // }
  }

  Modal.VERSION  = '3.3.7'

  // Modal.TRANSITION_DURATION = 300
  // Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    // var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })
    var e    = $.Event('show.nth.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    // this.$body.addClass('modal-open')
    this.$body.addClass('js-modal-open')

    this.escape()
    this.resize()

    // this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))
    this.$element.on('click.dismiss.nth.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    // this.$dialog.on('mousedown.dismiss.bs.modal', function () {
    this.$dialog.on('mousedown.dismiss.nth.modal', function () {
      // that.$element.one('mouseup.dismiss.bs.modal', function (e) {
      that.$element.one('mouseup.dismiss.nth.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      // var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        // .show()
        .css('display', 'flex')
        .scrollTop(0)

      that.adjustDialog()

      // if (transition) {
        that.$element[0].offsetWidth // force reflow
      // }

      that.$element.addClass('modal--open')

      that.enforceFocus()

      // var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })
      var e = $.Event('shown.nth.modal', { relatedTarget: _relatedTarget })

      // transition ?
      //   that.$dialog // wait for modal to slide in
      //     .one('bsTransitionEnd', function () {
      //       that.$element.trigger('focus').trigger(e)
      //     })
      //     .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    // e = $.Event('hide.bs.modal')
    e = $.Event('hide.nth.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    // $(document).off('focusin.bs.modal')
    $(document).off('focusin.nth.modal')

    this.$element
      .removeClass('modal--open')
      // .off('click.dismiss.bs.modal')
      .off('click.dismiss.nth.modal')
      // .off('mouseup.dismiss.bs.modal')
      .off('mouseup.dismiss.nth.modal')

    // this.$dialog.off('mousedown.dismiss.bs.modal')
    this.$dialog.off('mousedown.dismiss.nth.modal')

    // $.support.transition && this.$element.hasClass('fade') ?
    //   this.$element
    //     .one('bsTransitionEnd', $.proxy(this.hideModal, this))
    //     .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      // .off('focusin.bs.modal') // guard against infinite focus loop
      .off('focusin.nth.modal') // guard against infinite focus loop
      // .on('focusin.bs.modal', $.proxy(function (e) {
      .on('focusin.nth.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      // this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
      this.$element.on('keydown.dismiss.nth.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      // this.$element.off('keydown.dismiss.bs.modal')
      this.$element.off('keydown.dismiss.nth.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      // $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
      $(window).on('resize.nth.modal', $.proxy(this.handleUpdate, this))
    } else {
      // $(window).off('resize.bs.modal')
      $(window).off('resize.nth.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('js-modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      // that.$element.trigger('hidden.bs.modal')
      that.$element.trigger('hidden.nth.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    // var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      // var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        // .addClass('modal-backdrop ' + animate)
        .addClass('modal__backdrop ')
        .appendTo(this.$body)

      // this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
      this.$element.on('click.dismiss.nth.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      // if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      // this.$backdrop.addClass('modal__backdrop--shown')

      if (!callback) return

      // doAnimate ?
      //   this.$backdrop
      //     .one('bsTransitionEnd', callback)
      //     .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('modal--open')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      // $.support.transition && this.$element.hasClass('fade') ?
      //   this.$backdrop
      //     .one('bsTransitionEnd', callbackRemove)
      //     .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    scrollDiv.style.overflow="scroll"; // nicothin: Отчего-то результатом подсчета всегда был 0 :(
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      // var data    = $this.data('bs.modal')
      var data    = $this.data('nth.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      // if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (!data) $this.data('nth.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  // $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
  $(document).on('click.nth.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    // var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
    var option  = $target.data('nth.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    // $target.one('show.bs.modal', function (showEvent) {
    $target.one('show.nth.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      // $target.one('hidden.bs.modal', function () {
      $target.one('hidden.nth.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

document.addEventListener('DOMContentLoaded', function(){

  if(location.hash) {
    showTab(location.hash);
  }

  // Следим за поднимающимися кликами
  document.addEventListener('click', function(event) {
    if(event.target.dataset.toggle === 'tab') {
      event.preventDefault();
      var target = event.target.hash === undefined ? event.target.dataset.target : event.target.hash;
      if ( target !== undefined ) {
        showTab(target);
        if(history && history.pushState && history.replaceState) {
          var stateObject = {'url' : target};
          if (window.location.hash && stateObject.url !== window.location.hash) {
            window.history.pushState(stateObject, document.title, window.location.pathname + target);
          } else {
            window.history.replaceState(stateObject, document.title, window.location.pathname + target);
          }
        }
      }
    }
  });

  /**
   * Показывает таб
   * @param  {string} tabId ID таба, который нужно показать
   */
  function showTab(tabId){
    var element = document.querySelector(tabId);
    if ( element && element.classList.contains('tabs__content-item') ) {
      var tabsParent = document.querySelector(tabId).closest('.tabs');
      var activeTabClassName = 'tabs__link-wrap--active';
      var activeTabContentClassName = 'tabs__content-item--active';
      // таб
      tabsParent.querySelectorAll('.'+activeTabClassName).forEach(function(item){
        item.classList.remove(activeTabClassName);
      });
      var activeTab = tabsParent.querySelector('[href="'+tabId+'"]') ? tabsParent.querySelector('[href="'+tabId+'"]') : tabsParent.querySelector('[data-target="'+tabId+'"]')
      activeTab.closest('.tabs__link-wrap').classList.add(activeTabClassName);
      // контент таба
      tabsParent.querySelectorAll('.'+activeTabContentClassName).forEach(function(item){
        item.classList.remove(activeTabContentClassName);
      });
      tabsParent.querySelector(tabId).classList.add(activeTabContentClassName);
    }
  }

  // Добавление метода .closest() (полифил, собственно)
  (function(e){
   e.closest = e.closest || function(css){
     var node = this;

     while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
     }
     return null;
   }
  })(Element.prototype);

});

document.addEventListener('DOMContentLoaded', function(){
  objectFitImages();
});

document.addEventListener('DOMContentLoaded', function(){

  function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
  }

  var charts = $$('.pie-chart');

  for (var i = 0; i < charts.length; i++) {
    var size = charts[i].getAttribute('data-size');
    if(!size) size = 100;
    var border = charts[i].getAttribute('data-border');
    if(!border) border = 20;
    var radius = (size / 2) - (border / 2);
    var fullStroke = 2 * 3.141592 * radius;
    var percentText = parseFloat(charts[i].textContent);
    var percent = fullStroke / 100 * percentText;
    var nameSpace = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(nameSpace, 'svg');
    var circle = document.createElementNS(nameSpace, 'circle');
    var circleBack = document.createElementNS(nameSpace, 'circle');
    var title = document.createElementNS(nameSpace, 'title');
    var span = document.createElement('span');
    span.className = 'pie-chart__descr';
    span.innerHTML = charts[i].textContent;

    svg.setAttribute('class', 'pie-chart__svg');
    svg.setAttribute('viewBox', '0 0 ' + size + ' ' + size);
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    circleBack.setAttribute('r', (size / 2));
    circleBack.setAttribute('class', 'pie-chart__circle-back');
    circleBack.setAttribute('cx', size / 2);
    circleBack.setAttribute('cy', size / 2);
    circle.setAttribute('class', 'pie-chart__circle');
    circle.setAttribute('r', radius);
    circle.setAttribute('cx', size / 2);
    circle.setAttribute('cy', size / 2);
    circle.setAttribute('stroke-dasharray', percent + ' ' + fullStroke);
    circle.setAttribute('stroke-width', border);
    title.textContent = charts[i].textContent;

    charts[i].textContent = '';
    svg.appendChild(title);
    svg.appendChild(circleBack);
    svg.appendChild(circle);
    charts[i].appendChild(svg);
    charts[i].appendChild(span);
  }

});

document.addEventListener('DOMContentLoaded', function() {

  var allTooltips = document.querySelectorAll('.tooltip');

  Array.prototype.forEach.call(allTooltips, function (tooltip) {

    var tooltipBtn = tooltip.querySelector('.tooltip__btn');
    var messageWrap = document.createElement('span');
    var message = tooltipBtn.getAttribute('data-tooltip-content');

    messageWrap.setAttribute('role', 'status');
    tooltip.appendChild(messageWrap);

    tooltipBtn.addEventListener('click', function () {
      messageWrap.innerHTML = '';
      // window.setTimeout(function() {
        messageWrap.innerHTML = '<span class="tooltip__bubble">'+ message +'</span>';
      // }, 100);
    });

    document.addEventListener('click', function (e) {
      if (tooltipBtn != e.target) {
        messageWrap.innerHTML = '';
      }
    });

    tooltipBtn.addEventListener('keydown', function(e) {
      if ((e.keyCode || e.which) === 27)
        messageWrap.innerHTML = '';
      });
    });

});

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
