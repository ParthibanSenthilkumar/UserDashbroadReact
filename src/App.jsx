import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Allroutes from "./Routes/Allroutes";
import Toaster from "./Components/Toaster";
import Usercontextprovider from "./Context/Usercontextprovider";

function App() {
  return (
    <>
      <Usercontextprovider>
        <BrowserRouter>
          <Toaster />
          <Allroutes />
        </BrowserRouter>
      </Usercontextprovider>
    </>
  );
}

export default App;
