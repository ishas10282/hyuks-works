$(document).ready(function () {
  scrollTrigger();
  popUp();
  topBtn();

  function topBtn() {
    const topBtn = $(".fixed-top");
    $(window).on("scroll", function () {
      let currentY = $(window).scrollTop();
      if (currentY > 10) {
        topBtn.addClass("active");
      } else {
        topBtn.removeClass("active");
      }
    });

    topBtn.click(function () {
      $(window).scrollTop(0);
    });
  }
  function popUp() {
    // 팝업 열기
    $(document).on("click", ".popup-btn", function () {
      if ($(this).is(".error")) return;
      console.log("click");
      console.log($(this).data("detail"));
      const src = $(this).data("detail");

      $(".loading").show();
      $(".detail-box img").hide();

      const img = new Image();

      img.onload = function () {
        $(".detail-box img").attr("src", src).show();

        $(".loading").hide();
      };

      img.src = src;
      $("body").addClass("popup-open");
      $(".detail-pop").scrollTop(0).fadeIn();
    });

    // 팝업 닫기
    $(document).on("click", ".x-btn", closePopup);

    $(document).on("click", ".detail-pop", function (e) {
      if ($(e.target).closest(".detail-box").length === 0) {
        closePopup();
      }
    });

    $(document).on("keydown", function (e) {
      if (e.key === "Escape") {
        closePopup();
      }
    });

    function closePopup() {
      $(".detail-pop").fadeOut();
      $("body").removeClass("popup-open");
    }
  }
});

// --------- 스크롤트리거
function scrollTrigger() {
  // 네비게이션 메뉴 액티브
  $(".section").each(function (index) {
    ScrollTrigger.create({
      trigger: this,
      start: "top 20%",
      end: "bottom 20%",

      onToggle: (self) => {
        if (self.isActive) {
          $(".menu").removeClass("active");
          $(".menu").eq(index).addClass("active");
        }
      },

      toggleClass: {
        targets: this,
        className: "active",
      },
    });
  });

  // 네비게이션 스크롤바 계산
  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height() - $(window).height();

    const percent = (scrollTop / docHeight) * 100;

    $(".scroll-bar").css("height", percent + "%");
  });

  // fill-text 텍스트 컬러 애니메이션
  ScrollTrigger.create({
    trigger: "#about",
    start: "top 20%",

    toggleClass: {
      targets: ".fill-text",
      className: "active",
    },
  });

  // Fade, Scale 통합 애니메이션 설정
  const animations = {
    "fade-up": {
      from: { y: 50, opacity: 0 },
      to: { y: 0, opacity: 1 },
    },

    "fade-left": {
      from: { x: -50, opacity: 0 },
      to: { x: 0, opacity: 1 },
    },

    "fade-right": {
      from: { x: 50, opacity: 0 },
      to: { x: 0, opacity: 1 },
    },

    "scale-up": {
      from: {
        scaleY: 0,
        transformOrigin: "center bottom",
      },
      to: {
        scaleY: 1,
      },
    },

    "scale-down": {
      from: {
        scaleY: 0,
        transformOrigin: "center top",
      },
      to: {
        scaleY: 1,
      },
    },

    "scale-left": {
      from: {
        scaleX: 0,
        transformOrigin: "right center",
      },
      to: {
        scaleX: 1,
      },
    },

    "scale-right": {
      from: {
        scaleX: 0,
        transformOrigin: "left center",
      },
      to: {
        scaleX: 1,
      },
    },
  };

  // Fade, Scale 애니메이션 실행
  $(".section").each(function () {
    const section = $(this);

    // 섹션 내 애니메이션 전체 수집 및 배열화
    const selector = Object.keys(animations)
      .map((name) => "." + name)
      .join(",");

    const items = section.find(selector);

    items.each(function () {
      const el = $(this);

      $.each(animations, function (className, animation) {
        if (el.hasClass(className)) {
          gsap.set(el, animation.from);
        }
      });
    });

    ScrollTrigger.create({
      trigger: this,
      start: "top 70%",

      onEnter: () => {
        items.each(function (index) {
          const el = $(this);

          $.each(animations, function (className, animation) {
            if (el.hasClass(className)) {
              gsap.to(el, {
                ...animation.to,
                duration: 0.8,
                ease: "power2.out",
                delay: index * 0.15,
              });
            }
          });
        });
      },

      onLeaveBack: () => {
        items.each(function () {
          const el = $(this);

          $.each(animations, function (className, animation) {
            if (el.hasClass(className)) {
              gsap.set(el, animation.from);
            }
          });
        });
      },
    });
  });
}
