import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { Navigation } from "react-native-navigation";
import { Tile } from "react-native-elements";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get("window").width
    };
  }

  goToScreen = screenName => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName
      }
    });
  };

  render() {
    const { width } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexWrap: "wrap",
              flexDirection: "row"
            }}
          >
            <Tile
              width={width / 2}
              // containerStyle={{marginTop: 5}}
              imageSrc={require("./img/zdj.png")}
              featured
              title="TWOJE ZESTAWY"
              onPress={() => this.goToScreen("MySets")}
            />
            <Tile
              width={width / 2}
              // containerStyle={{marginTop: 5}}
              imageSrc={require("./img/zdj.png")}
              featured
              title="UTWÓRZ NOWY ZESTAW"
              onPress={() => this.goToScreen("CreateNewSet")}
            />
            <Tile
              width={width / 2}
              // containerStyle={{marginTop: 5 }}
              imageSrc={require("./img/zdj.png")}
              featured
              title="UCZ SIĘ"
              onPress={() => this.goToScreen("Learn")}
            />
            <Tile
              width={width / 2}
              // containerStyle={{marginTop: 5}}
              imageSrc={require("./img/zdj.png")}
              featured
              title="FISZKI"
              onPress={() => this.goToScreen("Flashcards")}
            />
            <Tile
              width={width / 2}
              // containerStyle={{marginTop: 5}}
              imageSrc={require("./img/zdj.png")}
              featured
              title="PISANIE"
              onPress={() => this.goToScreen("Writing")}
            />
            <Tile
              width={width / 2}
              // containerStyle={{marginTop: 5}}
              imageSrc={require("./img/zdj.png")}
              featured
              title="WYBÓR ABCD"
              onPress={() => this.goToScreen("ChoiceAbcd")}
            />
            <Tile
              width={width / 2}
              // containerStyle={{marginTop: 5}}
              imageSrc={require("./img/zdj.png")}
              featured
              title="TEST"
              onPress={() => this.goToScreen("Test")}
            />
            <Tile
              width={width / 2}
              // containerStyle={{marginTop: 5}}
              imageSrc={require("./img/zdj.png")}
              featured
              title="USTAWIENIA"
              onPress={() => this.goToScreen("Settings")}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    flexDirection: "row"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
