import React, {useState} from 'react';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import configureStore from "./src/store/configureStore";
import MainNavigator from "./src/navigation/MainNavigator";
import {NavigationContainer} from "@react-navigation/native";
// import AppLoading from 'expo-app-loading';

/*import logger from './src/utilities/logger'
logger.start()*/

export default function App() {
  const store = configureStore()

  /*  const [isReady, setIsReady] = useState(false)

    if(!isReady) {
        return (<AppLoading
            StartAsync={() => console.log("app starting...........")}
            onFinish={() => setIsReady(true)}
            onError={error => console.log(error)}/>)
    }*/

  return (
      <SafeAreaProvider>
          <Provider store={store}>
              <NavigationContainer>
                  <MainNavigator/>
              </NavigationContainer>
          </Provider>
      </SafeAreaProvider>
  );
}
