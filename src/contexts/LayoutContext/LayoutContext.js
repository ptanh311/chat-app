import React, { useReducer } from "react";

export const LayoutContext = React.createContext();

const INIT_STATE = {
    searchSidebar: true,
    infoSidebar: false
}

const LayoutContextProvider = ({ children }) => {
    const layoutReducer = (state, action) => {
        switch (action.type) {
            case "TOGGLE_USERINFO_SIDEBAR":
                return {
                    ...state,
                    infoSidebar: !action.payload.infoSidebar
                };
            case "TOGGLE_SEARCH_SIDEBAR":
                return {
                    ...state,
                    searchSidebar: !action.payload.searchSidebar
                }
            default:
                return state;

        }
    }

    const [state, dispatch] = useReducer(layoutReducer, INIT_STATE);

    return (
        <LayoutContext.Provider value={{ data: state, dispatch }}>
            {children}
        </LayoutContext.Provider>
    )
}

export default LayoutContextProvider;