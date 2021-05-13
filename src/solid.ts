import {Document, entity, Entity, entitySet, EntitySet, field, Profile, useFetch} from "solidocity";
import {getSession, handleRedirect, login} from "solid-auth-fetcher";

const baseUrl = "https://todo.app"
const schema = {
    text: `${baseUrl}#text`,
    state: `${baseUrl}#state`,
    todo: `${baseUrl}#Todo`
};

@entity(schema.todo)
export class TodoEntity extends Entity {

    @field(schema.text, {type: "string"})
    public Text: string;
    @field(schema.state, {type: "string"})
    public State: string;

}

export class TodoDocument extends Document {

    @entitySet(TodoEntity, {isArray: true})
    public Todos: EntitySet<TodoEntity>;


    public async AddTodo(title: string): Promise<void> {
        const todoEntity = this.Todos.Add();
        todoEntity.Text = title;
        todoEntity.Save();
        this.Save();
    }

    public async SetState(id, state): Promise<void> {
        const todo = this.Todos.get(id);
        todo.State = state;
        todo.Save();
        this.Save();
    }

    public static async getDefaultUserDocument(): Promise<TodoDocument> {
        await handleRedirect(window.location.href);
        const session = await getSession();
        if (!session || !session.loggedIn) {
            await login({
                oidcIssuer: "https://solidcommunity.net",
                redirect: window.location.href
            });
            // redirects  to login page
            return;
        }
        useFetch(session.fetch);
        // const tokens = JSON.parse(localStorage.getItem('solidAuthFetcherUser:global'));
        // const idToken = decode(tokens.idToken);
        const webId = session.webId;

        const profile = new Profile(webId);
        await profile.Init()
        const myStorage = profile.Me.Storage;

        const doc: TodoDocument = new TodoDocument(`${myStorage}/private/todo.ttl`);
        await doc.Init();
        return doc;
    }

}
