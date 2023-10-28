// const initialState = {
//     access: localStorage.getItem('access'),
//     refresh: localStorage.getItem('refresh'),
//     isAuthenticated: null,
//     user: null
// };

// interface actionProps {
//     type: AuthenticationEnum
//     payload: any
// }

// export default function (state = initialState, action: actionProps) {
//     const { type, payload } = action;
    
//     switch(type) {
//         case AuthenticationEnum.LOGIN_SUCCESS:
//             return {
//                 ...state,
//                 isAuthenticated: true,
//                 user: payload.user
//             }

//         case AuthenticationEnum.LOGOUT:
//             return {
//                 ...state,
//                 "isAuthenticated": false,
//                 "user": undefined
//             }
//         default:
//             return state;
//     }   
// }
import userInterface from "@/data/user/userInterface";
import Cookies from 'js-cookie';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import userImpl from "@/data/user/userImpl";

interface AuthState {
    access: string
    refresh: string
    isAuthenticated: boolean
    user: userInterface
}

interface initialStateProps {
    value: AuthState
}


const initialState = {
    value: {
        access: Cookies.get('access_token') || '',
        refresh: Cookies.get('refresh_token') || '',
        isAuthenticated: false,
        user: {} as userInterface
    } as AuthState
} as initialStateProps;


export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => {
            return initialState;
        },
        login: (state, action: PayloadAction<userInterface>) => {
            const userForm = new userImpl();
            userForm.initFromDataObj(action.payload);
            const finalValue = {
                value: {
                    access: Cookies.get('access_token') || '',
                    refresh: Cookies.get('refresh_token') || '',
                    isAuthenticated: true,
                    user: userForm
                }
            }
            return finalValue;
        }
    }

})

export const { login, logout } = auth.actions;
export default auth.reducer;