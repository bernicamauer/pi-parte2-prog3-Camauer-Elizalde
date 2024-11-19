import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput
} from "react-native";
import { auth } from "../firebase/Config";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      logued: false,
      error: ""

    };
  }

  handleSubmit() {

    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => this.setState({ logued: true , error: ""}))
      .then(() => this.props.navigation.navigate("HomeMenu"))
      .catch((error) => this.setState({ error: error.message }));
  }



  render() {
    return (
      <View>
        <Text>Fromulario Login</Text>

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

        {this.state.error ? (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {this.state.error}
          </Text>
        ) : null}

        <TouchableOpacity
          onPress={() => this.handleSubmit()}
          style={[styles.button, styles.buttonSecondary]}
          disabled={!(this.state.email && this.state.password)}
        >
          <Text>Acceder</Text>
        </TouchableOpacity>

        <Text>Navegación cruzada a Registro: </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
          style={styles.button}
        >
          <Text>No tengo cuenta</Text>
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


export default Login;
