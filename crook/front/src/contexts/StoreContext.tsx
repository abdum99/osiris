import { React, createContext, useState } from 'react';

export const StoreContext = createContext({});

export const StoreContextProvider: React.FC = ({ children }) => {
    const [ cmdKOpen, setCmdKOpen ] = useState(false);

    const openCmdK = (open) => {
        setCmdKOpen(open)
    }

    return (
        <StoreContext.Provider
            value={{
                setCmdKOpen: openCmdK,
                cmdKOpen: cmdKOpen,
            }}
        >
            { children }
        </StoreContext.Provider>
    );
}
