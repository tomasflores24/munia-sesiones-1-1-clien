import { Provider } from "react-redux";
import store from "./redux/store";
import Register from "./components/register/register";

function App() {
  return (
    <>
      <Provider store={store}>
        <Register/>
      </Provider>
      ,
    </>
  );
}

export default App;
