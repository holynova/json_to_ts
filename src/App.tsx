import React from "react";
import { Header } from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentKey="ts" />
      <main className="pt-16 py-6">
        <HomePage />
      </main>
    </div>
  );
};

export default App;
