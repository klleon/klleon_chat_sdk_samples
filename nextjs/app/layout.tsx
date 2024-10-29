import {ReactNode} from 'react';
import {ChatProvider} from "@/app/providers/chat_context";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>Klleon Chat SDK</title>
            <script src="https://sdk.klleon.io/klleon-chat/0.11.0/klleon_chat_sdk.js" async/>
        </head>
        <body style={{margin: 0}}>
        <ChatProvider>
            {children}
        </ChatProvider>
        </body>
        </html>
    );
}
