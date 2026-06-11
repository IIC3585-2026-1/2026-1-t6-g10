class MiAccordion extends HTMLElement {
  connectedCallback() {
    this.style.display = "block";
    this.style.fontFamily = "Arial, sans-serif";
  }
}

class MiAccordionItem extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        .item {
          border: 1px solid #ccc;
          margin-bottom: 6px;
          border-radius: 6px;
          overflow: hidden;
        }

        .heading {
          background: #eeeeee;
          padding: 10px;
          cursor: pointer;
          font-weight: bold;
        }

        .contenido {
          display: none;
          padding: 10px;
          background: white;
        }

        .abierto {
          display: block;
        }
      </style>

      <div class="item">
        <div class="heading">
          <slot name="heading">País</slot>
        </div>

        <div class="contenido">
          <slot></slot>
        </div>
      </div>
    `;

    this.heading = shadow.querySelector(".heading");
    this.contenido = shadow.querySelector(".contenido");
  }

  connectedCallback() {
    this.heading.addEventListener("click", () => {
      this.contenido.classList.toggle("abierto");
    });
  }
}

customElements.define("mi-accordion", MiAccordion);
customElements.define("mi-accordion-item", MiAccordionItem);