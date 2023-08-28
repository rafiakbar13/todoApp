import { useState } from "react";
import Header from "./component/header";
import Content from "./component/Content";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <div className="App">
        <div className="container">
          <div className="p-12 mx-auto max-w-7xl">
            <h1 className="text-center">TODO LIST</h1>
            <div className="gap-8">
              <Header />
              <Content />
            </div>
          </div>
        </div>
        <Toaster
          toastOptions={{
            position: "top-right",
            duration: 2000,
            style: {
              fontSize: "1.5rem",
            },
          }}
        />
      </div>
    </>
  );
}

export default App;
