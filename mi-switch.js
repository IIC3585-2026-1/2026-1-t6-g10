class MiSwitch extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        .switch {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: Arial, sans-serif;
        }

        button {
          width: 50px;
          height: 26px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          background: #ccc;
        }

        .activo {
          background: green;
          color: white;
        }
      </style>

      <div class="switch">
        <span><slot>Opción:</slot></span>
        <button>OFF</button>
      </div>
    `;

    this.boton = shadow.querySelector("button");
    this.activo = false;
  }

  connectedCallback() {
    this.boton.addEventListener("click", () => {
      this.activo = !this.activo;

      if (this.activo) {
        this.boton.textContent = "ON";
        this.boton.classList.add("activo");
      } else {
        this.boton.textContent = "OFF";
        this.boton.classList.remove("activo");
      }
    });
  }
}

customElements.define("mi-switch", MiSwitch);