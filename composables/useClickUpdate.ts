import { ref } from 'vue'

type UpdateHandler = (value: number) => void

const clickUpdateHandler = ref<UpdateHandler | null>(null)

export function useClickUpdate() {
    return {
        setUpdateHandler: (handler: UpdateHandler) => {
            clickUpdateHandler.value = handler
        },
        triggerUpdate: (value: number) => {
            clickUpdateHandler.value?.(value)
        }
    }
}