import Scene from "./components/Robot3D/Scene";
import ControlPanel from "./components/Controls/ControlPanel";
import BottomDock from "./components/Controls/BottomDock";

function App() {
  return (
    <>
      <Scene />
      <ControlPanel />
      <BottomDock />
    </>
  );
}

export default App;