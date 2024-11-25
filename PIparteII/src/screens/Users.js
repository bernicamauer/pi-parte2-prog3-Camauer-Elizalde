import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  StyleSheet
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
          ...doc.data(),
        });
      });
      this.setState({ users, usuariosFiltrados: users });
    });
  }

  handleFilter(value) {
    this.setState({
      userName: value,
      usuariosFiltrados: this.state.users.filter((user) =>
        user.userName.toLowerCase().includes(value.toLowerCase())
      ),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Buscar Usuarios</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Ingrese el nombre de usuario"
          onChangeText={(text) => this.handleFilter(text)}
          value={this.state.userName}
        />
        <Text style={styles.subtitle}>Usuarios:</Text>

        {this.state.usuariosFiltrados.length > 0 ? (
          <FlatList
            data={this.state.usuariosFiltrados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text style={styles.userItem}>{item.userName}</Text>
            )}
            style={styles.userList}
          />
        ) : (
          <Text style={styles.message}>
            {this.state.userName
              ? "El usuario no existe"
              : "Ingrese un nombre de usuario para buscar"}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
    fontSize: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  userList: {
    width: "100%",
  },
  userItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    fontSize: 16,
    color: "#333",
  },
  message: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});
