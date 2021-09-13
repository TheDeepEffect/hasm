import { useMutation } from "@apollo/client"
import { logout } from "../../generated/logout"
import { LOG_OUT } from "../resolvers/mutations"
import { useAuth } from "./useAuth"


type IUseLogoutProps = {
    onCompleted?: () => void
}
export const useLogout = (props: IUseLogoutProps = {}) => {
    const { onCompleted = () => { } } = props;
    const { setCurrentUser } = useAuth()
    const [logout, { loading, error, data }] = useMutation<logout>(LOG_OUT,
        {
            onCompleted: (data: logout) => {
                setCurrentUser({
                    expiresAt: "",
                    user: null,
                });
                onCompleted();
            },
            errorPolicy: "all"
        }
    );
    return { logout, loading, error, data }
}