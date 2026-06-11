class MiBreadcrumb extends HTMLElement {
  connectedCallback() {
    this.style.display = "block";
    this.style.fontFamily = "Arial, sans-serif";

    const items = this.querySelectorAll("mi-breadcrumb-item");

    items.forEach((item, index) => {
      if (index < items.length - 1) {
        item.insertAdjacentHTML("afterend", " <span>›</span> ");
      }
    });
  }
}

class MiBreadcrumbItem extends HTMLElement {
  connectedCallback() {
    const href = this.getAttribute("href");
    const texto = this.textContent;

    if (href) {
      this.innerHTML = `<a href="${href}">${texto}</a>`;
    } else {
      this.innerHTML = `<strong>${texto}</strong>`;
    }
  }
}

customElements.define("mi-breadcrumb", MiBreadcrumb);
customElements.define("mi-breadcrumb-item", MiBreadcrumbItem);