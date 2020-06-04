import { LitElement, html } from 'lit-element'

export class CanvasLines extends LitElement {

  static get properties() {
    return {
      d: { type: Object },
      lienzo: { type: Object }
    }
  }

  constructor() {
    super()
    this.d = document.getElementById("dibujito")
    this.lienzo = this.d.getContext("2d")
    this.dibujarLinea("pink", 10, 300, 220, 10)
    this.dibujarLinea("yellow", 300, 10, 10, 220)
  }

  render() {
    return html`
    `
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