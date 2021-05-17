import React from 'react';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";

import configureStore from "./src/store/configureStore";
import AppWrapper from "./AppWrapper";

export default function App() {
  const store = configureStore()
  return (
      <SafeAreaProvider>
          <Provider store={store}>
            <AppWrapper/>
          </Provider>
      </SafeAreaProvider>
  );
}
