import { Provider } from "react-redux";
import store from "./redux/store";
/* import Register from "./components/register/register"; */
import { BrowserRouter } from "react-router-dom";
import SideBar from "./components/sideBar/sideBar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
{/*           <Register /> */}
          <SideBar/>
        </Provider>
      </BrowserRouter>
      ,
    </>
  );
}

export default App;
