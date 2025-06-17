import { ref, onUnmounted } from 'vue';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export function usePassiveIncomeSocket(onMessage: (value: number) => void) {
    const stompClient = ref<Client | null>(null);

    function connect() {
        const socket = new SockJS('http://localhost:8080/ws-endpoint');
        const client = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str),
            reconnectDelay: 5000,
        });

        client.onConnect = () => {
            console.log('WebSocket connected');
            client.subscribe('/topic/passiveincome', (message) => {
                if (message.body) {
                    const count = parseInt(message.body, 10);
                    onMessage(count);
                }
            });
        };

        client.activate();
        stompClient.value = client;
    }

    function disconnect() {
        stompClient.value?.deactivate();
    }

    onUnmounted(() => {
        disconnect();
    });

    connect();

    return {
        disconnect,
    };
}
