# React Phone Input
For ukranian phone formats.

[Demo](https://ua-opendata.github.io/react-phone-input/)

## Installation
```bash
npm i @ua-opendata/react-phone-input@^2.0
```

## Usage
See [demo application sources](./example/index.tsx) for code examples.
 
```typescript jsx
import * as React from "react";
import { PhoneInput } from "@ua-opendata/react-phone-input";

const App = () => {
    const [value, setValue] = React.useState("");
    const handleChange = React.useCallback((e) => setValue(e.target.value));
    
    return <PhoneInput value={value} onChange={handleChange} />;
}
```
