import { LitElement, html } from 'https://unpkg.com/lit-element?module'

export class CanvasLines extends LitElement {

  static get properties() {
    return {
      nLineas: { type: Number},
      lienzo: { type: Object }
    }
  }

  constructor() {
    super()
    this.esperar()
  }

  render() {
    return html`
      <h2>Líneas en Canvas</h2>
      <p>
        <label for="nLineas">¿Cuántas líneas quieres?</label>
        <input type="number" name="nLineas" id="numeroLineas" value="30" min="10" max="50" />
        <button @click="${this.preguntarLineas}">A darle!</button>
      </p>
      <canvas width="300" height="300" id="dibujito"></canvas>
      <p>Así quedan las líneas</p>
    `
  }

  async esperar() {
    let listo = false
    while(!listo) {
      listo = await this.updateComplete
    }
  }

  async preguntarLineas(e) {
    this.nLineas = parseInt(this.shadowRoot.querySelector("#numeroLineas").value)
    this.crearLienzo()
  }

  crearLienzo() {
    let d = this.shadowRoot.getElementById("dibujito")
    let ancho = d.width
    this.lienzo = d.getContext("2d")
    this.lienzo.clearRect(0, 0, d.width, d.height);
    let lineas = this.nLineas
    let l = 0
    let colorcito = "#FAA"
    let espacio = ancho / lineas;
    while(l < lineas) {
      let yi = espacio * l
      let xf = espacio * (l + 1)
      this.dibujarLinea(colorcito, 0, yi, xf, 300)
      this.dibujarLinea(colorcito, yi, 0, 300, xf)
      l++
    }
    this.dibujarLinea(colorcito, 1, 1, 1, 299)
    this.dibujarLinea(colorcito, 1, 299, 299, 299)
    this.dibujarLinea("black", 1, 1, 299, 299)
    this.dibujarLinea(colorcito, 299, 1, 299, 299)
    this.dibujarLinea(colorcito, 1, 1, 299, 1)
  }

  dibujarLinea(color, xinicial, yinicial, xfinal, yfinal) {
    this.lienzo.beginPath();
    this.lienzo.strokeStyle = color;
    this.lienzo.moveTo(xinicial, yinicial);
    this.lienzo.lineTo(xfinal, yfinal);
    this.lienzo.stroke();
    this.lienzo.closePath();
  }

}