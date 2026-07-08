$(document).ready(function () {
  blocks();
  designSlide();
  swipers();
  popUp();

  function swipers() {
    const projSwiper = new Swiper(".projSwiper", {
      loop: true,
      spaceBetween: 20,
      speed: 1200,

      //   autoplay: {
      //     delay: 3000,
      //     disableOnInteraction: false,
      //   },

      pagination: {
        el: ".solo-proj .swiper-pagination",
        type: "progressbar",
      },
      navigation: {
        nextEl: ".solo-proj .swiper-button-next",
        prevEl: ".solo-proj .swiper-button-prev",
      },
    });
    const comSwiper = new Swiper(".comSwiper", {
      loop: true,
      spaceBetween: 20,
      speed: 1200,

      //   autoplay: {
      //     delay: 3000,
      //     disableOnInteraction: false,
      //   },

      pagination: {
        el: ".dev-proj .swiper-pagination",
        type: "progressbar",
      },
      navigation: {
        nextEl: ".dev-proj .swiper-button-next",
        prevEl: ".dev-proj .swiper-button-prev",
      },
    });
  }

  function popUp() {
    // 팝업 열기
    $(document).on("click", ".design-item", function () {
      if ($(this).is(".error")) return;
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

  // --------- Design 섹션 스와이퍼 슬라이드
  function designSlide() {
    // 스와이퍼 기본 설정
    const swiper = new Swiper(".designSwiper", {
      speed: 600,

      navigation: {
        nextEl: ".swiper-next",
        prevEl: ".swiper-prev",
      },

      grabCursor: true,

      slidesPerView: 1,
      centeredSlides: false,

      breakpoints: {
        0: {
          slidesPerView: 1.2,
          centeredSlides: true,
          spaceBetween: 20,
        },

        768: {
          slidesPerView: 1,
          centeredSlides: false,
          spaceBetween: 0,
        },
      },

      on: {
        slideChange() {
          updateProgress();
        },
      },
    });

    // 카테고리 초기설정 및 렌더링 갯수 설정
    let currentCategory = "all";
    const itemsPerPage = getItemsPerPage();

    // 렌더링 갯수 함수
    function getItemsPerPage() {
      const width = $(window).innerWidth();

      if (width < 768) return 2;
      if (width < 1024) return 4;

      return 8;
    }

    // 프로젝트 필터링 및 배열화
    function getFilteredData() {
      if (currentCategory === "all") {
        return projects;
      }

      return projects.filter((item) => item.category === currentCategory);
    }

    // 스와이퍼 슬라이드 렌더링
    function renderSwiper() {
      const filtered = getFilteredData();

      const itemsPerPage = getItemsPerPage();

      swiper.removeAllSlides();

      for (let i = 0; i < filtered.length; i += itemsPerPage) {
        const chunk = filtered.slice(i, i + itemsPerPage);

        let slide = `
      <div class="swiper-slide">
        <div class="design-grid">
    `;

        chunk.forEach((item) => {
          slide += `
        <div
          class="design-item design-thumb ${item.category}"
          data-detail="${item.detail}"
        >
          <div class="design-img">
            <img src="${item.thumb}">
          </div>

          <div class="design-overlay">
            <div class="design-desc">
              <p>${item.sub}</p>
              <h4>${item.title}</h4>
            </div>

            <div class="design-btn">
              자세히 보기
            </div>
          </div>
        </div>
      `;
        });

        slide += `
        </div>
      </div>
    `;

        swiper.appendSlide(slide);
      }

      swiper.slideTo(0, 0);

      updateProgress();
    }

    // Progress Bar 렌더링
    function updateProgress() {
      const total = swiper.slides.length || 1;

      const current = swiper.activeIndex + 1;

      $(".current").text(String(current).padStart(2, "0"));

      $(".total").text(String(total).padStart(2, "0"));

      gsap.to(".progress-fill", {
        width: `${(current / total) * 100}%`,
        duration: 0.4,
      });
    }

    // 필터아이템 클릭
    $(document).on("click", ".category", function () {
      const w_top = $("#design").offset().top;

      $(".category").removeClass("active");
      $(this).addClass("active");

      currentCategory = $(this).data("cate");

      swiper.slideTo(0, 0); // 첫 페이지 이동
      $(window).scrollTop(w_top);
      renderSwiper();
    });

    // 초기 실행
    renderSwiper();

    // 이미지 PreLoad
    projects.forEach((item) => {
      const img = new Image();
      img.src = item.detail;
    });
  }

  function blocks() {
    const { Engine, Render, Runner, Bodies, Composite, Body, Events } = Matter;
    const measureCanvas = document.createElement("canvas");

    const measureCtx = measureCanvas.getContext("2d");
    /* --------------------------
       ENGINE
    -------------------------- */

    const engine = Engine.create();

    engine.gravity.y = 1.5;

    const WIDTH = $(".hero").outerWidth();
    const HEIGHT = $(".hero").outerHeight();

    const render = Render.create({
      element: document.getElementById("world"),
      engine,
      options: {
        width: WIDTH,
        height: HEIGHT,
        wireframes: false,
        background: "#fff",
      },
    });

    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    /* --------------------------
       WALLS
    -------------------------- */

    const ground = Bodies.rectangle(WIDTH / 2, HEIGHT + 50, WIDTH, 100, {
      isStatic: true,
    });

    const leftWall = Bodies.rectangle(-50, HEIGHT / 2, 100, HEIGHT * 2, {
      isStatic: true,
    });

    const rightWall = Bodies.rectangle(
      WIDTH + 50,
      HEIGHT / 2,
      100,
      HEIGHT * 2,
      { isStatic: true },
    );

    Composite.add(engine.world, [ground, leftWall, rightWall]);

    /* --------------------------
       LETTER FACTORY
    -------------------------- */

    function createLetter({ char, size, x, color, portfolio = false }) {
      const body = Bodies.rectangle(x, -200, size, size, {
        restitution: 0.8,
        friction: 0.2,
        density: portfolio ? 0.7 : 0.02,
        render: {
          fillStyle: "transparent",
        },
      });

      body.letter = char;
      body.fontSize = size;
      body.color = color;
      body.opacity = portfolio ? 1 : 0.08;
      body.isPortfolio = portfolio;

      measureCtx.font = `900 ${size}px Arial`;

      body.textWidth = measureCtx.measureText(char).width;

      Composite.add(engine.world, body);

      return body;
    }

    /* --------------------------
       RANDOM LETTERS
    -------------------------- */

    const alphabet = "ㅍㅌㅍㄹㅇportfolioPORTFOLIO";

    let randomInterval;

    function startRandomLetters() {
      randomInterval = setInterval(() => {
        const char = alphabet[Math.floor(Math.random() * alphabet.length)];

        createLetter({
          char,
          size: 20 + Math.random() * 40,
          x: Math.random() * WIDTH,
          color: "rgba(0,0,0,.7)",
        });
      }, 50);
    }

    startRandomLetters();

    /* --------------------------
       PORTFOLIO
    -------------------------- */

    const word = "PORTFOLIO".split("");

    const portfolioBodies = [];

    const spawnGap = 100;

    const spawnStartX = WIDTH / 2 - ((word.length - 1) * spawnGap) / 2;

    function spawnPortfolio() {
      const size = gsap.utils.clamp(50, WIDTH * 0.08, 140);

      const gap = size * 0.7;

      const startX = WIDTH / 2 - ((word.length - 1) * gap) / 2;
      word.forEach((char, index) => {
        setTimeout(() => {
          const body = createLetter({
            char,
            size: size,
            x: startX + index * gap,
            color: "#333",
            portfolio: true,
          });

          Matter.Body.setAngle(body, Matter.Common.random(-0.5, 0.5));

          portfolioBodies.push(body);

          if (index === word.length - 1) {
            setTimeout(() => {
              finishIntro();
            }, 2500);
          }
        }, index * 100);
      });
    }

    setTimeout(() => {
      spawnPortfolio();
    }, 1000);

    /* --------------------------
       FINAL ALIGN
    -------------------------- */

    function finishIntro() {
      clearInterval(randomInterval);

      const randomBodies = [];

      Composite.allBodies(engine.world).forEach((body) => {
        if (body.letter && !body.isPortfolio) {
          randomBodies.push(body);
        }
      });

      randomBodies.forEach((body, index) => {
        gsap.to(body.position, {
          y: body.position.y - 80,
          duration: 1,
          delay: index * 0.01,
        });

        gsap.to(body, {
          opacity: 0,
          fontSize: 0,
          duration: 1,
          delay: index * 0.01,

          onComplete() {
            Composite.remove(engine.world, body);
          },
        });
      });

      alignPortfolio();
    }

    function alignPortfolio() {
      const letterGap = 0;

      let totalWidth = 0;

      portfolioBodies.forEach((body) => {
        totalWidth += body.textWidth;
      });

      totalWidth += (portfolioBodies.length - 1) * letterGap;
      const isMobile = WIDTH < 768;

      const size = isMobile
        ? gsap.utils.clamp(36, WIDTH * 0.09, 70)
        : gsap.utils.clamp(50, WIDTH * 0.08, 140);
      const startX = (WIDTH - totalWidth) / 2;

      const finalY = gsap.utils.clamp(200, HEIGHT * 0.5, 600);

      let currentX = startX;

      portfolioBodies.forEach((body) => {
        Body.setStatic(body, true);

        const targetX = currentX + body.textWidth / 2;

        currentX += body.textWidth + letterGap;

        gsap.to(body.position, {
          x: targetX,
          y: finalY,
          duration: 1.8,
          ease: "power4.inOut",

          onUpdate() {
            Body.setPosition(body, body.position);
          },
        });

        gsap.to(body, {
          angle: 0,
          duration: 1.8,
          ease: "power4.inOut",

          onUpdate() {
            Body.setAngle(body, body.angle);
          },
        });
      });

      gsap.to(".hero-copy", {
        opacity: 1,
        duration: 1,
        delay: 1,
      });

      //   gsap.to(".scroll-nav", {
      //     opacity: 1,
      //     duration: 1,
      //     delay: 1,
      //   });
    }

    /* --------------------------
       DRAW TEXT
    -------------------------- */

    Events.on(render, "afterRender", () => {
      const ctx = render.context;

      Composite.allBodies(engine.world).forEach((body) => {
        if (!body.letter) return;

        ctx.save();

        ctx.translate(body.position.x, body.position.y);

        ctx.rotate(body.angle);

        ctx.globalAlpha = body.opacity;

        ctx.fillStyle = body.color;

        ctx.font = `900 ${body.fontSize}px Pretendard`;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(body.letter, 0, 0);

        ctx.globalAlpha = 1;

        ctx.restore();
      });
    });
  }
});
