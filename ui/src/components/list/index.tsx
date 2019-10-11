import { h, FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import VirtualList from "preact-virtual-list";
import { Hash } from "preact-feather";
import { connect } from "unistore/preact";

import * as style from "./style.css";
import Item from "./item";

export type Translation = { eng: string; fr: string };
type Props = {
    translations: Translation[];
    remove: (translation: Translation) => void;
};
function List({ translations, remove }: Props) {
    const [blur, setBlur] = useState({ eng: false, fr: false });

    return (
        <div class={style.list}>
            <div class={style.listHeaderContainer}>
                <div class={style.listHeader}>
                    <div
                        class={style.listHeaderItem}
                        onClick={() => setBlur({ ...blur, eng: !blur.eng })}
                    >
                        <span class={style.listHeaderItemText}>English</span>
                    </div>
                    <Hash />
                    <div
                        class={style.listHeaderItem}
                        onClick={() => setBlur({ ...blur, fr: !blur.fr })}
                    >
                        <span class={style.listHeaderItemText}>French</span>
                    </div>
                </div>
            </div>
            <VirtualList
                class={style.listContent}
                data={translations}
                renderRow={item => <Item {...{ item, blur, remove }} />}
                rowHeight={50}
                overscanCount={10}
            />
        </div>
    );
}

function filterTranslations(translations: Translation[], filter: string) {
    if (!translations) {
        return [];
    }

    return translations.filter(
        t => t.eng.indexOf(filter) > -1 || t.fr.indexOf(filter) > -1
    );
}
export default connect(
    (state: any) => {
        const filteredTranslations = filterTranslations(
            state.translations,
            state.filter
        );

        return { translations: filteredTranslations };
    },
    { remove: "delete" }
)(List as FunctionComponent);
