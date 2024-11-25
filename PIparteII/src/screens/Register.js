import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase/Config";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: "",
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
    const { email, password, userName } = this.state;
    let hasError = false;
    let errorMessage = "";

    if (!email) {
      hasError = true;
      errorMessage = "El campo de email es obligatorio.";
    }

    if (!password) {
      hasError = true;
      errorMessage = "El campo de contraseña es obligatorio.";
    }

    if (!userName) {
      hasError = true;
      errorMessage = "El campo de nombre de usuario es obligatorio.";
    }

    if (!hasError) {
      if (!email.includes("@")) {
        hasError = true;
        errorMessage = "El email debe contener un '@'.";
      } else if (!email.includes(".")) {
        hasError = true;
        errorMessage = "El email debe contener un punto '.'.";
      }
    }

    if (!hasError && password.length < 6) {
      hasError = true;
      errorMessage = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (hasError) {
      this.setState({ error: errorMessage });
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          db.collection("users").add({
            email: this.state.email,
            userName: this.state.userName,
            createdAt: Date.now(),
          });
          this.setState({ error: "" });
          this.props.navigation.navigate("Login");
        })
        .catch((error) => {
          let firebaseError = "Fallo el registro.";
          if (error.code === "auth/email-already-in-use") {
            firebaseError = "El email ya está en uso.";
          } else if (error.code === "auth/invalid-email") {
            firebaseError = "El email no es válido.";
          } else if (error.code === "auth/weak-password") {
            firebaseError = "La contraseña es muy débil.";
          }
          this.setState({ error: firebaseError });
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Formulario de Registro</Text>

        {this.state.error ? <Text style={styles.errorText}>{this.state.error}</Text> : null}

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

        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Ingrese su usuario"
          onChangeText={(text) => this.setState({ userName: text })}
          value={this.state.userName}
        />

        <TouchableOpacity
          onPress={() => this.handleSubmit()}
          style={[
            styles.button,
            !(this.state.email && this.state.password && this.state.userName) && styles.buttonDisabled,
          ]}
          disabled={!(this.state.email && this.state.password && this.state.userName)}
        >
          <Text style={styles.buttonText}>Acceder</Text>
        </TouchableOpacity>

        <Text style={styles.text}>¿Ya tienes cuenta?</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingLeft: 15,
    backgroundColor: "#fff",
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#5C6BC0",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonSecondary: {
    backgroundColor: "#9E9E9E",
  },
  buttonDisabled: {
    backgroundColor: "#BDBDBD",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginVertical: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
    marginVertical: 10,
  },
};

export default Register;
