import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native-web';
import { db } from "../firebase/Config";
import Posts from "../components/Posts";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    db.collection("posts").onSnapshot((docs) => {
      let arrDocs = [];
      docs.forEach((doc) => {
        arrDocs.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.setState(
        {
          posts: arrDocs,
        },
        () =>
          console.log(
            "Posteos en el home: ",
            JSON.stringify(this.state.posts, null, 4)
          )
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        {this.state.posts.length === 0 ? (
          <Text style={styles.noPostsText}>No hay Posteos</Text>
        ) : (
          <FlatList
            data={this.state.posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Posts postInfo={item} />}
            style={styles.postList}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  noPostsText: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
  postList: {
    width: "100%",
  },
});

