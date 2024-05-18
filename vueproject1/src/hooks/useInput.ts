import { ref } from "vue"

export const useInput = () => {
    const state = ref<{name: string}>({
        name: ''
    })

    const onInput = (e: Event) => {
        state.value.name = (e.target as HTMLInputElement).value
    }
    return { state, onInput }
}