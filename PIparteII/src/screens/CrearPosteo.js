import React, { Component } from "react";
import { TouchableOpacity, Text, View, StyleSheet, TextInput } from "react-native-web";
import { auth, db } from "../firebase/Config";

export default class CrearPosteo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descpost: "",
      
    };
  }

  crearPosteo(descpost) {
    if (descpost === "") {
      return "No puedes crear un posteo vacío";
    }
    db.collection("posts")
      .add({
        email: auth.currentUser.email,
        descripcion: descpost,
        createdAt: Date.now(),
        likes: [],
      })
      .then(this.props.navigation.navigate("Home"))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nuevo Posteo</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Agregar una descripción para tu posteo"
            value={this.state.descpost}
            onChangeText={(text) => this.setState({ descpost: text })}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.crearPosteo(this.state.descpost, this.state.urlImagen)}
          >
            <Text style={styles.buttonText}>Crear Posteo</Text>
          </TouchableOpacity>
        </View>
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
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#28A745",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
