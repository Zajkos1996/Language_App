import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { Navigation } from "react-native-navigation";

export default class ResultFromTestScreen extends Component {
  constructor(props) {
    super(props);
  }

  goToScreen = (screenName, wordsAndDefinitions = "", allSetsFromDb = "") => {
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <Text style={styles.title}>Twój wynik to</Text>
          <Text style={styles.points}>
            {this.props.score} / {this.props.availablePoints}{" "}
          </Text>
          <Text style={styles.title}>punktów</Text>
        </View>
        <View style={styles.containerBottom}>
          <Button
            title="Rozwiąż ponownie"
            titleStyle={styles.btnTitle}
            buttonStyle={styles.btn}
            type="outline"
            onPress={() =>
              this.goToScreen(
                this.props.lastScreen,
                JSON.stringify(this.props.wordsAndDefinitions),
                this.props.allSetsFromDb
              )
            }
          />
          <Button
            title="Innym razem"
            titleStyle={styles.btnTitle}
            buttonStyle={styles.btn}
            type="outline"
            onPress={() => this.goToScreen("MySetsScreen")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5388d0"
  },
  containerTop: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  containerBottom: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  title: {
    fontSize: 36,
    color: "#fff",
    fontFamily: "Lato-Regular"
  },
  points: {
    color: "#fff",
    fontSize: 48,
    fontFamily: "Lato-Bold",
    marginVertical: 20
  },
  btnTitle: {
    color: "#fff",
    fontFamily: "Lato-Bold"
  },
  btn: {
    borderColor: "#fff"
  }
});
