import { createContext, ReactElement, useReducer } from "react"

export enum UserActionType {
    LOGAR, DESLOGAR
}

interface User {
    id: string,
    email: string,
    password: string,
    token: string,
    status: boolean,
    message: string
}

interface UserReducerAction {
    type: UserActionType,
    user: User
}

export const UserContext = createContext<User | null>(null);
export const UserDispatchContext = createContext<any>(null);

export default function UserProvider({ children }: { children: ReactElement }) {

    const [user, dispatch] = useReducer(UserReducer, initialUser);

    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    )
}

function UserReducer(user: User, { type, user: userAuth }: UserReducerAction) {
    switch (type) {
        case UserActionType.LOGAR: {
            return {
                ...userAuth,
                status: true,
                message: 'Autenticado com sucesso!'
            }
        }
        case UserActionType.DESLOGAR: {
            return {
                ...user,
                token: null,
                status: false,
                message: null
            }
        }
        default: {
            throw Error('Operação desconhecida!');
        }
    }
}

const initialUser: User = {
    id: '',
    email: '',
    password: '',
    token: '',
    status: false,
    message: ''
}