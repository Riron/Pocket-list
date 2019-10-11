import { h, FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { connect } from "unistore/preact";
import { Search } from "preact-feather";
import useDebounce from "./use-debounce";
import * as style from "./style.css";

type Props = { setFilter: (filter: string) => void };
export function Header({ setFilter }: Props) {
    const [clue, setClue] = useState("");
    const debouncedClue = useDebounce(clue, 250);

    useEffect(() => {
        setFilter(debouncedClue);
    }, [debouncedClue]);

    return (
        <header class={style.header}>
            <div class={style.search}>
                <div class={style.searchIcon}>
                    <Search />
                </div>
                <input
                    type="search"
                    class={style.searchInput}
                    onInput={(e: any) => setClue(e.target.value)}
                />
            </div>
        </header>
    );
}

export default connect(
    "",
    { setFilter: "setFilter" }
)(Header as FunctionComponent);
