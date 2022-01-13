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
// 8:29:20
// 7:32:23 start
export default App;
