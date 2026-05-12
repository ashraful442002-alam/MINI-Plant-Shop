
document.addEventListener("ContentLoad", () => {

  const items = document.querySelectorAll(".nav-item");
  const pages = document.querySelectorAll(".page");

  // default = Home active
  items[0].classList.add("active-menu");

  items.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      const target = item.getAttribute("href").replace("#", "");

      // remove active from all
      items.forEach(i => i.classList.remove("active-menu"));
      item.classList.add("active-menu");

      // hide all pages
      pages.forEach(p => p.classList.add("hidden"));

      // show selected page
      document.getElementById(target).classList.remove("hidden");
    });
  });

});
