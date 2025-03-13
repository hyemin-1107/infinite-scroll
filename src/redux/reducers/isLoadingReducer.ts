const SET_IS_LOADING = 'data/SET_IS_LOADING';

const initialState = false;

const isLoadingReducer = (state = initialState, action: { type: string; payload: boolean }) => {
    switch (action.type) {
        case SET_IS_LOADING:
            return action.payload;
        default:
            return state;
    }
};

export default isLoadingReducer;

export const setIsLoading = (isLoading: boolean) => ({
    type: SET_IS_LOADING,
    payload: isLoading,
});