import * as React from "react";
import * as ReactDOM from 'react-dom/client';
import {PhoneInput} from "../src";
import {TestList} from "./test-list";
import {InputMask} from "@react-input/mask";

const App: React.FC<{}> = () => {
    const [input, setInput] = React.useState<HTMLInputElement | null>(null);
    return <div className="row">
        <form className="col-md-8" action="#" method="get">
            <h4 className="mb-3">Awesome Ukranian Phone Input</h4>
            <div className="form-group">
                <label htmlFor="phone-input"/>
                <PhoneInput
                    className="form-control"
                    id="phone-input"
                    name="phone"
                    autoComplete="on"
                    autoFocus
                    ref={(i: HTMLInputElement) => setInput(i)}
                />
            </div>
            <button type="submit" className="btn btn-outline-secondary">
                Submit
            </button>
        </form>
        <TestList input={input}/>
    </div>
}

const root = ReactDOM.createRoot(document.querySelector('#app') as any);
root.render(<App />);
