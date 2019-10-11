import { shallow, mount } from "enzyme";
import { act } from "preact/test-utils";

import { h } from "preact";

import { Add } from "../components/new-word/add";

import * as Comlink from "comlink";
jest.mock("comlink");

const flushPromises = () => new Promise(setImmediate);

describe("Add", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    test("should call translation API when `HelpCircle` link is clicked", async () => {
        const wrapper = shallow(<Add add={() => null} /> as any);

        const input = wrapper.find("input").first();
        const onInput: any = input.props().onInput;

        act(() => {
            onInput({ target: { value: "<to translate>" } } as any);
        });

        const mockTranslate = jest.fn();
        (Comlink.wrap as jest.Mock).mockImplementation(() => mockTranslate);

        const linkOnClick: any = wrapper.find("a").props().onClick;
        linkOnClick();

        await flushPromises();

        expect(mockTranslate).toHaveBeenCalled();
    });

    test("should not call translation API if eng word is null", async () => {
        const wrapper = shallow(<Add add={() => null} /> as any);

        const mockTranslate = jest.fn();
        (Comlink.wrap as jest.Mock).mockImplementation(() => mockTranslate);

        const linkOnClick: any = wrapper.find("a").props().onClick;
        linkOnClick();

        await flushPromises();

        expect(mockTranslate).not.toHaveBeenCalled();
    });

    test("should fill french word input", async () => {
        const wrapper = shallow(<Add add={() => null} /> as any);

        const input = wrapper.find("input").first();
        const onInput: any = input.props().onInput;

        act(() => {
            onInput({ target: { value: "<to translate>" } } as any);
        });

        const translation = "<translated>";
        const mockTranslate = (_: any, cb: Function) => {
            cb(translation);
            return Promise.resolve();
        };
        (Comlink.wrap as jest.Mock).mockImplementation(() => mockTranslate);
        (Comlink.proxy as jest.Mock).mockImplementationOnce(cb => cb);

        const linkOnClick: any = wrapper.find("a").props().onClick;
        linkOnClick();

        await flushPromises();

        const frenchWordInput = wrapper
            .find("input")
            .at(1)
            .props().value;

        expect(frenchWordInput).toBe(translation);
    });

    test("should call `add` when button is clicked and inputs are filled", () => {
        const add = jest.fn();
        const wrapper = shallow(<Add {...{ add }} /> as any);

        const engInput = wrapper.find("input").first();
        const engOnInput: any = engInput.props().onInput;
        act(() => {
            engOnInput({ target: { value: "<a word>" } } as any);
        });

        const frInput = wrapper.find("input").at(1);
        const frOnInput: any = frInput.props().onInput;
        act(() => {
            frOnInput({ target: { value: "<un mot>" } } as any);
        });

        act(() => {
            wrapper.find("button").simulate("click");
        });

        expect(add).toHaveBeenCalled();
    });

    test("should restore inputs to an empty string after add", () => {
        const add = jest.fn();
        const wrapper = shallow(<Add {...{ add }} /> as any);

        const engInput = wrapper.find("input").first();
        const engOnInput: any = engInput.props().onInput;
        act(() => {
            engOnInput({ target: { value: "<a word>" } } as any);
        });

        const frInput = wrapper.find("input").at(1);
        const frOnInput: any = frInput.props().onInput;
        act(() => {
            frOnInput({ target: { value: "<un mot>" } } as any);
        });

        wrapper.update();
        expect(
            wrapper
                .find("input")
                .at(0)
                .props().value
        ).toBe("<a word>");
        expect(
            wrapper
                .find("input")
                .at(1)
                .props().value
        ).toBe("<un mot>");

        act(() => {
            wrapper.find("button").simulate("click");
        });

        wrapper.update();
        expect(
            wrapper
                .find("input")
                .at(0)
                .props().value
        ).toBe("");
        expect(
            wrapper
                .find("input")
                .at(1)
                .props().value
        ).toBe("");
    });
});
