import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducer as conversionHistory } from "src/slices/conversionHistory";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  conversionHistory,
});

const rootReducer = persistReducer(persistConfig, reducers);
export default rootReducer;
