import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("app-todo")
export class AppTodo extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        padding: 10px;
        border-radius: 10px;
        margin: 10px 20px;
        background-color: rebeccapurple;
        color: white;
        width: 240px;
        text-align: start;
        cursor: pointer;
      }
      .done::slotted(*) {
        text-decoration: line-through;
      }
      ::slotted(div) {
        font-size: 16px;
        opacity: 0.9;
      }
      ::slotted(span) {
        font-size: 26px;
      }
    `,
  ];

  constructor() {
    super();
    this.addEventListener("click", () => {
      this.dispatchEvent(new Event("SetDone"));
    });
  }

  @state() isDone: boolean = false;

  render() {
    return html`<slot class=${this.isDone ? "done" : ""}></slot>`;
  }
}
