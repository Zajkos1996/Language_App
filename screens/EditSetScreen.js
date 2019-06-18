import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  StatusBar
} from "react-native";
import { Navigation } from "react-native-navigation";
import SQLite from "react-native-sqlite-storage";
import { Header } from "react-native-elements";

var db = SQLite.openDatabase({
  name: "md.db",
  createFromLocation: 1
});

export default class EditSetScreen extends Component {
  state = {
    id: this.props.id,
    name: this.props.name,
    desc: this.props.desc,
    wordsAndDefinitions: JSON.parse(this.props.wordsAndDefinitions),
    rows: []
  };

  componentDidMount() {
    this.renderRows();
  }

  updateSetInDatabase = () => {
    const query = `UPDATE sets SET name = '${this.state.name}', desc = '${
      this.state.desc
    }', wordsAndDefinitions = '${JSON.stringify(
      this.state.wordsAndDefinitions
    )}' WHERE id = ${this.state.id}`;
    return db.executeSql(query);
  };

  onSaveIconPressed = async () => {
    await this.updateSetInDatabase();
    await Navigation.setStackRoot(this.props.componentId, [
      {
        component: {
          name: "MySetsScreen"
        }
      }
    ]);
  };

  renderRows = () => {
    let rows = [];
    for (let i = 0; i < this.state.wordsAndDefinitions.length; i++) {
      rows.push(
        <View style={styles.wordsContainer} key={i}>
          <View
            style={{ display: "flex", alignItems: "flex-end", marginRight: 10 }}
          />
          <TextInput
            style={styles.wordsContainerInput}
            defaultValue={this.state.wordsAndDefinitions[i].wordValue}
            placeholder="pojęcie"
            onChangeText={word => {
              let copyOfState = this.state.wordsAndDefinitions;
              copyOfState[i].wordValue = word;
              this.setState({ wordsAndDefinitions: copyOfState });
            }}
          />

          <TextInput
            style={styles.wordsContainerInput}
            defaultValue={this.state.wordsAndDefinitions[i].definitionValue}
            placeholder="definicja"
            onChangeText={definition => {
              let copyOfState = this.state.wordsAndDefinitions;
              copyOfState[i].definitionValue = definition;
              this.setState({ wordsAndDefinitions: copyOfState });
            }}
          />
        </View>
      );
    }

    this.setState({ rows: rows });
  };

  render() {
    const { rows } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header
            centerComponent={{
              text: "Edytuj zestaw",
              style: styles.headerTitleText
            }}
            rightComponent={{
              icon: "check",
              color: "#fff",
              onPress: () => this.onSaveIconPressed()
            }}
            containerStyle={{
              backgroundColor: "#4E046D",
              marginTop: (StatusBar.currentHeight || 0) * -1
            }}
          />
          <ScrollView style={styles.scrollContainer}>
            <TextInput
              style={styles.scrollContainerInput}
              defaultValue={this.state.name}
              placeholder="Nazwa zestawu"
              onChangeText={name => this.setState({ name })}
            />

            <TextInput
              style={styles.scrollContainerInput}
              defaultValue={this.state.desc}
              placeholder="Opis zestawu"
              onChangeText={desc => this.setState({ desc })}
            />

            {rows}
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
    padding: 10,
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
