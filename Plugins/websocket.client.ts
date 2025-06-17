import { defineNuxtPlugin } from '#app'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { useClickUpdate } from '@/composables/useClickUpdate'

export default defineNuxtPlugin(() => {
    const { triggerUpdate } = useClickUpdate()

    const client = new Client({
        webSocketFactory: () => new SockJS('http://localhost:8080/ws-endpoint'),
        onConnect: () => {
            console.log('Connected to WebSocket')

            client.subscribe('/topic/updates', message => {
                const value = parseInt(message.body, 10)
                if (!isNaN(value)) {
                    console.log('Received update:', value)
                    triggerUpdate(value)  // 🔥 trigger the animation update here
                }
            })
        }
    })

    client.activate()

    return {
        provide: {
            websocket: client
        }
    }
})
