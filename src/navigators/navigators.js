import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screen/home";
import { Profile } from "../screen/profile";
const Stack = createStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "tomato" },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
      />
    </Stack.Navigator>
  );
}
