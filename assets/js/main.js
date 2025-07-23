(function ($) {
  "use strict";

  var WidgetDefaultHandler = function ($scope) {

    // mailchimp form
    if ($scope.find(".mc-form").length) {
      $scope.find(".mc-form").each(function () {
        var Self = $(this);
        var mcURL = Self.data("url");
        var mcResp = Self.parent().find(".mc-form__response");

        Self.ajaxChimp({
          url: mcURL,
          callback: function (resp) {
            // appending response
            mcResp.append(function () {
              return '<p class="mc-message">' + resp.msg + "</p>";
            });
            // making things based on response
            if (resp.result === "success") {
              // Do stuff
              Self.removeClass("errored").addClass("successed");
              mcResp.removeClass("errored").addClass("successed");
              Self.find("input").val("");

              mcResp.find("p").fadeOut(10000);
            }
            if (resp.result === "error") {
              Self.removeClass("successed").addClass("errored");
              mcResp.removeClass("successed").addClass("errored");
              Self.find("input").val("");

              mcResp.find("p").fadeOut(10000);
            }
          }
        });
      });
    }

    // Sidebar
    if ($scope.find(".main-header--five__toggler, .sidebar-one__overlay, .sidebar-one__close").length) {
      $scope.find(".main-header--five__toggler, .sidebar-one__overlay, .sidebar-one__close").on("click", function (e) {
        e.preventDefault();
        $scope.find(".sidebar-one").toggleClass("active");
        $("body").toggleClass("locked");
      });
    }

    if ($scope.find(".wow").length) {
      var wow = new WOW({
        boxClass: "wow", // animated element css class (default is wow)
        animateClass: "animated", // animation css class (default is animated)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true // act on asynchronously loaded content (default is true)
      });
      // wow.init();
    }
    //Fact Counter + Text Count
    if ($scope.find(".count-box").length) {
      $scope.find(".count-box").appear(
        function () {
          var $t = $(this),
            n = $t.find(".count-text").attr("data-stop"),
            r = parseInt($t.find(".count-text").attr("data-speed"), 10);

          if (!$t.hasClass("counted")) {
            $t.addClass("counted");
            $({
              countNum: $t.find(".count-text").text()
            }).animate({
              countNum: n
            }, {
              duration: r,
              easing: "linear",
              step: function () {
                $t.find(".count-text").text(Math.floor(this.countNum));
              },
              complete: function () {
                $t.find(".count-text").text(this.countNum);
              }
            });
          }
        }, {
        accY: 0
      }
      );
    }

    // owl slider
    let cityrideowlCarousel = $scope.find(".cityride-owl__carousel");
    if (cityrideowlCarousel.length) {
      cityrideowlCarousel.each(function () {
        let elm = $(this);
        let options = elm.data("owl-options");
        let thmOwlCarousel = elm.owlCarousel(
          "object" === typeof options ? options : JSON.parse(options)
        );
        elm.find("button").each(function () {
          $(this).attr("aria-label", "carousel button");
        });
      });
    }

    let cityrideowlCarouselNav = $scope.find(".cityride-owl__carousel--custom-nav");
    if (cityrideowlCarouselNav.length) {
      cityrideowlCarouselNav.each(function () {
        let elm = $(this);
        let owlNavPrev = elm.data("owl-nav-prev");
        let owlNavNext = elm.data("owl-nav-next");
        $(owlNavPrev).on("click", function (e) {
          elm.trigger("prev.owl.carousel");
          e.preventDefault();
        });

        $(owlNavNext).on("click", function (e) {
          elm.trigger("next.owl.carousel");
          e.preventDefault();
        });
      });
    }

    if ($scope.find(".odometer").length) {
      var odo = $scope.find(".odometer");
      odo.each(function () {
        $(this).appear(function () {
          var countNumber = $(this).attr("data-count");
          $(this).html(countNumber);
        });
      });
    }

    if ($scope.find(".masonry-layout").length) {
      $scope.find(".masonry-layout").imagesLoaded(function () {
        $scope.find(".masonry-layout").isotope({
          layoutMode: "masonry"
        });
      });
    }

    if ($scope.find(".img-popup").length) {
      var groups = {};
      $scope.find(".img-popup").each(function () {
        var id = parseInt($(this).attr("data-group"), 10);

        if (!groups[id]) {
          groups[id] = [];
        }

        groups[id].push(this);
      });

      $.each(groups, function () {
        $(this).magnificPopup({
          type: "image",
          closeOnContentClick: true,
          closeBtnInside: false,
          gallery: {
            enabled: true
          }
        });
      });
    }

    if ($scope.find(".cityride-masonary").length) {
      $scope.find(".cityride-masonary").imagesLoaded(function () {
        $scope.find(".cityride-masonary").isotope({
          layoutMode: "masonry"
        });
      });
    }

    if ($scope.find(".post-filter").length) {
      $scope.find(".post-filter li")
        .children(".filter-text")
        .on("click", function () {
          var Self = $(this);
          var selector = Self.parent().attr("data-filter");
          $scope.find(".post-filter li").removeClass("active");
          Self.parent().addClass("active");
          $scope.find(".cityride-filter").isotope({
            filter: selector,
            animationOptions: {
              duration: 500,
              easing: "linear",
              queue: false
            }
          });
          return false;
        });
    }

    if ($scope.find(".post-filter.has-dynamic-filters-counter").length) {
      var activeFilterItem = $scope.find(".post-filter.has-dynamic-filters-counter").find(
        "li"
      );
      activeFilterItem.each(function () {
        var filterElement = $(this).data("filter");
        var count = $scope.find(".cityride-filter").find(filterElement).length;
        $(this)
          .children(".filter-text")
          .append('<span class="count">(' + count + ")</span>");
      });
    }

    if ($scope.find(".masonary-layout").length) {
      $scope.find(".masonary-layout").isotope({
        layoutMode: "masonry"
      });
    }
    if ($scope.find(".post-filter").length) {
      $scope
        .find(".post-filter li")
        .children(".filter-text")
        .on("click", function () {
          var Self = $(this);
          var selector = Self.parent().attr("data-filter");
          $scope.find(".post-filter li").removeClass("active");
          Self.parent().addClass("active");
          $scope.find(".filter-layout").isotope({
            filter: selector,
            animationOptions: {
              duration: 500,
              easing: "linear",
              queue: false
            }
          });
          return false;
        });
    }

    if ($scope.find(".tabs-box").length) {
      $(".tab-btn").on("click", function (e) {
        e.preventDefault();
        var target = $($(this).attr("data-tab"));
        if ($(target).is(":visible")) {
          return false;
        } else {
          target
            .parents(".tabs-box")
            // .find(".tab-buttons")
            .find(".tab-btn")
            .removeClass("active-btn");
          $(this).addClass("active-btn");
          target
            .parents(".tabs-box")
            // .find(".tabs-content")
            .find(".tab")
            .fadeOut(0);
          target
            .parents(".tabs-box")
            // .find(".tabs-content")
            .find(".tab")
            .removeClass("active-tab");
          $(target).fadeIn(300);
          $(target).addClass("active-tab");
        }
      });
    }

    if ($scope.find(".neighborhoods__faq").length) {
      $scope
        .find(".neighborhoods__faq")
        .find(".accrodion")
        .each(function () {
          $(this).on("click", function () {
            let tabName = $(this).data("name");
            $scope.find(".neighborhoods__img-box")
              .find(".neighborhoods__location-1")
              .removeClass("active");
            $scope.find(".neighborhoods__img-box")
              .find(".neighborhoods__location-1." + tabName)
              .addClass("active");
          });
        });
    }


    //accordion
    if ($(".cityride-accordion").length) {
      var accordionGrp = $(".cityride-accordion");
      accordionGrp.each(function () {
        var accordionName = $(this).data("grp-name");
        var Self = $(this);
        var accordion = Self.find(".accordion");
        Self.addClass(accordionName);
        Self.find(".accordion .accordion-content").hide();
        Self.find(".accordion.active").find(".accordion-content").show();
        accordion.each(function () {
          $(this)
            .find(".accordion-title")
            .on("click", function () {
              if ($(this).parent().hasClass("active") === false) {
                $(".cityride-accordion." + accordionName)
                  .find(".accordion")
                  .removeClass("active");
                $(".cityride-accordion." + accordionName)
                  .find(".accordion")
                  .find(".accordion-content")
                  .slideUp();
                $(this).parent().addClass("active");
                $(this).parent().find(".accordion-content").slideDown();
              }
            });
        });
      });
    }

    // Popular Causes Progress Bar
    if ($scope.find(".count-bar").length) {
      $scope.find(".count-bar").appear(
        function () {
          var el = $(this);
          var percent = el.data("percent");
          $(el).css("width", percent).addClass("counted");
        }, {
        accY: -50
      }
      );
    }

    // Popular Causes Progress Bar
    if ($scope.find(".circle-progress").length) {
      $scope.find(".circle-progress").appear(function () {
        let circleProgress = $scope.find(".circle-progress");
        circleProgress.each(function () {
          let progress = $(this);
          let progressOptions = progress.data("options");
          progress.circleProgress(progressOptions);
        });
      });
    }

    //Fact Counter + Text Count
    if ($scope.find(".count-box").length) {
      $scope.find(".count-box").appear(
        function () {
          var $t = $(this),
            n = $t.find(".count-text").attr("data-stop"),
            r = parseInt($t.find(".count-text").attr("data-speed"), 10);

          if (!$t.hasClass("counted")) {
            $t.addClass("counted");
            $({
              countNum: $t.find(".count-text").text()
            }).animate({
              countNum: n
            }, {
              duration: r,
              easing: "linear",
              step: function () {
                $t.find(".count-text").text(Math.floor(this.countNum));
              },
              complete: function () {
                $t.find(".count-text").text(this.countNum);
              }
            });
          }
        }, {
        accY: 0
      }
      );
    }

    
  // Page Scroll Percentage
  function scrollTopPercentage() {
    const scrollPercentage = () => {
      const scrollTopPos = document.documentElement.scrollTop;
      const calcHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollValue = Math.round((scrollTopPos / calcHeight) * 100);
      const scrollElementWrap = $("#scroll-top");

      scrollElementWrap.css(
        "background",
        `conic-gradient( var(--cityride-black2) ${scrollValue}%, var(--cityride-white) ${scrollValue}%)`
      );

      // ScrollProgress
      if (scrollTopPos > 100) {
        scrollElementWrap.addClass("active");
      } else {
        scrollElementWrap.removeClass("active");
      }

      if (scrollValue < 96) {
        $("#scroll-top-value").text(`${scrollValue}%`);
      } else {
        $("#scroll-top-value").html('<i class="fas fa-arrow-up"></i>');
      }
    };
    window.onscroll = scrollPercentage;
    window.onload = scrollPercentage;

    // Back to Top
    function scrollToTop() {
      document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    $("#scroll-top").on("click", scrollToTop);
  }

  scrollTopPercentage();

    // Circle Text
    let circleTypeElm = $scope.find(".curved-circle__item");
    if (circleTypeElm.length) {
      circleTypeElm.each(function () {
        let elm = $(this);
        let options = elm.data("circle-text-options");
        elm.circleType(
          "object" === typeof options ? options : JSON.parse(options)
        );
      });
    }

    let thmSwiperSliders = $scope.find(".thm-swiper__slider");
    if (thmSwiperSliders.length) {
      thmSwiperSliders.each(function () {
        let elm = $(this);
        let options = elm.data("swiper-options");
        let thmSwiperSlider = new Swiper(
          elm,
          "object" === typeof options ? options : JSON.parse(options)
        );
      });
    }

    let thmOwlCarousels = $scope.find(".cityride-owl__carousel");
    if (thmOwlCarousels.length) {
      thmOwlCarousels.each(function () {
        let elm = $(this);
        let options = elm.data("owl-options");
        let thmOwlCarousel = elm.owlCarousel(
          "object" === typeof options ? options : JSON.parse(options)
        );
      });
      window.dispatchEvent(new Event('resize'));
    }

    let thmOwlNavCarousels = $scope.find(".thm-owl__carousel--custom-nav");
    if (thmOwlNavCarousels.length) {
      thmOwlNavCarousels.each(function () {
        let elm = $(this);
        let owlNavPrev = elm.data("owl-nav-prev");
        let owlNavNext = elm.data("owl-nav-next");
        $(owlNavPrev).on("click", function (e) {
          elm.trigger("prev.owl.carousel");
          e.preventDefault();
        });

        $(owlNavNext).on("click", function (e) {
          elm.trigger("next.owl.carousel");
          e.preventDefault();
        });
      });
    }



    if ($scope.find(".post-filter").length) {
      var postFilterList = $scope.find(".post-filter li");
      // for first init
      $scope.find(".filter-layout").isotope({
        filter: ".filter-item",
        animationOptions: {
          duration: 500,
          easing: "linear",
          queue: false
        }
      });
      // on click filter links
      postFilterList.on("click", function () {
        var Self = $(this);
        var selector = Self.attr("data-filter");
        postFilterList.removeClass("active");
        Self.addClass("active");

        $scope.find(".filter-layout").isotope({
          filter: selector,
          animationOptions: {
            duration: 500,
            easing: "linear",
            queue: false
          }
        });
        return false;
      });
    }
    if ($scope.find(".curved-circle--item").length) {
      $scope.find(".curved-circle--item").circleType();
    }

    // Date Picker
    if ($scope.find(".cityride-datepicker").length) {
      $scope.find(".cityride-datepicker").each(function () {
        $(this).datepicker();
      });
    }

    if ($scope.find("#datepicker").length) {
      $scope.find("#datepicker").datepicker();
    }

    if ($scope.find("#datepicker2").length) {
      $scope.find("#datepicker2").datepicker();
    }

    cityride_stretch();

    function cityride_stretch() {
      var i = $(window).width();
      $scope.find(".row .cityride-stretch-element-inside-column").each(function () {
        var $this = $(this),
          row = $this.closest(".row"),
          cols = $this.closest('[class^="col-"]'),
          colsheight = $this.closest('[class^="col-"]').height(),
          rect = this.getBoundingClientRect(),
          l = row[0].getBoundingClientRect(),
          s = cols[0].getBoundingClientRect(),
          r = rect.left,
          d = i - rect.right,
          c = l.left + (parseFloat(row.css("padding-left")) || 0),
          u = i - l.right + (parseFloat(row.css("padding-right")) || 0),
          p = s.left,
          f = i - s.right,
          styles = {
            "margin-left": 0,
            "margin-right": 0
          };
        if (Math.round(c) === Math.round(p)) {
          var h = parseFloat($this.css("margin-left") || 0);
          styles["margin-left"] = h - r;
        }
        if (Math.round(u) === Math.round(f)) {
          var w = parseFloat($this.css("margin-right") || 0);
          styles["margin-right"] = w - d;
        }
        $this.css(styles);
      });
    }

    const choiceArray = document.querySelectorAll(".choice")
    choiceArray.forEach((card) => {
      card.addEventListener("click", () => {
        choiceArray.forEach((element) => {
          element.classList.remove("expand")
        })
        card.classList.add('expand')
      });
    });
  };

  var WidgetFaqHandler = function ($scope) {
    if ($scope.find(".accrodion-grp").length) {
      var accrodionGrp = $scope.find(".accrodion-grp");
      accrodionGrp.each(function () {
        var accrodionName = $(this).data("grp-name");
        var Self = $(this);
        var accordion = Self.find(".accrodion");
        Self.addClass(accrodionName);
        Self.find(".accrodion .accrodion-content").hide();
        Self.find(".accrodion.active").find(".accrodion-content").show();
        accordion.each(function () {
          $(this)
            .find(".accrodion-title")
            .on("click", function () {
              if ($(this).parent().hasClass("active") === false) {
                $scope.find(".accrodion-grp." + accrodionName)
                  .find(".accrodion")
                  .removeClass("active");
                $scope.find(".accrodion-grp." + accrodionName)
                  .find(".accrodion")
                  .find(".accrodion-content")
                  .slideUp();
                $(this).parent().addClass("active");
                $(this).parent().find(".accrodion-content").slideDown();
              }
            });
        });
      });
    }
  };



  //elementor front start
  $(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/widget",
      WidgetDefaultHandler
    );

    elementorFrontend.hooks.addAction(
      "frontend/element_ready/cityride-faq.default",
      WidgetFaqHandler
    );

  });

  // login
  $("#cityride-login").submit(function (event) {
    event.preventDefault();

    var login = "action=signup_paragon&param=login&" + $(this).serialize();
    var loginResult = $(".login-result");
    $.ajax({
      type: "POST",
      url: cityride_login_object.ajaxurl,
      data: login,
      beforeSend: function () {
        // setting a timeout
        loginResult.addClass("loading");
      },
      success: function (data) {
        loginResult.removeClass("loading");
        if (data.status == 2) {
          loginResult.removeClass("alert alert-warning");
          loginResult.html(data.message).addClass("alert alert-success");
          window.location.href = cityride_login_object.login_redirect_url;
        } else if (data.status == 1) {
          loginResult.html(data.message).addClass("alert alert-warning");
        } else {
          loginResult
            .html(cityride_login_object.message)
            .addClass("alert alert-warning");
        }
      }
    });
  }); //end login

  // register
  $("#cityride-registration").submit(function (event) {
    event.preventDefault();

    var signupForm =
      "action=signup_paragon&param=register&" + $(this).serialize();
    var registerationResult = $(".registration-result");
    $.ajax({
      type: "POST",
      url: cityride_login_object.ajaxurl,
      data: signupForm,
      beforeSend: function () {
        // setting a timeout
        registerationResult.addClass("loading");
      },
      success: function (data) {
        registerationResult.removeClass("loading");
        if (data.status == 2) {
          registerationResult.removeClass("alert alert-warning");
          registerationResult
            .html(data.message)
            .addClass("alert alert-success");
          window.location.href = cityride_login_object.registration_redirect_url;
        } else {
          registerationResult
            .html(data.message)
            .addClass("alert alert-warning");
        }
      }
    });
  }); //end register

})(jQuery);