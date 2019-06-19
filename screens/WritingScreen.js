import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  Alert
} from "react-native";
import { Navigation } from "react-native-navigation";
import { Button, Header } from "react-native-elements";

export default class WritingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsAndDefinitions: JSON.parse(this.props.wordsAndDefinitions),
      userAnswer: "",
      currentWordAndDefinition: JSON.parse(this.props.wordsAndDefinitions)[0],
      isCorrectAnswer: false,
      isAnswered: false,
      messageToAnswer: "",
      score: 0
    };
  }

  goToResultScreen = () => {
    Navigation.setStackRoot(this.props.componentId, [
      {
        component: {
          name: "ResultFromTestScreen",
          passProps: {
            score: this.state.score,
            availablePoints: this.state.wordsAndDefinitions.length,
            lastScreen: "WritingScreen",
            wordsAndDefinitions: this.state.wordsAndDefinitions,
            allSetsFromDb: this.state.sets
          }
        }
      }
    ]);
  };

  checkAnswer = async () => {
    if (
      this.state.currentWordAndDefinition.definitionValue
        .trim()
        .toLowerCase() === this.state.userAnswer.trim().toLowerCase()
    ) {
      await this.setState({
        isCorrectAnswer: true,
        messageToAnswer: "Dobrze!",
        score: this.state.score + 1
      });
    } else {
      await this.setState({ isCorrectAnswer: false, messageToAnswer: "Źle!" });
    }
    await this.setState({ isAnswered: true });

    setTimeout(() => {
      if (
        this.state.currentWordAndDefinition.id >=
        this.state.wordsAndDefinitions.length
      ) {
        this.goToResultScreen("ResultFromTestScreen");
      }

      this.changeNext();

      this.userInput.clear();

      this.setState({
        isCorrectAnswer: false,
        isAnswered: false,
        messageToAnswer: ""
      });
    }, 1100);
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

  onExit = () => {
    Alert.alert(
      "Pisanie",
      "Czy na pewno chcesz przerwać naukę?",
      [
        {
          text: "Nie"
        },
        {
          text: "Tak",
          onPress: () => {
            Navigation.popToRoot(this.props.componentId);
          }
        }
      ],
      { cancelable: false }
    );
  };

  getStyleForAnswerInput = (isAnswered, isCorrectAnswer) => {
    if (isAnswered && isCorrectAnswer) {
      return styles.textInputCorrect;
    } else if (isAnswered && !isCorrectAnswer) {
      return styles.textInputIncorrect;
    } else {
      return styles.textInput;
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          centerComponent={{
            text: "Pisanie",
            style: styles.headerTitleText
          }}
          rightComponent={{
            icon: "clear",
            color: "#fff",
            onPress: () => this.onExit()
          }}
          containerStyle={{
            backgroundColor: "#4E046D",
            marginTop: (StatusBar.currentHeight || 0) * -1
          }}
        />
        <View style={styles.container}>
          <View>
            <Text style={styles.wordTxt}>
              {this.state.currentWordAndDefinition.wordValue}
            </Text>
          </View>

          <TextInput
            style={this.getStyleForAnswerInput(
              this.state.isAnswered,
              this.state.isCorrectAnswer
            )}
            onChangeText={text => this.setState({ userAnswer: text })}
            ref={input => {
              this.userInput = input;
            }}
          />

          <Button
            title="Dalej"
            disabled={this.state.isAnswered}
            onPress={this.checkAnswer}
            buttonStyle={{
              backgroundColor: "#4E046D",
              paddingHorizontal: 30,
              fontFamily: "Lato-Bold"
            }}
          />

          <Text style={styles.messageToAnswer}>
            {this.state.messageToAnswer}
          </Text>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5388d0"
  },
  messageToAnswer: {
    fontSize: 40,
    textAlign: "center",
    marginVertical: 15,
    color: "#fff",
    fontFamily: "Lato-Bold"
  },
  wordTxt: {
    fontSize: 48,
    textAlign: "center",
    marginVertical: 15,
    color: "#fff",
    fontFamily: "Lato-Bold"
  },
  textInput: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
    textAlign: "center",
    width: "90%",
    borderRadius: 5,
    backgroundColor: "#fff",
    fontFamily: "Lato-Regular"
  },
  textInputCorrect: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
    textAlign: "center",
    width: "90%",
    borderRadius: 5,
    backgroundColor: "#2ECC71",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#2ECC71",
    fontFamily: "Lato-Regular"
  },
  textInputIncorrect: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
    textAlign: "center",
    width: "90%",
    borderRadius: 5,
    backgroundColor: "#B71C0C",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#B71C0C",
    fontFamily: "Lato-Regular"
  }
});
