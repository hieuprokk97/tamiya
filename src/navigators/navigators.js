import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "../screen/home";
import { Races } from "../screen/races";
import { ListAfterRaces } from "../screen/listAfterRaces";
import { SemiFinal } from "../screen/semiFinal";
import { Final } from "../screen/final";
const Stack = createStackNavigator();

export function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Races"
          component={Races}
          options={{ title: "Các vòng đua" }}
        />
        <Stack.Screen
          name="ListAfterRaces"
          component={ListAfterRaces}
          options={{ title: "Danh sách kết quả sau khi đua" }}
        />
        <Stack.Screen
          name="SemiFinal"
          component={SemiFinal}
          options={{ title: "Vòng đua Bán Kết" }}
        />
        <Stack.Screen
          name="Final"
          component={Final}
          options={{ title: "Vòng đua Chung kết" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
