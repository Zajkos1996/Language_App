import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  StatusBar,
  Alert
} from "react-native";
import { Navigation } from "react-native-navigation";
import SQLite from "react-native-sqlite-storage";
import { Icon, Header, Button } from "react-native-elements";

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
    nextFreeWordsId: 0
  };

  goToScreen = screenName => {
    Navigation.setStackRoot(this.props.componentId, [
      {
        component: {
          name: screenName
        }
      }
    ]);
  };

  addSetToDatabase = () => {
    const query = `INSERT INTO sets (name, desc, wordsAndDefinitions) VALUES ('${
      this.state.nameOfTheSet
    }', '${this.state.descriptionOfTheSet}', '${JSON.stringify(
      this.state.wordsAndDefinitions
    )}') `;
    return db.executeSql(query);
  };

  saveSet = () => {
    if (this.state.nameOfTheSet === "") {
      Alert.alert("Zapisz zestaw", "Zestaw musi mieć nazwę", [{ text: "Ok" }], {
        cancelable: false
      });
    } else if (this.state.descriptionOfTheSet === "") {
      Alert.alert("Zapisz zestaw", "Zestaw musi mieć opis", [{ text: "Ok" }], {
        cancelable: false
      });
    } else if (this.state.wordsAndDefinitions.length < 5) {
      Alert.alert(
        "Zapisz zestaw",
        "Zestaw musi zawierać minimum 5 słówek",
        [{ text: "Ok" }],
        { cancelable: false }
      );
    } else {
      this.addSetToDatabase();
      this.goToScreen("MySetsScreen");
      // Navigation.popToRoot(this.props.componentId);
    }
  };

  addNewWords = async () => {
    let currentId = this.state.nextFreeWordsId;

    let wordAndDefinition = {
      id: currentId + 1,
      wordValue: "",
      definitionValue: ""
    };

    await this.setState({
      wordsAndDefinitions: [
        ...this.state.wordsAndDefinitions,
        wordAndDefinition
      ]
    });

    let newRow = (
      <View style={styles.wordsContainer}>
        <TextInput
          style={styles.wordsContainerInput}
          placeholder="pojęcie"
          onChangeText={word => {
            let copy = this.state.wordsAndDefinitions;
            copy[currentId].wordValue = word;
            this.setState({
              wordsAndDefinitions: copy
            });
          }}
        />

        <TextInput
          style={styles.wordsContainerInput}
          placeholder="definicja"
          onChangeText={definition => {
            let copy = this.state.wordsAndDefinitions;
            copy[currentId].definitionValue = definition;
            this.setState({
              wordsAndDefinitions: copy
            });
          }}
        />
      </View>
    );

    this.setState({
      rows: [...this.state.rows, newRow],
      nextFreeWordsId: this.state.nextFreeWordsId + 1
    });
  };

  render() {
    const { rows } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header
            centerComponent={{
              text: "Stwórz zestaw",
              style: styles.headerTitleText
            }}
            rightComponent={{
              icon: "check",
              color: "#fff",
              onPress: () => this.saveSet()
            }}
            containerStyle={{
              backgroundColor: "#4E046D",
              marginTop: (StatusBar.currentHeight || 0) * -1
            }}
          />
          <ScrollView style={styles.scrollContainer}>
            <TextInput
              style={styles.scrollContainerInput}
              placeholder="Nazwa zestawu"
              onChangeText={nameOfTheSet => this.setState({ nameOfTheSet })}
            />

            <TextInput
              style={styles.scrollContainerInput}
              placeholder="Opis zestawu"
              onChangeText={descriptionOfTheSet =>
                this.setState({ descriptionOfTheSet })
              }
            />

            {rows}

            <View
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 10
              }}
            >
              <Button
                title="Dodaj słówka"
                buttonStyle={{ backgroundColor: "#4E046D" }}
                onPress={this.addNewWords}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerTitleText: {
    fontWeight: "700",
    fontSize: 20,
    color: "#fff"
  },
  container: {
    flex: 1,
    backgroundColor: "#5388d0"
  },
  scrollContainerInput: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    fontSize: 18,
    backgroundColor: "#fff"
  },
  wordsContainer: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 5
  },
  wordsContainerInput: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#5388d0",
    borderStyle: "solid"
  }
});
