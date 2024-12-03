"use client";
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function AvatarPage1() {
    const {push} = useRouter();

    function showStreaming(avatarId: string) {
        KlleonChat.showStreaming({
            avatar_id: avatarId,
            fit: 'contain',
            enable_microphone: true,
        });
    }

    async function init() {
        const sdkKey = process.env.SDK_KEY!;
        await KlleonChat.init({
            sdk_key: sdkKey
        });
    }

    useEffect(() => {
        async function initializeApp() {
            await init();
            showStreaming('a5fe629d-0090-11ef-8ee1-0abbf354c5cc');
            KlleonChat.showChatUi();
            KlleonChat.onChatEvent((data) => {
                console.log(data);
            });
        }

        initializeApp();
    }, []);

    return (
        <div>
            <div id="klleon_chat" style={{width: '100vw', height: '100vh'}}></div>
            <div
                id="buttons-container"
                style={{
                    position: 'fixed',
                    bottom: '60px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
                <button onClick={init}>Init</button>
                <button onClick={() => showStreaming('a5fe629d-0090-11ef-8ee1-0abbf354c5cc')}>reStart1</button>
                <button onClick={() => showStreaming('35276726-4441-11ef-8ee1-0abbf354c5cc')}>reStart2</button>
                <button onClick={() => {
                    KlleonChat.close();
                    push('/');
                }}>Close
                </button>
                <button onClick={() => KlleonChat.echo('테스트')}>아바타 에코</button>
            </div>
        </div>
    );
}
