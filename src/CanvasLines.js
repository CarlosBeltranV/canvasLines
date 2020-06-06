import { LitElement, html } from 'lit-element'

export class CanvasLines extends LitElement {

  static get properties() {
    return {
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
      <canvas width="300" height="300" id="dibujito"></canvas>
      <p>Así quedan las líneas</p>
    `
  }

  async esperar() {
    let listo = false
    while(!listo) {
      listo = await this.updateComplete
    }
    this.crearLienzo()
  }

  crearLienzo() {
    let d = this.shadowRoot.getElementById("dibujito")
    this.lienzo = d.getContext("2d")
    let lineas = 30
    let l = 0
    let colorcito = "#FAA"
    while(l < lineas) {
      let yi = 10 * l
      let xf = 10 * (l + 1)
      this.dibujarLinea(colorcito, 0, yi, xf, 300)
      l++
    }
    this.dibujarLinea(colorcito, 1, 1, 1, 299)
    this.dibujarLinea(colorcito, 1, 299, 299, 299)
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