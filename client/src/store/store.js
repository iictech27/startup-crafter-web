import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import userBlogReducer from "../features/blog/userBlogSlice";
import ideaReducer from "../features/ideas/ideaSlice";
import adminReducer from "../features/users/adminSlice";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import studyMaterialReducer from "../features/study_material/studyMaterialSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  blog: userBlogReducer,
  admin: adminReducer,
  studyMaterial: studyMaterialReducer,
  idea: ideaReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistedStore = persistStore(store);
