class MiHorizontalScroll extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        .contenedor {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding: 10px;
        }
      </style>

      <div class="contenedor">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define(
  "mi-horizontal-scroll",
  MiHorizontalScroll
);