import React from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <header role="header">
        <Header />
      </header>
      <main role="main">
        <Main />
      </main>
      <footer role="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default App;