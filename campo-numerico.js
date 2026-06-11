class CampoNumerico extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        .campo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: Arial, sans-serif;
        }

        input {
          width: 60px;
          padding: 6px;
          text-align: center;
        }

        button {
          width: 28px;
          height: 28px;
          cursor: pointer;
        }
      </style>

      <div class="campo">
        <label><slot>Número:</slot></label>
        <input type="number" min="0">
        <button id="menos">-</button>
        <button id="mas">+</button>
      </div>
    `;

    this.input = shadow.querySelector("input");
    this.botonMenos = shadow.querySelector("#menos");
    this.botonMas = shadow.querySelector("#mas");
  }

  connectedCallback() {
    this.input.value = this.getAttribute("value") || 0;

    this.botonMas.addEventListener("click", () => {
      this.input.value = Number(this.input.value) + 1;
    });

    this.botonMenos.addEventListener("click", () => {
      if (Number(this.input.value) > 0) {
        this.input.value = Number(this.input.value) - 1;
      }
    });
  }
}

customElements.define("campo-numerico", CampoNumerico);