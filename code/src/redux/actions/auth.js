import { fetchActions } from "@root/redux/actions"
import { fetchDataUser } from "@root/services/auth"

export const userActions = fetchActions('USER', fetchDataUser)
