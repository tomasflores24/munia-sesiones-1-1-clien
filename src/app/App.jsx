import { Provider } from "react-redux";
import { store, persistor } from "./redux/store"; // Importa tanto la tienda como el persistor
import { PersistGate } from "redux-persist/integration/react"; // Importa PersistGate si aún no lo tienes
import AppRouter from "./routes/AppRouter";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <AppRouter />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
