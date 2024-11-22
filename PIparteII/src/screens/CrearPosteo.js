import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, View, StyleSheet, TextInput } from 'react-native-web'
import { auth,db } from '../firebase/Config'
import HomePage from './HomePage'

export default class CrearPosteo extends Component {
  constructor(props){
    super(props)
    this.state= {
      descpost:"",
      urlImagen:""
      
    }
  }  

  crearPosteo( descpost,urlImagen){
    if(descpost ===""){
      return "No puedes crear un posteo vacio"
    }
    db.collection("posts").add({
      email: auth.currentUser.email,
      descripcion:descpost,
      createdAt: Date.now(),
      likes: []

    })
    .then(this.props.navigation.navigate("HomePage"))
    .catch((err) => console.log(err))
  }
  render() {
    return (
      <View>
        <Text> Nuevo Posteo </Text>
        <View>
        <TextInput placeholder='Agregar una descripcion para tu posteo'
        value={this.state.descpost}
        onChangeText={(text)=> this.setState({descpost:text})}
        />
        <TouchableOpacity onPress={()=> this.crearPosteo(this.state.descpost,this.state.urlImagen)}>
          <Text>Crear Posteo</Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
 
})