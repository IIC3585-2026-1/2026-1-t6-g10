class MiSlider extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        .contenedor {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-family: Arial, sans-serif;
        }

        .valor {
          font-weight: bold;
          color: darkgreen;
        }
      </style>

      <div class="contenedor">
        <span class="valor"></span>
        <input type="range">
      </div>
    `;

    this.slider = shadow.querySelector("input");
    this.valorTexto = shadow.querySelector(".valor");
  }

  connectedCallback() {
    this.slider.min = this.getAttribute("min") || 0;
    this.slider.max = this.getAttribute("max") || 50;
    this.slider.step = this.getAttribute("step") || 1;
    this.slider.value = this.getAttribute("value") || 10;

    this.actualizarTexto();

    this.slider.addEventListener("input", () => {
      this.actualizarTexto();
    });
  }

  actualizarTexto() {
    this.valorTexto.textContent =
      `Radio máximo: ${this.slider.value} km`;
  }
}

customElements.define("mi-slider", MiSlider);