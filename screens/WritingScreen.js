import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";
import { Navigation } from "react-native-navigation";

export default class WritingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsAndDefinitions: JSON.parse(this.props.wordsAndDefinitions),
      userAnswer: "",
      currentWordAndDefinition: JSON.parse(this.props.wordsAndDefinitions)[0]
    };
  }

  goToScreen = screenName => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName
      }
    });
  };

  checkAnswer = () => {
    console.log(this.userInput);

    if (
      this.state.currentWordAndDefinition.definitionValue
        .trim()
        .toLowerCase() === this.state.userAnswer.trim().toLowerCase()
    ) {
      // correct answer
      console.log("correct");
    } else {
      // incorrect answer
      console.log("incorrect");
    }

    if (
      this.state.currentWordAndDefinition.id >=
      this.state.wordsAndDefinitions.length
    ) {
      // do ekranu wyniku
      this.goToScreen("MySetsScreen");
    }

    // nastepny pytanie
    this.changeNext();

    // czyszczenie inputa
    this.userInput.clear();
  };

  changeNext = () => {
    let currentId = this.state.currentWordAndDefinition.id - 1;
    if (currentId < this.state.wordsAndDefinitions.length - 1) {
      currentId++;
      this.setState({
        currentWordAndDefinition: this.state.wordsAndDefinitions[currentId]
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.txtWord}>
            {this.state.currentWordAndDefinition.wordValue}
          </Text>
        </View>

        <TextInput
          style={styles.txtInput}
          onChangeText={text => this.setState({ userAnswer: text })}
          ref={input => {
            this.userInput = input;
          }}
        />

        <TouchableOpacity onPress={this.checkAnswer} style={styles.btn}>
          <Text style={styles.textBtn}>Dalej</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  },
  txtWord: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20
  },
  txtInput: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    textAlign: "center",
    width: "90%",
    borderRadius: 5
  },
  btn: {
    width: "50%",
    padding: 10,
    borderColor: "deepskyblue",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "deepskyblue",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10
  },
  textBtn: {
    fontSize: 20,
    textAlign: "center"
  }
});
