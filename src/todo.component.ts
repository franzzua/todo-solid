import {TodoEntity} from "./solid";

export class TodoComponent extends HTMLElement {

    connectedCallback() {
        this.style.display = 'flex';
        this.style.flexFlow = 'column nowrap';
        this.style.fontSize = '1.2em';
        this.render([]);

        this.addEventListener('keyup', (e: KeyboardEvent) => {
            if (e.key == "Enter" &&
                e.target instanceof HTMLInputElement &&
                e.target.type =="text" ){
                this.dispatchEvent(new CustomEvent('add', {
                    detail: (e.target as HTMLInputElement).value
                }));
            }
        });
        this.addEventListener('change', (e: InputEvent) => {
            if (e.target instanceof HTMLInputElement &&
                e.target.type == "checkbox")
                this.dispatchEvent(new CustomEvent('statechange', {
                    detail: {
                        id: e.target.id,
                        state: e.target.checked ? 'checked' : 'unchecked'
                    }
                }));
        });
    }

    init(todos: TodoEntity[]) {
        this.render(todos);
    }

    render(todos: readonly TodoEntity[]) {
        this.innerHTML = `
            <input autofocus type="text" placeholder="Add new" style="font-size: 1.4em">
            ${todos.map((t,i) => `
            <div>
                <input id=${t.Id} type="checkbox" ${t.State}>
                <span>${t.Text}</span>
            </div>
            `).join('\n')}
        `;
    }
}
