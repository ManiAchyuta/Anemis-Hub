import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Movies from "./Pages/Movies/Movies";
import { Container } from "@material-ui/core";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Movies} />
            </Switch>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
