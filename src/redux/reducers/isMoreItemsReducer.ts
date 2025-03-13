const SET_IS_MORE_ITEMS = 'data/SET_IS_MORE_ITEMS';

const initialState = true;

const isMoreItemsReducer = (state = initialState, action: { type: string; payload: boolean }) => {
    switch (action.type) {
        case SET_IS_MORE_ITEMS:
            return action.payload;
        default:
            return state;
    }
};

export default isMoreItemsReducer;

export const setIsMoreItems = (isMoreItems: boolean) => ({
    type: SET_IS_MORE_ITEMS,
    payload: isMoreItems,
});