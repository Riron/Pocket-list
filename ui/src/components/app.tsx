import { h } from "preact";
import { setupStore } from "./store";
import { Provider } from "unistore/preact";

import Header from "./header";
import List from "./list";
import NewWord from "./new-word";

if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

export default function App() {
    return (
        <Provider store={setupStore()}>
            <div id="app">
                <Header />
                <List />
                <NewWord />
            </div>
        </Provider>
    );
}
