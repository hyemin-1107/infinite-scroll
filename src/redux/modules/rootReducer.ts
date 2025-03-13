import { combineReducers } from "redux";
import itemsReducer from "../reducers/itemsReducer";
import isMoreItemsReducer from "../reducers/isMoreItemsReducer";
import isLoadingReducer from "../reducers/isLoadingReducer";
import postReducer from "../reducers/postReducer";

const rootReducer = combineReducers({
    items: itemsReducer,
    isMoreItems: isMoreItemsReducer,
    isLoading: isLoadingReducer,
    post: postReducer,
});
  
export default rootReducer;
