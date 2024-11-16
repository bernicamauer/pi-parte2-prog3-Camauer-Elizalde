import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const Menu = ({ navigation }) => { 
    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')} 
            >
                <Text>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
            >
                <Text>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Menu;
