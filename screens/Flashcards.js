import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import FlipCard from "react-native-card-flip";

export default class Flashcards extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlipCard style={styles.cardContainer} ref={card => (this.card = card)}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => this.card.flip()}
          >
            <Text style={styles.welcome1}>Komputer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card1}
            onPress={() => this.card.flip()}
          >
            <Text style={styles.welcome1}>Computer</Text>
          </TouchableOpacity>
        </FlipCard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  welcome1: {
    fontSize: 40,
    textAlign: "center",
    marginTop: "30%"
  },
  card: {
    width: "100%",
    height: "50%",
    backgroundColor: "#FE474C",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)"
  },
  card1: {
    width: "100%",
    height: "50%",
    backgroundColor: "#32CD32",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)"
  },
  cardContainer: {
    flex: 1,
    position: "absolute",
    left: 5,
    right: 5,
    bottom: 5,
    top: 5
  },
  face: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  back: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
