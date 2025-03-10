const SET_ITEMS = 'data/SET_ITEMS';
const SET_IS_MORE_ITEMS = 'data/SET_IS_MORE_ITEMS';
const SET_IS_LOADING = 'data/SET_IS_LOADING';
const SET_POST = 'data/SET_POST';

interface Post {
  id: number;
  [key: string]: string | number;
};

interface DataState {
    items: [];
    isMoreItems: boolean;
    isLoading: boolean;
    post: Post | null;
};
  
const dataState: DataState = {
  items: [],
  isMoreItems: true,
  isLoading: false,
  post: null,
};

//유니온 타입, 액션이 전달하는 데이터
type DataAction =
  | { type: typeof SET_ITEMS; payload: [] }
  | { type: typeof SET_IS_MORE_ITEMS; payload: boolean }
  | { type: typeof SET_IS_LOADING; payload: boolean }
  | { type: typeof SET_POST; payload: Post };

export default function dataReducer(
  state = dataState,
  action: DataAction
  ): DataState {
  switch (action.type) {
    case SET_ITEMS:
      return { ...state, items: [...state.items, ...action.payload] };
    case SET_IS_MORE_ITEMS:
      return { ...state, isMoreItems: action.payload };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_POST:
      return { ...state, post: action.payload };
    default:
      return state;
  }
};
  
export const setItems = (items: []) => ({
  type: SET_ITEMS,
  payload: items,
});
export const setIsMoreItems = (isMoreItems: boolean) => ({
  type: SET_IS_MORE_ITEMS,
  payload: isMoreItems,
});
export const setIsLoading = (isLoading: boolean) => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});
export const setPost = (post: Post | null) => ({
  type: SET_POST,
  payload: post,
});