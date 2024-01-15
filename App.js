import React from "react";
import { Home } from "./src/screen/home";
import { MyStack } from "./src/navigators/navigators";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();
const App = () => {
  return (
    <Provider store={store}>
      <MyStack />
    </Provider>
  );
};
export default App;
