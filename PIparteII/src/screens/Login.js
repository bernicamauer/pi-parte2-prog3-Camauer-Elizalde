import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { auth } from "../firebase/Config";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      logued: false,
      error: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("HomeMenu"); 
      }
    });
  }

  handleSubmit() {
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.setState({ logued: true, error: "" }))
      .then(() => this.props.navigation.navigate("HomeMenu"))
      .catch((error) => this.setState({ error: error.message }));
  }

  render() {
    const isDisabled = !(this.state.email && this.state.password);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Formulario Login</Text>

        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Ingrese su email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.input}
          placeholder="Ingrese su contraseña"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />

        {this.state.error ? (
          <Text style={styles.errorText}>{this.state.error}</Text>
        ) : null}

        <TouchableOpacity
          onPress={() => this.handleSubmit()}
          style={[
            styles.button,
            isDisabled ? styles.buttonDisabled : styles.buttonPrimary,
          ]}
          disabled={isDisabled}
        >
          <Text style={styles.buttonText}>Acceder</Text>
        </TouchableOpacity>

        <Text style={styles.navigationText}>¿No tienes cuenta?</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  input: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonPrimary: {
    backgroundColor: "#007BFF",
  },
  buttonDisabled: {
    backgroundColor: "#D3D3D3",
  },
  buttonSecondary: {
    backgroundColor: "#28A745",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  navigationText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
};

export default Login;
