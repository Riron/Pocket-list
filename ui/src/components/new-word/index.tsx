import { h } from "preact";
import { useState } from "preact/hooks";
import { ChevronsUp } from "preact-feather";

import Add from "./add";

import * as style from "./style.css";

export default function NewWord() {
    const [isOpened, setIsOpened] = useState(false);
    return (
        <div
            class={[style.newWord, ...(isOpened ? [style.opened] : [])].join(
                " "
            )}
        >
            <div class={style.header} onClick={() => setIsOpened(!isOpened)}>
                <ChevronsUp />
            </div>
            <Add />
        </div>
    );
}
