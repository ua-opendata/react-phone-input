import * as React from "react";
import {InputMask, InputMaskProps, Track, TrackingData, Replacement} from '@react-input/mask';

const track: Track = (trackingData: TrackingData) => {
    if (trackingData.inputType !== "insert") {
        return trackingData.data;
    }
    const changeValue = trackingData.data.replace(/\D/g, "");
    if (changeValue.startsWith('380')
        && (
            changeValue.length === 12
            || (trackingData.selectionStart < 3)
        )
    ) {
        return changeValue.substring(3);
    }
    if (changeValue.startsWith('0') && changeValue.length === 10 && trackingData.selectionStart < 3) {
        return changeValue.substring(1);
    }
    if ((changeValue === '3' || changeValue === '8' || changeValue == '0') && trackingData.selectionStart < 3) {
        return changeValue.substring(1);
    }
    return trackingData.data;
}
const mask: string = "+38 (0__) ___-__-__";
const replacement: Replacement = {
    "_": /\d/,
};

export type PhoneInputDefaultProps = Pick<InputMaskProps, "mask" | "showMask" | "track" | "inputMode" | "replacement">;
export const PhoneInputDefaultProps: PhoneInputDefaultProps = Object.freeze({
    mask, replacement, track,
    placeholder: mask,
    showMask: false,
    inputMode: "tel",
});

export type PhoneInputProps = Omit<InputMaskProps, keyof PhoneInputDefaultProps>;
export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>((props, ref) => {
    return (
        <InputMask {...props}{...PhoneInputDefaultProps} ref={ref}/>
    );
});
