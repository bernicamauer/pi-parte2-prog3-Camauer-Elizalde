import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { db } from "../firebase/Config";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [], 
      usuariosFiltrados: [],
      userName: "", 
    };
  }

  componentDidMount() {
    db.collection("users").onSnapshot((docs) => {
      let allUsers = [];
      docs.forEach((doc) => {
        allUsers.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.setState({ users: allUsers, usuariosFiltrados: allUsers });
    });
  }

  handleFilter(e) {
    const value= e.target.value;
    this.setState({
      userName: value,
      usuariosFiltrados: this.state.users.filter((user) =>user.data.userName.toLowerCase().includes(value.toLowerCase())
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

        {this.state.usuariosFiltrados.length > 0 ? (
          <FlatList
            data={this.state.usuariosFiltrados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={styles.userItem}>{item.data.userName}</Text>
            )}
          />
        ) : (
          <Text style={styles.error}>
            {this.state.userName? "El usuario no existe"
: "Ingrese un nombre de usuario para buscar"}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default SearchForm;
