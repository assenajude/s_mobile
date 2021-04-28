import React from 'react';
import {Provider} from "react-redux";

import configureStore from "./src/store/configureStore";
import AppWrapper from "./AppWrapper";

export default function App() {
  const store = configureStore()
  return (
      <Provider store={store}>
        <AppWrapper/>
      </Provider>
  );
}
