import * as actionTypes from './actionTypes';

export const initialState = {
    posts: [],
    user: null
};

const setUser = (state, action) => ({
    ...state,
    user: action.user
})

const setPosts = (state, action) => ({
    ...state,
    posts: action.post
})

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER: return setUser(state, action);
        case actionTypes.SET_POSTS: return setPosts(state, action);
        default: return state;
    }
}

export default reducer;