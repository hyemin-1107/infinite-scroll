import { configureStore } from "@reduxjs/toolkit";
import rootReducer from '../modules/index';


const store = configureStore ({
    reducer: rootReducer,
});

export default store;
