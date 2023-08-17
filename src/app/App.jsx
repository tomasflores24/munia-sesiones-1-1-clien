import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import Table from "./components/Table/Table";


function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          {/* <Register /> */}
          <Table />
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
