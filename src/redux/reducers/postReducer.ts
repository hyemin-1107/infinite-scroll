import { AnyAction, Reducer } from "redux";

const SET_POST = 'data/SET_POST';

export interface Post {
    id: number;
    [key: string]: string | number;
};

const initialState: Post | null = null;

const postReducer: Reducer<Post | null, AnyAction> = (
    state = initialState,
    action
  ) => {
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