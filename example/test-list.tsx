import * as React from "react";
import * as helper from "dom-event-simulate";

class TestCase {
    constructor(
        public readonly actual: string,
        public readonly expected: string,
        public readonly state?: boolean,
    ) {
    }

    public run(input: HTMLInputElement): Promise<TestCase> {
        const h = ('helper' in helper) ? (helper as any).helper : (helper as any).default.helper;
        h.formInput(input, this.actual);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(new TestCase(this.actual, this.expected, (input.value === this.expected)));
            }, 500);
        });
    }
}

const TestCaseCollection: Array<TestCase> = [
    new TestCase("89 124- 1    14-1", "+38 (089) 124-11-41"),
    new TestCase("089 12-41 14-1", "+38 (089) 124-11-41"),
    new TestCase("380 89 1241 141", "+38 (089) 124-11-41"),
    new TestCase("+38089124  11 41", "+38 (089) 124-11-41"),
    new TestCase("+ 380 89 124 - 11-    41", "+38 (089) 124-11-41"),
];

export const TestCaseElement: React.FC<{ value: TestCase }> = ({value}) => {
    const textClassName = (value.state === undefined) ? "text-muted" : (value.state ? "text-success" : "text-danger");
    return (
        <li className={`list-group-item d-flex justify-content-between`}>
            <div className={textClassName}>
                <h6 className="my-0">{value.actual}</h6>
                <small>{value.expected}</small>
            </div>
            {(value.state !== undefined) && (
                <span className={textClassName}>
                    {value.state ? "OK" : "FAIL"}
            </span>)}
        </li>
    );
};

export const TestList: React.FC<{ input: HTMLInputElement }> = ({input}) => {
    const [tests, setTests] = React.useState<TestCase[]>(TestCaseCollection);
    const handleTest = async () => {
        for(let k in tests) {
            const test = await tests[k].run(input);
            setTests((prevState) => {
                const nextTests = [...prevState];
                nextTests[k] = test;
                return nextTests;
            });
        }
    };
    return (
        <div className="col-md-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Test Cases</span>
                <button type="button" className="btn btn-outline-info btn-sm float-right" onClick={handleTest}>
                    Run
                </button>
            </h4>
            <ul className="list-group mb-3">
                {tests.map((test, i) => <TestCaseElement value={test} key={i} />)}
            </ul>
        </div>
    );
};
