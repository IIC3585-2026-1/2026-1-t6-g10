class MiSlider extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        .contenedor {
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-family: var(--font-family, sans-serif);
        }

        .valor {
          font-weight: 600;
          color: var(--fifa-blue, #0033a0);
          font-size: 1.05rem;
        }

        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          background: transparent;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--fifa-red, #d71920);
          cursor: pointer;
          margin-top: -6px;
          box-shadow: 0 2px 6px rgba(215, 25, 32, 0.4);
          border: 2px solid white;
          transition: transform 0.1s;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }

        input[type="range"]::-webkit-slider-runnable-track {
          width: 100%;
          height: 8px;
          cursor: pointer;
          background: var(--line, #e2e8f0);
          border-radius: 4px;
        }

        input[type="range"]:focus {
          outline: none;
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