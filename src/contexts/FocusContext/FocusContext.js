import React, { useState } from "react";

export const FocusContext = React.createContext();

const FocusContextProvider = ({ children }) => {
    const [focus, setFocus] = useState(1);

    return (
        <FocusContext.Provider value={{ focus, setFocus }}>
            {children}
        </FocusContext.Provider>
    )
}

export default FocusContextProvider;