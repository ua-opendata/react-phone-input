import * as React from 'react';
import { InputMask } from '@react-input/mask';

const track = (trackingData) => {
    if (trackingData.inputType !== "insert") {
        return trackingData.data;
    }
    const changeValue = trackingData.data.replace(/\D/g, "");
    if (changeValue.startsWith('380')
        && (changeValue.length === 12
            || (trackingData.selectionStart < 3))) {
        return changeValue.substring(3);
    }
    if (changeValue.startsWith('0') && changeValue.length === 10 && trackingData.selectionStart < 3) {
        return changeValue.substring(1);
    }
    return trackingData.data;
};
const mask = "+38 (0__) ___-__-__";
const replacement = {
    "_": /\d/,
};
const PhoneInputDefaultProps = Object.freeze({
    mask, replacement, track,
    showMask: false,
    inputMode: "tel",
});
const PhoneInput = React.forwardRef((props, ref) => {
    return (React.createElement(InputMask, Object.assign({}, props, PhoneInputDefaultProps, { ref: ref })));
});

export { PhoneInput, PhoneInputDefaultProps };
