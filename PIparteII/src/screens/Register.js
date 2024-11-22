import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { auth,db } from "../firebase/Config"

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: "",
      registered: false,
      error: ""

    };
  }

  

  handleSubmit() {
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.setState({registered: true}),
        db.collection("users").add({
            email: this.state.email,
            userName: this.state.userName,
            createdAt: Date.now(),
          }))
      .then(() => this.props.navigation.navigate("Login"))
       
      .catch((error) => this.setState({ error: "Fallo el registro" }));
  }
  


  render() {
    return (
      <View>
        <Text>Fromulario Register</Text>

        <TextInput
          keyboardType="email-address"
          placeholder="Ingrese su email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          placeholder="Ingrese su contraseña"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />

        <TextInput
          keyboardType="default"
          placeholder="Ingrese su usuario"
          onChangeText={(text) => this.setState({ userName: text })}
          value={this.state.userName}
        />



        <TouchableOpacity
          onPress={() => this.handleSubmit()}
          style={[styles.button, styles.buttonSecondary]}
          disabled={!(this.state.email && this.state.password && this.state.userName)}
        >
          <Text>Acceder</Text>
        </TouchableOpacity>

        <Text>Navegación cruzada a Login: </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
          style={styles.button}
        >
          <Text>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

const styles = {
  button: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "#6C757D",
  },
};

export default Register;
