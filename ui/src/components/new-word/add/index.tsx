import { h, FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { connect } from "unistore/preact";
import { HelpCircle } from "preact-feather";

import * as Comlink from "comlink";

import * as style from "./style.css";

const NULL_WORD = { eng: "", fr: "" };
type Props = { add: (word: any) => void };

export function Add({ add }: Props) {
    const [word, setWord] = useState(NULL_WORD);

    function addWord() {
        if (!word.eng || !word.fr) {
            return;
        }

        add(word);
        setWord(NULL_WORD);
    }

    function callback(translatedText: string) {
        setWord({ ...word, fr: translatedText });
    }
    async function apiTranslate() {
        if (!word.eng) {
            return;
        }

        const remoteTranslate: any = Comlink.wrap<any>(
            require("worker-loader!./firebase.worker")()
        );
        await remoteTranslate(word.eng, Comlink.proxy(callback));
    }

    return (
        <div>
            <div class={style.form}>
                <div class={style.formInput}>
                    <input
                        type="text"
                        placeholder="Type here..."
                        value={word.eng}
                        onInput={(e: any) =>
                            setWord({ ...word, eng: e.target.value })
                        }
                    />
                </div>
                <a onClick={() => apiTranslate()}>
                    <HelpCircle />
                </a>
                <div class={style.formInput}>
                    <input
                        type="text"
                        placeholder="Ecrire ici..."
                        value={word.fr}
                        onInput={(e: any) =>
                            setWord({ ...word, fr: e.target.value })
                        }
                    />
                </div>
            </div>
            <div>
                <button class={style.button} onClick={() => addWord()}>
                    Add word
                </button>
            </div>
        </div>
    );
}

export default connect(
    "",
    { add: "add" }
)(Add as FunctionalComponent);
