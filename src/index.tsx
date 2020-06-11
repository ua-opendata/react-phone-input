import * as React from "react";
import InputMask, {InputState, Props as InputMaskProps} from "react-input-mask";

export const beforeMaskedValueChange: InputMaskProps["beforeMaskedValueChange"] = (
    nextState, prevState, userInput, maskOptions,
): InputState => {
    if (userInput) {
        const match = userInput.replace(/\D/g, '').match(/^(?:38)?0(\d{1,9})/);
        if (match && "string" === typeof maskOptions.mask) {
            const userNumbers = match[1].split('');
            return {
                ...nextState,
                value: maskOptions.mask.replace(/9/g, (s) => {
                    const userNumber = userNumbers.shift();
                    return (userNumber === undefined) ? s : userNumber;
                }),
            };
        }
    }

    if (nextState.value.match(/^\+38 \(038\)/)) {
        return {
            value: '',
            selection: {start: 7, end: 7,}
        };
    }
    if (nextState.value.match(/^\+38 \(00[1-9]\)/)) {
        const value = nextState.value.replace(/^\+38 \(00([1-9])\)/, '+38 (0$1)');
        return {
            value,
            selection: {start: 7, end: 7,}
        };
    }
    return nextState;
}

export type PhoneInputDefaultProps = Pick<InputMaskProps, "mask" | "alwaysShowMask" | "beforeMaskedValueChange" | "inputMode">;
export const PhoneInputDefaultProps: PhoneInputDefaultProps = Object.freeze({
    beforeMaskedValueChange,
    mask: "+38 (099) 999-99-99",
    alwaysShowMask: false,
    inputMode: "tel",
});

export type PhoneInputProps = Omit<InputMaskProps, keyof PhoneInputDefaultProps>;
export const PhoneInput = React.forwardRef<InputMask, PhoneInputProps>((props, ref) => {
    return (
        <InputMask maskChar={null} {...props}{...PhoneInputDefaultProps}/>
    );
});
