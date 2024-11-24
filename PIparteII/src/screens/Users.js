import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
} from "react-native";
import { db } from "../firebase/Config";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      usuariosFiltrados: [],
      userName: "",
      error: "",
    };
  }

  componentDidMount() {
    db.collection("users").onSnapshot((docs) => {
      let users = [];
      docs.forEach((doc) => {
        users.push({ 
            id: doc.id, 
            ...doc.data() });
      });
      this.setState({ users, usuariosFiltrados: users });
    });
  }

  handleFilter(value) {
    this.setState({
      userName: value,
      usuariosFiltrados: this.state.users.filter((user) => user.userName.toLowerCase().includes(value.toLowerCase())
      ),
    });
  }

  render() {
    return (
      <View>
        <Text>Buscar Usuarios</Text>
        <TextInput
          keyboardType="default"
          placeholder="Ingrese el nombre de usuario"
          onChangeText={(text) => this.handleFilter(text)}
          value={this.state.userName}
        />
        <Text>Usuarios:</Text>

        {this.state.usuariosFiltrados.length > 0 ? (
            
          <FlatList
            data={this.state.usuariosFiltrados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Text> {item.userName}</Text>}
          />
        ) : (
          <Text>
            {this.state.userName
              ? "El usuario no existe"
              : "Ingrese un nombre de usuario para buscar"}
          </Text>
        )}
      </View>
    );
  }
}
