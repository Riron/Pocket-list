import createStore from "stockroom/worker";
import { set, get } from "idb-keyval";

const WORDS_KEY = "words";

type AddAction = { eng: string; fr: string };
type Translation = { eng: string; fr: string };
type Store = {
    translations: Translation[];
};
let store = createStore({
    isLoading: true,
    translations: [],
    filter: ""
});

store.registerActions(store => ({
    delete: ({ translations }: Store, existingTrans: Translation) => {
        const newTranslations = translations.filter(
            t => t.eng !== existingTrans.eng && t.fr !== existingTrans.fr
        );
        saveWords(newTranslations);
        return {
            translations: newTranslations
        };
    },
    add: ({ translations }: Store, { eng, fr }: AddAction) => {
        const newTranslations = [...translations, { eng, fr }];
        saveWords(newTranslations);
        return {
            translations: newTranslations
        };
    },
    setFilter: (_: any, filter: string) => ({ filter })
}));

export default store;

// Retrieve words from DB on init
getWords().then(words =>
    store.setState({ isLoading: false, translations: words })
);

function saveWords(words: any) {
    return set(WORDS_KEY, JSON.stringify(words));
}

function getWords() {
    return get<string>(WORDS_KEY).then(words => {
        if (!words) {
            return [];
        }

        return JSON.parse(words);
    });
}
