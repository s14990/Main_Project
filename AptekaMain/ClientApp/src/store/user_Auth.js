import axios from 'axios';
const UserLoginType = 'USER_LOGIN';
const UserLogoutType = 'USER_LOGOUT';
const UserFailType = 'USERA_FAIL';
const initialState = { user: '', isLoading: true, isAuthenticated: false, login_error: '' };

export const actionCreators = {
    loginUser: req => async (dispatch, getState) => {

        axios.post('/api/UserSessions', req).then(res => {
            dispatch({ type: UserLoginType, res });
        }).catch(error => {
            dispatch({ type: UserFailType, error });
        });

    },
    logoutUser: () => ({ type: UserLogoutType })
};

export const reducer = (state, action) => {
    state = state || initialState;
    if (action.type === UserLogoutType) {
        return {
            ...state,
            user: '',
            isLoading: false,
            isAuthenticated: false,
            login_error: ''
        };
    }

    if (action.type === UserLoginType) {
        return {
            ...state,
            user: action.res.data,
            isLoading: false,
            isAuthenticated: true,
            login_error: ''
        };
    }
    if (action.type === UserFailType) {
        return {
            isLoading: true,
            login_error: action.error
        };
    }

    return state;
};
