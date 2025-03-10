import { combineReducers } from "redux";
import dataReducer from "./actions";

const rootReducer = combineReducers({
    data: dataReducer,
});
  
export default rootReducer;
