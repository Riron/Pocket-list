import { shallow } from "enzyme";
import { act } from "preact/test-utils";

import { h } from "preact";

import { Header } from "../components/header";

describe("Header", () => {
    test("should wrap content in a header tag", () => {
        const context = shallow(<Header setFilter={() => null} /> as any);

        const header = context.find("header");
        expect(header.length).toBe(1);
    });

    test("should call setFilter on load", () => {
        const setFilter = jest.fn();
        shallow(<Header {...{ setFilter }} /> as any);

        expect(setFilter).toHaveBeenCalledWith("");
    });

    test("should call setFilter after input", () => {
        const setFilter = jest.fn();
        const context = shallow(<Header {...{ setFilter }} /> as any);

        const clue = "a search";

        const input = context.find("input").first();
        const onInput: any = input.props().onInput;
        jest.useFakeTimers();

        act(() => {
            onInput({ target: { value: clue } } as any);
        });

        act(() => {
            jest.runAllTimers();
        });
        jest.useRealTimers();

        expect(setFilter).toHaveBeenCalledTimes(2);
        expect(setFilter).toHaveBeenCalledWith("");
        expect(setFilter).toHaveBeenCalledWith(clue);
    });
});
