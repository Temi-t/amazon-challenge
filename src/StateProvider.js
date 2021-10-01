import React, { createContext, useContext, useReducer } from 'react';

//prepares the dataLayer
export const StateContext = createContext();

//Wrap app and provide the dataLayer
export const StateProvider= ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer ( reducer, initialState )}>
        {children}
    </StateContext.Provider>
);

//pull information from the dataLayer
export const useStateValue = () => useContext(StateContext);
