document.addEventListener("DOMContentLoaded", () => {
  const accToggles = document.querySelectorAll(".accordion-toggle");

  accToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const content = this.nextElementSibling;
      content.style.display =
        content.style.display === "table-row" ? "none" : "table-row";
    });
  });
});
