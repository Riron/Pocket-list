import { h } from "preact/";
import { useState, useRef, useEffect } from "preact/hooks";
import { Volume2, Trash } from "preact-feather";

import { Translation } from "..";
import Element from "./element";
import { speak, isSpeechSynthesisSupported } from "./speaker";

import * as style from "./style.css";

const THRESHOLD = 100;

type Props = {
    remove: (translation: Translation) => void;
    item: Translation;
    blur: { eng: boolean; fr: boolean };
};
export default function Item({ item, blur, remove }: Props) {
    // We dont want to render the actions while the user hasn't start swiping
    const [displayActions, setDisplayActions] = useState(false);

    const domListItem = useRef<any>(null);
    const [startCoordinate, setStartCoordinate] = useState({ x: 0, y: 0 });
    const [xDiff, setXDiff] = useState(0);
    const [initalXDiff, setInitalXDiff] = useState(0);

    useEffect(() => {
        requestAnimationFrame(updatePosition);
    }, [xDiff]);

    function updatePosition() {
        if (xDiff > 0) {
            return;
        }
        domListItem.current.style.transform = `translateX(${xDiff}px)`;
    }

    function onTouchStart(evt: TouchEvent) {
        domListItem.current.classList.remove(style.itemBouncing);
        const x = evt.targetTouches[0].clientX;
        const y = evt.targetTouches[0].clientY;

        setInitalXDiff(xDiff);
        setStartCoordinate({ x, y });
    }
    function onTouchMove(evt: TouchEvent) {
        if (!displayActions) {
            setDisplayActions(true);
        }

        const xUp = evt.targetTouches[0].clientX;
        const yUp = evt.targetTouches[0].clientY;

        const xDiff = xUp - startCoordinate.x;
        const yDiff = yUp - startCoordinate.y;

        // Filter out up/down swipes
        if (Math.abs(xDiff) < Math.abs(yDiff)) {
            return;
        }
        setXDiff(xDiff + initalXDiff);
    }
    function onTouchEnd() {
        domListItem.current.classList.add(style.itemBouncing);
        if (xDiff < -THRESHOLD) {
            setXDiff(-THRESHOLD);
            return;
        }
        setXDiff(0);
    }

    return (
        <div class={style.container}>
            {displayActions && (
                <div class={style.actions}>
                    {isSpeechSynthesisSupported() && (
                        <span
                            class={style.actionsIcon}
                            onClick={() => speak(item.eng)}
                        >
                            <Volume2 />
                        </span>
                    )}
                    <span
                        class={style.actionsIcon}
                        onClick={() => remove(item)}
                    >
                        <Trash />
                    </span>
                </div>
            )}
            <div
                class={style.item}
                ref={domListItem}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <Element value={item.eng} isBlurred={blur.eng} />
                <Element value={item.fr} isBlurred={blur.fr} />
            </div>
        </div>
    );
}
