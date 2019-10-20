import axios from 'axios';
const requestUserLoginType = 'REQUEST_USER_LOGIN';
const receiveUserLoginType = 'RECEIVE_USER_LOGIN';
const initialState = { user: '', isLoading: false, isAuthenticated: false };

export const actionCreators = {
    loginUser: req => async (dispatch, getState) => {

        dispatch({ type: requestUserLoginType});
        axios.post('/api/UserSessions', req).then(res => {
            dispatch({ type: receiveUserLoginType, res });
        });

    }
};

export const reducer = (state, action) => {
    state = state || initialState;
    if (action.type === requestUserLoginType) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveUserLoginType) {
        return {
            ...state,
            user: action.res.data,
            isLoading: false,
            isAuthenticated: true
        };
    }

    return state;
};
