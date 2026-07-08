$(document).ready(function () {
  renderItem();
  filter();

  function filter() {
    const filter = $(".filter-item");
    const items = $(".works-item");

    filter.click(function () {
      let category = $(this).data("cate");

      console.log(category);
      filter.removeClass("active");
      $(this).addClass("active");

      if (category == "all") {
        items.fadeIn();
      } else {
        items.hide();
        $("." + category).fadeIn();
      }
    });
  }

  function renderItem() {
    let data = projects;
    const grid = $(".works-grid");
    console.log(data);

    let gridItem = "";

    data.forEach((item) => {
      gridItem += `
        <div class="works-item ${item.category}">
            <div class="works-img ">
              <img src="${item.thumb}" alt="" />
              <div class="works-overlay popup-btn" data-detail="${item.detail}">
                  <div class="works-btn popup-btn" data-detail="${item.detail}">
                    자세히 보기
                 </div>
                </div>
            </div>
            <div class="works-txt">
              <h5>${item.sub}</h5>
              <h4>${item.title}</h4>
              <p></p>
            </div>
        </div>
      `;
    });

    grid.append(gridItem);
  }
});
