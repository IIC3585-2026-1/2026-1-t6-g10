class MiBreadcrumb extends HTMLElement {
  connectedCallback() {
    this.style.display = "flex";
    this.style.alignItems = "center";
    this.style.gap = "4px";
    this.style.fontFamily = "var(--font-family, sans-serif)";
    this.style.fontSize = "0.9rem";

    const items = this.querySelectorAll("mi-breadcrumb-item");

    items.forEach((item, index) => {
      if (index < items.length - 1) {
        item.insertAdjacentHTML("afterend", ` <span style="color: var(--ink, #000); margin: 0 4px; font-weight: bold;">/</span> `);
      }
    });
  }
}

class MiBreadcrumbItem extends HTMLElement {
  connectedCallback() {
    const href = this.getAttribute("href");
    const texto = this.textContent;

    if (href) {
      this.innerHTML = `<a href="${href}" style="color: var(--fifa-red, #d71920); text-decoration: none; font-weight: 500;">${texto}</a>`;
    } else {
      this.innerHTML = `<strong style="color: var(--ink, #10223d); font-weight: 600;">${texto}</strong>`;
    }
  }
}

customElements.define("mi-breadcrumb", MiBreadcrumb);
customElements.define("mi-breadcrumb-item", MiBreadcrumbItem);