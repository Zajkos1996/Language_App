import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";

export default class WritingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsAndDefinitions: JSON.parse(this.props.wordsAndDefinitions),
      userAnswer: "",
      questionId: 0,
      answeredQuestionCount: 0
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
    // destructuring

    console.log(
      "id pytania: " +
        this.state.questionId +
        " odpowiedz: " +
        this.state.userAnswer
    );

    this.state.wordsAndDefinitions.forEach(elem => console.log(elem));

    if (
      this.state.wordsAndDefinitions[this.state.questionId].definitionValue
        .trim()
        .toLowerCase() === this.state.userAnswer.trim().toLowerCase()
    ) {
      // correct answer
      console.log("correct");
      this.setState(state => {
        const wordsAndDefinitions = state.wordsAndDefinitions.filter(
          (item, j) => state.questionId !== j
        );

        return {
          wordsAndDefinitions
        };
      });
    } else {
      // incorrect answer
      console.log("incorrect");

      this.setState({
        questionId: this.state.questionId + 1
      });
    }

    if (
      this.state.questionId + 1 > this.state.wordsAndDefinitions.length &&
      this.state.wordsAndDefinitions.length > 0
    ) {
      this.setState({
        questionId: 0
      });
      return;
    }

    if (this.state.wordsAndDefinitions.length == 0) {
      // do ekranu wyniku
      this.goToScreen("MySetsScreen");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.welcome}>
            {this.state.wordsAndDefinitions[this.state.questionId].wordValue !==
            undefined
              ? this.state.wordsAndDefinitions[this.state.questionId].wordValue
              : null}
          </Text>
        </View>
        <View style={styles.tab}>
          <TextInput
            style={styles.txt}
            onChangeText={text => this.setState({ userAnswer: text })}
          />
        </View>
        <View style={styles.btn}>
          <TouchableOpacity>
            <Text style={styles.txt}>Nie wiem</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity onPress={this.checkAnswer}>
            <Text style={styles.txt}>Dalej</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 10
  },
  txt: {
    fontSize: 30,
    textAlign: "center",
    marginLeft: 15,
    marginRight: 15
  },
  tab: {
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    marginTop: 30,
    marginBottom: 30,
    textAlign: "center",
    width: "90%",
    borderRadius: 5
  },
  btn: {
    marginTop: 30,
    borderColor: "deepskyblue",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "deepskyblue",
    borderRadius: 5
  }
});
