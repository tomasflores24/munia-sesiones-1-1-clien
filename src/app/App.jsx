import { Provider } from "react-redux";
import Register from "./components/register/register";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Register />
      </Provider>
      ,
    </>
  );
}

export default App;
