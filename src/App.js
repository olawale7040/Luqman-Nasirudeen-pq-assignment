import { useRoutes } from "react-router-dom";
import routes from "./routes";
import "./App.css";
import Header from "./components/Header";

const App = () => {
  const routing = useRoutes(routes);
  return (
    <div className="App">
      <Header />
      <div>{routing}</div>
    </div>
  );
};

export default App;
