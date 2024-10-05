import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <main className="py-3">
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/cart/:id?" component={CartPage} />
            <Route path="/" exact component={Homepage} />
        </main>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
