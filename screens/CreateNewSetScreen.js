import React, { Component } from "react";
import {
  TouchableOpacity,
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView
} from "react-native";
import { Navigation } from "react-native-navigation";
import SQLite from "react-native-sqlite-storage";
import { Icon } from "react-native-elements";

var db = SQLite.openDatabase({
  name: "md.db",
  createFromLocation: 1
});

export default class CreateNewSetScreen extends Component {
  state = {
    rows: [],
    nameOfTheSet: "",
    descriptionOfTheSet: "",
    wordsAndDefinitions: [],
    lastCreatedSetId: 0
  };

  goToScreen = screenName => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName
      }
    });
  };

  addSetToDatabase = () => {
    const query = `INSERT INTO sets VALUES ('${this.state.nameOfTheSet}', '${
      this.state.descriptionOfTheSet
    }', '${JSON.stringify(this.state.wordsAndDefinitions)}') `;
    return db.executeSql(query);
  };

  saveSet = () => {
    this.addSetToDatabase();
    this.goToScreen("App");
  };

  addNewWords = () => {
    let wordsAndDefinitions = {
      id: this.state.lastCreatedSetId + 1,
      wordValue: "",
      definitionValue: "",
      answered: false
    };
    let newRow = (
      <View style={styles.wordsContainer}>
        <View
          style={{ display: "flex", alignItems: "flex-end", marginRight: 10 }}
        >
          <Icon
            name="check-circle"
            type="font-awesome"
            color="#841584"
            onPress={() => this.saveWords(wordsAndDefinitions)}
          />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="pojęcie"
          onChangeText={word => (wordsAndDefinitions.wordValue = word)}
        />

        <TextInput
          style={styles.textInput}
          placeholder="definicja"
          onChangeText={definition => {
            wordsAndDefinitions.definitionValue = definition;
          }}
        />
      </View>
    );
    this.setState({
      rows: [...this.state.rows, newRow],
      lastCreatedSetId: this.state.lastCreatedSetId + 1
    });
  };

  saveWords = wordsAndDefinitions => {
    this.setState({
      wordsAndDefinitions: [
        ...this.state.wordsAndDefinitions,
        wordsAndDefinitions
      ]
    });
  };

  render() {
    const { rows } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Nazwa zestawu"
            onChangeText={nameOfTheSet => this.setState({ nameOfTheSet })}
          />

          <TextInput
            style={styles.textInput}
            placeholder="Opis zestawu"
            onChangeText={descriptionOfTheSet =>
              this.setState({ descriptionOfTheSet })
            }
          />

          {rows}

          <View style={{ display: "flex", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.btnAddWords}
              onPress={this.addNewWords}
            >
              <Text style={styles.btnAddWordsText}>Dodaj słówka</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Button onPress={this.saveSet} title="Zapisz zestaw" color="#841584" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0"
  },
  textInput: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#841584",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5
  },
  wordsContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    margin: 10,
    backgroundColor: "silver"
  },
  btnAddWords: {
    margin: 10,
    borderWidth: 1,
    width: "40%",
    borderRadius: 5,
    padding: 5
  },
  btnAddWordsText: {
    fontSize: 14,
    textAlign: "center"
  }
});
