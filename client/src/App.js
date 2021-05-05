import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from "./components/headers/Header";
import MainPages from "./components/mainpages/Pages";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header></Header>
          <MainPages></MainPages>
        </div>
      </Router>
    </DataProvider>
  );
}
// 4:17:40
export default App;
