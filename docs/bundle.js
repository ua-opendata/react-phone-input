import * as React from 'https://esm.sh/react@18/?dev';
import * as ReactDOM from 'https://esm.sh/react-dom@18/client?dev';
import InputMask from 'https://esm.sh/react-input-mask@2?dev';
import * as helper from 'https://esm.sh/dom-event-simulate@1.2.1?dev';

const beforeMaskedValueChange = (nextState, prevState, userInput, maskOptions) => {
    if (userInput) {
        const match = userInput.replace(/\D/g, '').match(/^(?:38)?0(\d{1,9})/);
        if (match && "string" === typeof maskOptions.mask) {
            const userNumbers = match[1].split('');
            return Object.assign(Object.assign({}, nextState), { value: maskOptions.mask.replace(/9/g, (s) => {
                    const userNumber = userNumbers.shift();
                    return (userNumber === undefined) ? s : userNumber;
                }) });
        }
    }
    if (nextState.value.match(/^\+38 \(038\)/)) {
        return {
            value: '',
            selection: { start: 7, end: 7, }
        };
    }
    if (nextState.value.match(/^\+38 \(00[1-9]\)/)) {
        const value = nextState.value.replace(/^\+38 \(00([1-9])\)/, '+38 (0$1)');
        return {
            value,
            selection: { start: 7, end: 7, }
        };
    }
    return nextState;
};
const PhoneInputDefaultProps = Object.freeze({
    beforeMaskedValueChange,
    mask: "+38 (099) 999-99-99",
    alwaysShowMask: false,
    inputMode: "tel",
});
const PhoneInput = React.forwardRef((props, ref) => {
    return (React.createElement(InputMask, Object.assign({ maskChar: null }, props, PhoneInputDefaultProps)));
});

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, [])).next());
    });
}

class TestCase {
    constructor(actual, expected, state) {
        this.actual = actual;
        this.expected = expected;
        this.state = state;
    }
    run(input) {
        const h = ('helper' in helper) ? helper.helper : helper.default.helper;
        h.formInput(input, this.actual);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(new TestCase(this.actual, this.expected, (input.value === this.expected)));
            }, 500);
        });
    }
}
const TestCaseCollection = [
    new TestCase("89 124- 1    14-1", "+38 (089) 124-11-41"),
    new TestCase("089 12-41 14-1", "+38 (089) 124-11-41"),
    new TestCase("380 89 1241 141", "+38 (089) 124-11-41"),
    new TestCase("+38089124  11 41", "+38 (089) 124-11-41"),
    new TestCase("+ 380 89 124 - 11-    41", "+38 (089) 124-11-41"),
];
const TestCaseElement = ({ value }) => {
    const textClassName = (value.state === undefined) ? "text-muted" : (value.state ? "text-success" : "text-danger");
    return (React.createElement("li", { className: `list-group-item d-flex justify-content-between` },
        React.createElement("div", { className: textClassName },
            React.createElement("h6", { className: "my-0" }, value.actual),
            React.createElement("small", null, value.expected)),
        (value.state !== undefined) && (React.createElement("span", { className: textClassName }, value.state ? "OK" : "FAIL"))));
};
const TestList = ({ input }) => {
    const [tests, setTests] = React.useState(TestCaseCollection);
    const handleTest = () => __awaiter(void 0, void 0, void 0, function* () {
        for (let k in tests) {
            const test = yield tests[k].run(input);
            setTests((prevState) => {
                const nextTests = [...prevState];
                nextTests[k] = test;
                return nextTests;
            });
        }
    });
    return (React.createElement("div", { className: "col-md-4" },
        React.createElement("h4", { className: "d-flex justify-content-between align-items-center mb-3" },
            React.createElement("span", { className: "text-muted" }, "Test Cases"),
            React.createElement("button", { type: "button", className: "btn btn-outline-info btn-sm float-right", onClick: handleTest }, "Run")),
        React.createElement("ul", { className: "list-group mb-3" }, tests.map((test, i) => React.createElement(TestCaseElement, { value: test, key: i })))));
};

const App = () => {
    const [input, setInput] = React.useState(null);
    return React.createElement("div", { className: "row" },
        React.createElement("form", { className: "col-md-8", action: "#", method: "get" },
            React.createElement("h4", { className: "mb-3" }, "Awesome Ukranian Phone Input"),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "phone-input" }),
                React.createElement(PhoneInput, { className: "form-control", id: "phone-input", name: "phone", autoComplete: "on", autoFocus: true, inputRef: setInput })),
            React.createElement("button", { type: "submit", className: "btn btn-outline-secondary" }, "Submit")),
        input && React.createElement(TestList, { input: input }));
};
const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(React.createElement(App, null));
