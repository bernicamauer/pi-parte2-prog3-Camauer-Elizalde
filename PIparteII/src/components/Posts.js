import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import firebase from "firebase";
import { auth, db } from "../firebase/Config";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
   
    };
  }

  componentDidMount() {
    if (this.props.postInfo.data.likes.includes(auth.currentUser.email)) {
      this.setState({
        liked: true,
      });
    }

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("HomeMenu"); 
      }
    });
  }

  like() {
    db.collection("posts")
      .doc(this.props.postInfo.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => {
        this.setState({
          liked: true,
        });
      });
  }

  dislike() {
    db.collection("posts")
      .doc(this.props.postInfo.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
      })
      .then(() => {
        this.setState({
          liked: false,
        });
      });
  }

  deletePost = () => {
    db.collection("posts")
    .doc(this.props.postInfo.id)
    .delete()
    .then(() => {
      console.log("Post eliminado");
    })
    .catch((error) => {
      console.log(error);
      
    })
  }

  render() {
    return (
      <View style={styles.postContainer}>
        <Text style={styles.description}>
          {this.props.postInfo.data.descripcion}
        </Text>
        <Text style={styles.meta}>
          Posteado por: {this.props.postInfo.data.email}
        </Text>
        <Text style={styles.meta}>
          Cantidad de likes: {this.props.postInfo.data.likes.length}
        </Text>
        <Text>Likeado por: {this.props.postInfo.data.likes}  </Text>
        <Text style={styles.meta}>
          {new Date(this.props.postInfo.data.createdAt).toLocaleString()}
        </Text>

        {this.state.liked ? (
          <TouchableOpacity
            onPress={() => this.dislike()}
            style={styles.button}
          >
            <FontAwesome name="heart" size={20} color="red" />
           
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.like()} style={styles.button}>
            <FontAwesome name="heart-o" size={20} color="gray" />
          </TouchableOpacity>
        )}

      {this.props.postInfo.data.email === auth.currentUser.email ? (
          <TouchableOpacity onPress={() => this.deletePost()} style={styles.button}>
            <Text style={styles.buttonText}>Eliminar Post</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  meta: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#555",
  },
});

export default Post;
