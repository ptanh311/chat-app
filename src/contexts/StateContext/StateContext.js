import React, { useReducer } from "react";

export const StateContext = React.createContext();

const INIT_STATE = {
    isSearching: false,
}

const StateContextProvider = ({ children }) => {
    const stateReducer = (state, action) => {
        switch (action.type) {
            case "TOGGLE_SEARCHING_STATE":
                return {
                    ...state,
                    isSearching: !state.isSearching
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(stateReducer, INIT_STATE);

    return (
        <StateContext.Provider value={{ data: state, dispatch }}>
            {children}
        </StateContext.Provider>
    )
}

export default StateContextProvider;