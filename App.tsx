import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthenticatedUserProvider } from './providers/index';
import { RootNavigator } from './navigation/index';



// const AuthStack = () => (
//   <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Login" component={LoginScreen} />
//     <Stack.Screen name="Signup" component={SignupScreen} />
//     <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//   </Stack.Navigator>
// );

// const AppStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="Home" component={HomeScreen} />
//   </Stack.Navigator>
// );

// const RootNavigator = () => {
//   const  user  = React.useContext(AuthenticatedUserContext);

//   return (
//     <NavigationContainer>
//       {user ? <AppStack /> : <AuthStack />}
//     </NavigationContainer>
//   );
// };

const App = () => {
  return (
    <AuthenticatedUserProvider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </AuthenticatedUserProvider>
  );
};

export default App;
