import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import FlipCard from "react-native-card-flip";
import { Button, Icon } from "react-native-elements";

export default class FlashcardsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsAndDefinitions: JSON.parse(this.props.wordsAndDefinitions),
      currentWordAndDefinition: JSON.parse(this.props.wordsAndDefinitions)[0]
    };
  }

  changeNext = () => {
    let currentId = this.state.currentWordAndDefinition.id - 1;
    if (currentId < this.state.wordsAndDefinitions.length - 1) {
      currentId++;
      this.setState({
        currentWordAndDefinition: this.state.wordsAndDefinitions[currentId]
      });
    }
  };

  changePrevious = () => {
    let currentId = this.state.currentWordAndDefinition.id - 1;
    if (currentId > 0) {
      currentId--;
      this.setState({
        currentWordAndDefinition: this.state.wordsAndDefinitions[currentId]
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <FlipCard style={styles.cardContainer} ref={card => (this.card = card)}>
          <TouchableOpacity
            style={styles.cardFront}
            onPress={() => this.card.flip()}
          >
            <Text style={styles.cardText}>
              {this.state.currentWordAndDefinition.wordValue}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardBack}
            onPress={() => this.card.flip()}
          >
            <Text style={styles.cardText}>
              {this.state.currentWordAndDefinition.definitionValue}
            </Text>
          </TouchableOpacity>
        </FlipCard>

        <View style={styles.buttonsContainer}>
          <Icon
            raised
            name="arrow-left"
            type="font-awesome"
            color="#841584"
            onPress={this.changePrevious}
          />
          <Icon
            raised
            name="arrow-right"
            type="font-awesome"
            color="#841584"
            onPress={this.changeNext}
          />
        </View>
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
  cardText: {
    fontSize: 54,
    color: "#fff"
  },
  cardFront: {
    width: "100%",
    height: "85%",
    backgroundColor: "#FE474C",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  cardBack: {
    width: "100%",
    height: "85%",
    backgroundColor: "#32CD32",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  cardContainer: {
    position: "absolute",
    left: 5,
    right: 5,
    top: 15,
    bottom: 5
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 5,
    flexDirection: "row",
    justifyContent: "center"
  }
});
