import {TodoComponent} from "./todo.component";
import {TodoDocument} from "./solid";

customElements.define('todo-list', TodoComponent);

async function init(){
    const todoDocument = await TodoDocument.getDefaultUserDocument();

    const component = document.createElement('todo-list') as TodoComponent;
    document.body.appendChild(component);

    component.addEventListener('add', async (e: CustomEvent) => {
        await todoDocument.AddTodo(e.detail);
        await update();
    });

    component.addEventListener('statechange', async (e: CustomEvent<{id, state}>) => {
        await todoDocument.SetState(e.detail.id, e.detail.state);
        await update();
    });

    await update();

    async function update(){
        const todos = todoDocument.Todos.Items;
        component.render(todos);
    }
}

init();
