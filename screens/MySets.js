import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Navigation } from "react-native-navigation";
import SQLite from "react-native-sqlite-storage";

var db = SQLite.openDatabase({
  name: "md.db",
  createFromLocation: 1
});

export default class MySets extends Component {
  state = {
    sets: []
  };

  goToScreen = screenName => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName
      }
    });
  };

  downloadDataFromDatabase() {
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM sets;", [], (tx, results) => {
        var sets = [];
        for (let i = 0; i < results.rows.length; i++) {
          sets[i] = results.rows.item(i);
        }
        this.setState({ sets: sets });
      });
    });
  }

  async componentDidMount() {
    this.downloadDataFromDatabase();
  }

  renderSets = () => {
    let rows = [];

    this.state.sets.forEach((set, index) => {
      rows.push(
        <TouchableOpacity
          key={index}
          style={styles.test}
          onPress={() => this.goToScreen("Set")}
        >
          <Text style={styles.welcome}>{set.name}</Text>
          <Text>{JSON.parse(set.wordsAndDefinitions).length} pojęć</Text>
          <Text>{set.desc}</Text>
        </TouchableOpacity>
      );
    });
    return rows;
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.welcome}>Twoje zestawy </Text>
          {this.renderSets()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0"
  },
  welcome: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    color: "black",
    fontWeight: "bold"
  },
  test: {
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: "white",
    width: "90%",
    padding: 5,
    alignSelf: "center"
  }
});
