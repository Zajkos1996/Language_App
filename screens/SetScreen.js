import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { Tile } from "react-native-elements";
import { Navigation } from "react-native-navigation";

export default class SetScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get("window").width,
      set: this.props.set
    };
  }

  goToScreen = (screenName, wordsAndDefinitions) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        passProps: {
          wordsAndDefinitions
        }
      }
    });
  };

  render() {
    const { wordsAndDefinitions } = this.state.set;
    let rows = [];
    JSON.parse(wordsAndDefinitions).forEach((wordAndDefinition, index) => {
      rows.push(
        <View key={index} style={styles.tablica}>
          <Text style={styles.welcome}>{wordAndDefinition.wordValue} </Text>
          <Text style={styles.welcome}>
            {wordAndDefinition.definitionValue}
          </Text>
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text
            style={{
              marginTop: 20,
              fontSize: 20,
              margin: 10,
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            Zestaw
          </Text>
          <View
            style={{
              flex: 1,
              flexWrap: "wrap",
              flexDirection: "row"
            }}
          >
            <Tile
              width={this.state.width / 2}
              height={125}
              imageSrc={require("../img/zdj.png")}
              featured
              title="Wybór Abcd"
              onPress={() =>
                this.goToScreen(
                  "ChoiceAbcdScreen",
                  this.props.set.wordsAndDefinitions
                )
              }
            />
            <Tile
              width={this.state.width / 2}
              height={125}
              imageSrc={require("../img/zdj.png")}
              featured
              title="Fiszki"
              onPress={() =>
                this.goToScreen(
                  "FlashcardsScreen",
                  this.props.set.wordsAndDefinitions
                )
              }
            />
            <Tile
              width={this.state.width / 2}
              height={125}
              imageSrc={require("../img/zdj.png")}
              featured
              title="Pisanie"
              onPress={() =>
                this.goToScreen(
                  "WritingScreen",
                  this.props.set.wordsAndDefinitions
                )
              }
            />
            <Tile
              width={this.state.width / 2}
              height={125}
              imageSrc={require("../img/zdj.png")}
              featured
              title="Test"
              onPress={() => this.goToScreen("TestScreen")}
            />
          </View>
          {rows}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    alignItems: "center"
  },
  welcome: {
    fontSize: 20,
    margin: 5,
    fontWeight: "bold"
  },

  tablica: {
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    margin: 10,
    backgroundColor: "silver"
  },
  text: {
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    width: 350,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
    fontSize: 20
  }
});
