import About from "./components/about";
import Create from "./components/create";
import Header from "./components/header";
import Home from "./components/Home";
import FImage from "./components/image1";
import SImage from "./components/image2";

function App() {
  return (
    <div>
        <Header />
        <Home />
        <FImage />
        <SImage />
        <About />
        <Create />
      </div>
  );
}

export default App;
