import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <main className="py-3">Welcome to Shoppers</main>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
