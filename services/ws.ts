import { Client } from '@stomp/stompjs';
import type { IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient: Client | null = null;
let subscription: StompSubscription | null = null;

export function connectWebSocket(onMessageCallback: (value: number) => void): void {
    if (stompClient?.connected) {
        console.warn('WebSocket already connected.');
        return;
    }

    stompClient = new Client({
        webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
        reconnectDelay: 5000,
        debug: (str) => console.log('[STOMP]', str),
        onConnect: () => {
            console.log('[WebSocket] Connected');
            subscription = stompClient!.subscribe('/topic/passiveincome', (message: IMessage) => {
                const value = parseInt(message.body);
                if (!isNaN(value)) {
                    onMessageCallback(value);
                } else {
                    console.warn('Received non-numeric value:', message.body);
                }
            });
        },
        onStompError: (frame) => {
            console.error('[WebSocket] STOMP error:', frame.headers['message'], frame.body);
        },
        onWebSocketError: (event) => {
            console.error('[WebSocket] Connection error:', event);
        },
    });

    stompClient.activate();
}

export function disconnectWebSocket(): void {
    if (subscription) {
        subscription.unsubscribe();
        subscription = null;
    }

    if (stompClient) {
        stompClient.deactivate().then(() => {
            console.log('[WebSocket] Client deactivated');
            stompClient = null;
        });
    }
}
