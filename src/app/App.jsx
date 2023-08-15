import { Provider } from "react-redux";
import "../App.css";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
      </Provider>
      ,
    </>
  );
}

export default App;
