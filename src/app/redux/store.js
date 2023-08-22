import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // o cualquier otro almacenamiento que prefieras

import authReducer from "./slices/authSlice/authSlice";
import registrationReducer from "./slices/registrationSlice/registrationSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"], // Aquí debes especificar los campos que deseas persistir
};

const registrationPersistConfig = {
  key: "registration",
  storage,
  whitelist: ["currentStep", "dataUser", "documentationUser", "professions"], // Aquí debes especificar los campos que deseas persistir
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedRegistrationReducer = persistReducer(
  registrationPersistConfig,
  registrationReducer
);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    registration: persistedRegistrationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
