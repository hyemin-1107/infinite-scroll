const SET_ITEMS = 'data/SET_ITEMS';

const initialState: [] = [];

const itemsReducer = (state = initialState, action: { type: string; payload: [] }) => {
    switch (action.type) {
        case SET_ITEMS:
            return [...state, ...action.payload];
        default:
            return state;
    }
};

export default itemsReducer;

export const setItems = (items: []) => ({
    type: SET_ITEMS,
    payload: items,
});