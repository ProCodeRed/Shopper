import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <main className="py-3">
            <Route path="/" exact component={Homepage} />
            <Route path="/product/:id" component={ProductPage} />
        </main>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
