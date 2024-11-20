import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  render() {
    return (
      <View >
        <Text>{this.props.postInfo.data.descripcion}</Text>
        <Text>Posteado por:{this.props.postInfo.data.email} </Text>  
        <Text>Cantidad de likes:{this.props.postInfo.data.likes} </Text>   
        <Text> { new Date (this.props.postInfo.data.createdAt).toLocaleString()}   </Text>   

      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default Post;