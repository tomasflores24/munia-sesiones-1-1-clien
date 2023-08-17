import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store"; // Importa tanto la tienda como el persistor
import { PersistGate } from "redux-persist/integration/react"; // Importa PersistGate si aún no lo tienes

import AppRoutes from "./routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppRoutes />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
