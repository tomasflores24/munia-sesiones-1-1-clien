import { Provider } from "react-redux";
import store from "./redux/store";
import Register from "./components/register/register";
import Table from "./components/Table/Table";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
            <Register />
            <Table />
        </Provider>
      </BrowserRouter>
      ,
    </>
  );
}

export default App;
