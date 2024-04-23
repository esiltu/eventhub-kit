import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { BackButton } from '../components/BackButton';
import { Overview, Details, OnboardingPages } from '../routers/PageRouter';

export type RootStackParamList = {
  Overview: undefined;
  OnboardingPages: undefined;
  Details: { name: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="OnboardingPages"
          component={OnboardingPages}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({ navigation }) => ({
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
