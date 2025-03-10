import { configureStore } from "@reduxjs/toolkit";
import rootReducer from '../modules/reducer';

const store = configureStore ({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;