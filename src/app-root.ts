import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { nanoid } from "nanoid";

@customElement("app-root")
export class AppRoot extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];
  connectedCallback() {
    super.connectedCallback();
    const tasks = localStorage.getItem("Tasks");
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  @state() tasks = [
    {
      title: "Task Title",
      desc: "Task description",
      isDone: false,
      id: nanoid(),
    },
  ];

  Done(id: string) {
    this.tasks = this.tasks.map((task) => {
      return task.id === id ? { ...task, isDone: !task.isDone } : task;
    });
  }
  addTodo() {
    const todoName = localStorage.getItem("NewTodoName");
    const todoDesc = localStorage.getItem("NewTodoDesc");
    this.tasks = [
      ...this.tasks,
      {
        title: todoName || "",
        desc: todoDesc || "",
        isDone: false,
        id: nanoid(),
      },
    ];
    localStorage.setItem("Tasks", JSON.stringify(this.tasks));
  }

  Delete(id: string) {
    const res = confirm("Are you sure?");
    if (!res) {
      this.Done(id); // Done os called when the button is clicked so I call it again to reset state
      return;
    }
    this.tasks = this.tasks.filter((task) => {
      return task.id !== id;
    });
    localStorage.setItem("Tasks", JSON.stringify(this.tasks));
  }
  render() {
    return html`
      ${map(this.tasks, (task) => {
        return html`<app-todo
          @SetDone=${() => this.Done(task.id)}
          @Delete=${() => this.Delete(task.id)}
          .isDone=${task.isDone}
        >
          <span>${task.title}</span>
          <div>${task.desc}</div>
          <button @click=${() => this.Delete(task.id)}>Delete</button>
        </app-todo> `;
      })}
      <todo-form @NewTodo=${this.addTodo}></todo-form>
    `;
  }
}
