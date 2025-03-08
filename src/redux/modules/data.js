const dataState = {
    items: [],
    isMoreItems: true,
    isLoading: false,
    post: null,
};

export default function dataReducer(state = dataState, action) {
    switch(action.type) {
        case "SET_ITEMS":
            return { ...state, items: [...state.items, ...action.payload] };
        case "SET_IS_MORE_ITEMS":
            return { ...state, isMoreItems: action.payload };
        case "SET_IS_LOADING":
            return { ...state, isLoading: action.payload };
        case "SET_POST":
            return { ...state, post: action.payload };
        default:
            return state;                
    }
};

export const setItems = (items) => ({ type: "SET_ITEMS", payload: items });
export const setIsMoreItems = (isMoreItems) => ({ type: "SET_IS_MORE_ITEMS", payload: isMoreItems });
export const setIsLoading = (isLoading) => ({ type: "SET_IS_LOADING", payload: isLoading });
export const setPost = (post) => ({ type: "SET_POST", payload: post });