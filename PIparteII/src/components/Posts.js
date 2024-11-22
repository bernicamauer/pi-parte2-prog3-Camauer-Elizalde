import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import firebase from "firebase";
import { auth,db } from '../firebase/Config'


class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
     liked: false
    };
  }


  componentDidMount(){
    if(this.props.postInfo.data.likes.includes(auth.currentUser.email)){
      this.setState({
        liked: true
      })
    }
  }
  like(){
    db.collection("posts")
    .doc(this.props.postInfo.id)
    .update({
      likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then( () => {
      this.setState({
        liked: true
      })
    })
  }

  dislike(){
    db.collection("posts")
    .doc(this.props.postInfo.id)
    .update({
      likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then( () => {
      this.setState({
        liked: false
      })
    })
  }

  render() {
    return (
      <View >
        <Text>{this.props.postInfo.data.descripcion}</Text>
        <Text>Posteado por:{this.props.postInfo.data.email} </Text>  
        <Text>Cantidad de likes:{this.props.postInfo.data.likes} </Text>   
        <Text> { new Date (this.props.postInfo.data.createdAt).toLocaleString()}   </Text>  

        {
          this.state.liked ? (
            <TouchableOpacity onPress= {()=> this.dislike()}> 
              <Text>
                Ya no me gusta 
              </Text>

            </TouchableOpacity>
          ) 
          : (
            <TouchableOpacity onPress= {()=> this.like()}> 
              <Text>
                Me gusta 
              </Text>

            </TouchableOpacity>
          )
        } 

      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default Post;