import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Form from "./component/Form";
import AddPost from "./component/AddPost";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Form />} />
              <Route path="/home" element={<Home />} />
              <Route path="/AddPost" element={<AddPost />} />
            </Routes>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
