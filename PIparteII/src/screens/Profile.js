import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/Config';
import Posts from "../components/Posts";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
            userName: '',
            posts: [],
            login: false,
            error: ""
        };
    }

    componentDidMount() {
        const user = auth.currentUser;

        if (user) {

            this.setState({
                userEmail: user.email,
            });


            db.collection('users').onSnapshot(
                docs => {
                    docs.forEach((doc) => {
                        if (doc.data().email === user.email) {
                            this.setState({ userName: doc.data().userName });
                        }
                    });
                });


            db.collection('posts').onSnapshot(docs => {
                let userPosts = [];
                docs.forEach((doc) => {
                    if (doc.data().email === user.email) {
                        userPosts.push({
                            id: doc.id,
                            data: doc.data(),
                        });
                    }
                });
                this.setState({ posts: userPosts });
            });
        }
    }

    handleLogout = () => {
        auth
            .signOut()
            .then(() => {
                this.props.navigation.navigate('Login');
            })
            .catch((error) => this.setState({ error: error.message }));
    };

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Mi Perfil</Text>
                <Text style={styles.label}>Nombre de usuario: {this.state.userName}</Text>
                <Text style={styles.label}>Correo del usuario: {this.state.userEmail}</Text>
                <Text style={styles.label}>Total de posteos: {this.state.posts.length}</Text>

                <FlatList
                    data={this.state.posts}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>  <Posts postInfo={item} />
                    }
                />

                <TouchableOpacity onPress={this.handleLogout} style={[styles.button, styles.buttonPrimary]}>
                    <Text style={styles.buttonText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        color: "#555",
        marginBottom: 10,
    },
    postContainer: {
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 8,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    postText: {
        fontSize: 16,
        color: "#333",
    },
    button: {
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 10,
    },
    buttonPrimary: {
        backgroundColor: "#007BFF",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Profile;
