"use client";

import React, {createContext, ReactNode, useCallback, useContext, useState} from 'react';

interface ChatContextType {
    isChatEventListenerAdded: boolean;
    setChatEventListenerAdded: (value: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({children}: { children: ReactNode }) => {
    const [isChatEventListenerAdded, setIsChatEventListenerAdded] = useState(false);

    const setChatEventListenerAdded = useCallback((value: boolean) => {
        setIsChatEventListenerAdded(value);
    }, []);

    return (
        <ChatContext.Provider value={{isChatEventListenerAdded, setChatEventListenerAdded}}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
};
