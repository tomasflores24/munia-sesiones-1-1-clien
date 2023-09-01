import { Provider } from "react-redux";
import { store, persistor } from "./redux/store"; // Importa tanto la tienda como el persistor
import { PersistGate } from "redux-persist/integration/react"; // Importa PersistGate si aún no lo tienes
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
