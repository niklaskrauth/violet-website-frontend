import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Scene from "./Components/Scene/Scene.tsx";

function App() {


  return (
    <BrowserRouter>
      <div className="h-[100svh] w-[100svw]">
        <Scene />
      </div>
    </BrowserRouter>
  );
}

export default App;

