import { Provider } from "react-redux";
import store from "./redux/store";
import Register from "./components/register/register";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Register />
        </Provider>
      </BrowserRouter>
      ,
    </>
  );
}

export default App;
