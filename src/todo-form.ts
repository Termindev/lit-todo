import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { createRef, Ref, ref } from "lit/directives/ref.js";

@customElement("todo-form")
export class TodoForm extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];
  @state() inputName: Ref<HTMLInputElement> = createRef();
  @state() inputDesc: Ref<HTMLInputElement> = createRef();

  newTodo(e: SubmitEvent) {
    e.preventDefault();
    if (
      !this.inputName.value?.value.length ||
      !this.inputDesc.value?.value.length
    )
      return;

    localStorage.setItem("NewTodoName", this.inputName.value?.value);
    localStorage.setItem("NewTodoDesc", this.inputDesc.value?.value);
    this.dispatchEvent(new Event("NewTodo"));
    this.inputName.value.value = "";
    this.inputDesc.value.value = "";
  }
  render() {
    return html`
      <form @submit=${this.newTodo}>
        <label>
          <h3>Add Task:</h3>
          <input type="text" ${ref(this.inputName)} placeholder="task name" />
          <input
            type="text"
            ${ref(this.inputDesc)}
            placeholder="task description"
          />
        </label>
        <input type="submit" value="Add Task" />
      </form>
    `;
  }
}
