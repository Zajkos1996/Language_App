import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  StatusBar,
  Alert
} from "react-native";
import { Tile, Header } from "react-native-elements";
import { Navigation } from "react-native-navigation";
import SQLite from "react-native-sqlite-storage";

var db = SQLite.openDatabase({
  name: "md.db",
  createFromLocation: 1
});

export default class SetScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get("window").width,
      set: this.props.set,
      allSetsFromDb: []
    };
  }

  downloadDataFromDatabase = async () => {
    await db.transaction(tx => {
      tx.executeSql("SELECT * FROM sets;", [], (tx, results) => {
        let sets = [];
        for (let i = 0; i < results.rows.length; i++) {
          sets[i] = results.rows.item(i);
        }
        this.setState({ allSetsFromDb: sets });
      });
    });
  };

  async componentDidMount() {
    await this.downloadDataFromDatabase();
  }

  goToScreen = (screenName, wordsAndDefinitions, allSetsFromDb = "") => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        passProps: {
          wordsAndDefinitions,
          allSetsFromDb
        }
      }
    });
  };

  onDeleteIconPressed = () => {
    Alert.alert(
      "Usuń zestaw",
      "Czy na pewno chcesz usunąć ten zestaw?",
      [
        {
          text: "Nie"
        },
        { text: "Tak", onPress: () => this.deleteSetFromDb() }
      ],
      { cancelable: false }
    );
  };

  deleteSetFromDb = () => {
    let query = `DELETE FROM sets WHERE id = ${this.state.set.id}`;
    db.executeSql(query);
    Navigation.popToRoot(this.props.componentId);
  };

  onEditIconPressed = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "EditSetScreen",
        passProps: {
          id: this.state.set.id,
          name: this.state.set.name,
          desc: this.state.set.desc,
          wordsAndDefinitions: this.state.set.wordsAndDefinitions
        }
      }
    });
  };

  render() {
    const { wordsAndDefinitions } = this.state.set;
    let rows = [];
    JSON.parse(wordsAndDefinitions).forEach((wordAndDefinition, index) => {
      rows.push(
        <View key={index} style={styles.wordsContainer}>
          <View style={styles.topWordContainer}>
            <Text style={styles.topWordContainerText}>
              {wordAndDefinition.wordValue}{" "}
            </Text>
          </View>

          <View>
            <Text style={styles.bottomWordContainerText}>
              {wordAndDefinition.definitionValue}
            </Text>
          </View>
        </View>
      );
    });

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header
            leftComponent={{
              icon: "delete",
              color: "#fff",
              onPress: () => this.onDeleteIconPressed()
            }}
            centerComponent={{
              text: "Zestaw",
              style: styles.headerTitleText
            }}
            rightComponent={{
              icon: "edit",
              color: "#fff",
              onPress: () => this.onEditIconPressed()
            }}
            containerStyle={{
              backgroundColor: "#4E046D",
              marginTop: (StatusBar.currentHeight || 0) * -1
            }}
          />
          <ScrollView>
            <View
              style={{
                flex: 1,
                flexWrap: "wrap",
                flexDirection: "row"
              }}
            >
              <Tile
                width={this.state.width / 3}
                height={100}
                overlayContainerStyle={styles.tileContainer}
                icon={{
                  name: "grid",
                  type: "feather",
                  color: "#4E046D",
                  size: 38
                }}
                featured
                title="Abcd"
                titleStyle={styles.tileContainerText}
                onPress={() =>
                  this.goToScreen(
                    "ChoiceAbcdScreen",
                    this.props.set.wordsAndDefinitions,
                    this.state.allSetsFromDb
                  )
                }
              />
              <Tile
                width={this.state.width / 3}
                height={100}
                overlayContainerStyle={styles.tileContainer}
                icon={{
                  name: "switcher",
                  type: "antdesign",
                  color: "#4E046D",
                  size: 38
                }}
                featured
                title="Fiszki"
                titleStyle={styles.tileContainerText}
                onPress={() =>
                  this.goToScreen(
                    "FlashcardsScreen",
                    this.props.set.wordsAndDefinitions
                  )
                }
              />
              <Tile
                width={this.state.width / 3}
                height={100}
                overlayContainerStyle={styles.tileContainer}
                icon={{
                  name: "graduation-cap",
                  type: "font-awesome",
                  color: "#4E046D",
                  size: 40
                }}
                featured
                title="Test"
                titleStyle={styles.tileContainerText}
                onPress={() =>
                  this.goToScreen(
                    "TestScreen",
                    this.props.set.wordsAndDefinitions,
                    this.state.allSetsFromDb
                  )
                }
              />
              <Tile
                width={this.state.width / 2}
                height={100}
                overlayContainerStyle={styles.tileContainer}
                icon={{
                  name: "leanpub",
                  type: "font-awesome",
                  color: "#4E046D",
                  size: 38
                }}
                featured
                title="Ucz się"
                titleStyle={styles.tileContainerText}
                onPress={() =>
                  this.goToScreen(
                    "LearnScreen",
                    this.props.set.wordsAndDefinitions
                  )
                }
              />
              <Tile
                width={this.state.width / 2}
                height={100}
                overlayContainerStyle={styles.tileContainer}
                icon={{
                  name: "edit",
                  type: "font-awesome",
                  color: "#4E046D",
                  size: 38
                }}
                featured
                title="Pisanie"
                titleStyle={styles.tileContainerText}
                onPress={() =>
                  this.goToScreen(
                    "WritingScreen",
                    this.props.set.wordsAndDefinitions
                  )
                }
              />
            </View>
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
    justifyContent: "center",
    backgroundColor: "#5388d0",
    alignItems: "center"
  },
  wordsContainer: {
    padding: 10,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "#fff"
  },
  topWordContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    borderStyle: "solid"
  },
  topWordContainerText: {
    fontSize: 20,
    margin: 5,
    fontWeight: "500"
  },
  bottomWordContainerText: {
    fontSize: 20,
    margin: 5
  },
  tileContainer: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#4E046D",
    borderStyle: "solid"
  },
  tileContainerText: {
    color: "#4E046D",
    marginTop: 15
  }
});
