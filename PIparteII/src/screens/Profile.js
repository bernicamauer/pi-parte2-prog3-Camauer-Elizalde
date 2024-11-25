import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/Config';

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
            <View>
                <Text>Mi Perfil</Text>
                <Text>Nombre de usuario: {this.state.userName}</Text>
                <Text>Correo del usuario: {this.state.userEmail}</Text>
                <Text>Total de posteos: {this.state.posts.length}</Text>


                <FlatList
                    data={this.state.posts}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <View>
                        <Text>{item.text}</Text>
                    </View>}
                />

                <TouchableOpacity onPress={this.handleLogout} >
                    <Text >Cerrar sesión</Text>
                </TouchableOpacity>
            </View>

        );
    }
}

export default Profile;