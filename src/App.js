import React from "react";
import { Provider } from "react-redux";
import store from "../src/store/store";
import MovieSearch from "../src/Component/MovieSearch";

function App() {
  return (
    <Provider store={store}>
      <MovieSearch />
    </Provider>
  );
}

export default App;
