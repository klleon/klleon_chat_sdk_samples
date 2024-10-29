declare global {
    let KlleonChat: {
        init: (sdkOption: { sdk_key: string }) => Promise<void>;
        showStreaming: (options: {
            avatar_id: string;
            fit: string;
            enable_microphone: boolean;
        }) => void;
        showChatUi: () => void;
        close: () => void;
        echo: (message: string) => void;
        onChatEvent: (callback: (data: { id: string, message: string, chat_type: string }) => void) => void;
    };
}

export {};
