import HomePage from '../screens/HomePage';
import Profile from '../screens/Profile';
import CrearPosteo from '../screens/CrearPosteo';
import Users from '../screens/Users';
import { FontAwesome } from "@expo/vector-icons";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeMenu = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Home" 
                component={HomePage} 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} /> 
                }} 
            />
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} /> 
                }} 
            />
            <Tab.Screen 
                name="Post" 
                component={CrearPosteo} 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: ({ color, size }) => <FontAwesome name="plus" size={size} color={color} /> 
                }} 
            />
            <Tab.Screen 
                name="Users" 
                component={Users} 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: ({ color, size }) => <FontAwesome name="group" size={size} color={color} /> 
                }} 
            />
        </Tab.Navigator>
    );
};

export default HomeMenu;
