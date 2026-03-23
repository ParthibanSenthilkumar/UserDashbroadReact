import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Allroutes from "./Routes/Allroutes";
import Toaster from "./Components/Toaster";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Allroutes />
      </BrowserRouter>
    </>
  );
}

export default App;
