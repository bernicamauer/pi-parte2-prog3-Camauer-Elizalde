import Menu from './src/screens/Menu';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeMenu from './src/components/HomeMenu';
import HomePage from './src/screens/HomePage';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
                <Stack.Screen name="HomeMenu" component={HomeMenu} options={{ headerShown: false }} /> 
                <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} /> 
            



            </Stack.Navigator>
        </NavigationContainer>
    );
}
