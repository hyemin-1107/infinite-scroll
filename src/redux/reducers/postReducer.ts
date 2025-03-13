const SET_POST = 'data/SET_POST';

interface Post {
    id: number;
    [key: string]: string | number;
};

const initialState: Post | null = null;

const postReducer = (state = initialState, action: { type: string; payload: Post | null }) => {
    switch (action.type) {
        case SET_POST:
            return action.payload;
        default:
            return state;
    }
};

export default postReducer;

export const setPost = (post: Post | null) => ({
    type: SET_POST,
    payload: post,
});