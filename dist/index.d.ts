import * as React from "react";
import { InputMaskProps } from '@react-input/mask';
export type PhoneInputDefaultProps = Pick<InputMaskProps, "mask" | "showMask" | "track" | "inputMode" | "replacement">;
export declare const PhoneInputDefaultProps: PhoneInputDefaultProps;
export type PhoneInputProps = Omit<InputMaskProps, keyof PhoneInputDefaultProps>;
export declare const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps & React.RefAttributes<HTMLInputElement>>;
