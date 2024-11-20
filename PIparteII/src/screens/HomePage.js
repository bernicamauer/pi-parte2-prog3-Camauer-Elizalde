import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native-web';
import { db } from "../firebase/Config"
import Posts from"../components/Posts"
import HomeMenu from '../components/HomeMenu';

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
      <View>
        <Text>Home</Text>
        {this.state.posts.length === 0 ? ( 
          <Text>No hay Posteos</Text>
        ) : (
          <FlatList
            data={this.state.posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Posts postInfo={item} />} 
          />
          
        )}
      
      </View>
    );
  }
}

const styles = StyleSheet.create({});
