import { useContext } from "react"
import { Context } from "../../contexts/store"

export const useStore = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useStore  must be used within a StoreProvider')
    }
    return context
}