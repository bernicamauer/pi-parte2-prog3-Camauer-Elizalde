import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const Menu = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Bienvenido!</Text>
            
            <TouchableOpacity
                style={[styles.button, styles.buttonPrimary]}
                onPress={() => navigation.navigate('Login')} 
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.buttonSecondary]}
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        width: '80%',
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonPrimary: {
        backgroundColor: '#007BFF',
    },
    buttonSecondary: {
        backgroundColor: '#28A745',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Menu;