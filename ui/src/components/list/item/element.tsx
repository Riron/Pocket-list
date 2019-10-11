import { h } from "preact/";
import { useState } from "preact/hooks";

import * as style from "./element.css";
import { Volume2, Trash } from "preact-feather";

type Props = { value: string; isBlurred: boolean; customClass?: string };
export default function Element({ value, isBlurred, customClass }: Props) {
    const [forceUnblur, setForceUnblur] = useState(false);
    return (
        <div
            class={`${style.element} ${isBlurred &&
                !forceUnblur &&
                style.blur}`}
            onTouchStart={() => setForceUnblur(true)}
            onTouchEnd={() => setForceUnblur(false)}
        >
            {value}
        </div>
    );
}
