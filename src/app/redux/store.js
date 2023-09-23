import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // o cualquier otro almacenamiento que prefieras

import AuthSlice from "./slices/authSlice/authSlice";
import registerSlice from "./slices/registerSlice/registerSlice";

const authPersistConfig = {
  key: "root",
  storage,
  whitelist: ["authSlice"], // Aquí debes especificar los campos que deseas persistir
};

const rootReducer = combineReducers({
  AuthSlice: AuthSlice,
});

const persistedAuthSlice = persistReducer(authPersistConfig, rootReducer);


const store = configureStore({
  reducer: {
    auth: persistedAuthSlice,
    register: registerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
