import { useContext } from "react"
import { Context } from "../../Store"

export const useStore = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider')
    }
    return context
}