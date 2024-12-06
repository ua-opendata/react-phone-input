import * as React from "react";
import InputMask, { Props as InputMaskProps } from "react-input-mask";
export declare const beforeMaskedValueChange: InputMaskProps["beforeMaskedValueChange"];
export type PhoneInputDefaultProps = Pick<InputMaskProps, "mask" | "alwaysShowMask" | "beforeMaskedValueChange" | "inputMode">;
export declare const PhoneInputDefaultProps: PhoneInputDefaultProps;
export type PhoneInputProps = Omit<InputMaskProps, keyof PhoneInputDefaultProps>;
export declare const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps & React.RefAttributes<InputMask>>;
