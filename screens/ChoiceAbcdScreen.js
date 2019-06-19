import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar, Alert } from "react-native";
import { Navigation } from "react-native-navigation";
import { Header, Button } from "react-native-elements";

export default class ChoiceAbcdScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sets: this.props.allSetsFromDb,
      wordsAndDefinitions: JSON.parse(this.props.wordsAndDefinitions),
      questions: [],
      currQuestId: 0,
      currQuestPossibleAnswers: [],
      score: 0,
      messageToAnswer: "",
      isAnswered: false,
      isCorrectAnswer: false,
      btnPressedId: 0
    };
  }

  async componentDidMount() {
    await this.createQuestions();
    await this.createPossibleAnswers();
  }

  goToResultScreen = () => {
    Navigation.setStackRoot(this.props.componentId, [
      {
        component: {
          name: "ResultFromTestScreen",
          passProps: {
            score: this.state.score,
            availablePoints: this.state.wordsAndDefinitions.length,
            lastScreen: "ChoiceAbcdScreen",
            wordsAndDefinitions: this.state.wordsAndDefinitions,
            allSetsFromDb: this.state.sets
          }
        }
      }
    ]);
  };

  createPossibleAnswers = async () => {
    // Stworzenie mozliwych odpowiedzi, po pobraniu danych z bazy
    let possibleAnswers = [];
    this.state.sets.forEach(set => {
      let wordsAndDefinitions = JSON.parse(set.wordsAndDefinitions);
      wordsAndDefinitions.forEach(wordAndDefinition =>
        possibleAnswers.push(wordAndDefinition.definitionValue)
      );
    });

    let randomPossibleAnswers = [];
    while (randomPossibleAnswers.length < 3) {
      let max = possibleAnswers.length;
      let min = 0;
      let randomNumber = Math.floor(Math.random() * (max - min));
      if (!randomPossibleAnswers.includes(possibleAnswers[randomNumber])) {
        randomPossibleAnswers.push(possibleAnswers[randomNumber]);
        possibleAnswers.splice(randomNumber, 1);
      }
    }

    randomPossibleAnswers.push(
      this.state.questions[this.state.currQuestId].correctAnswer
    );

    this.shuffleAnswers(randomPossibleAnswers);

    await this.setState({ currQuestPossibleAnswers: randomPossibleAnswers });
  };

  // Pobranie słówek do pytań z konkretnego testu
  createQuestions = async () => {
    let questions = [];
    this.state.wordsAndDefinitions.forEach(wordAndDefinition => {
      let question = {
        questionTitle: wordAndDefinition.wordValue,
        correctAnswer: wordAndDefinition.definitionValue
      };
      questions = [...questions, question];
    });
    await this.setState({
      questions: questions
    });
  };

  // Mieszanie odpowiedzi
  shuffleAnswers = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  goToScreen = screenName => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName
      }
    });
  };

  countScore = async (answer, btnId) => {
    // checkAnswer
    if (answer === this.state.questions[this.state.currQuestId].correctAnswer) {
      await this.setState({
        score: this.state.score + 1,
        messageToAnswer: "Dobrze",
        isCorrectAnswer: true,
        isAnswered: true,
        btnPressedId: btnId
      });
    } else {
      await this.setState({
        messageToAnswer: "Źle",
        isCorrectAnswer: false,
        isAnswered: true,
        btnPressedId: btnId
      });
    }

    setTimeout(() => {
      if (this.state.currQuestId + 1 >= this.state.questions.length) {
        this.goToResultScreen("ResultFromTestScreen");
      } else {
        this.setState({
          messageToAnswer: "",
          isAnswered: false,
          isCorrectAnswer: false
        });
        this.changeQuestion();
      }
    }, 1100);
  };

  changeQuestion = async () => {
    await this.setState({
      currQuestId: this.state.currQuestId + 1
    });
    await this.createPossibleAnswers();
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
            Navigation.setStackRoot(this.props.componentId, [
              {
                component: {
                  name: "MySetsScreen"
                }
              }
            ]);
          }
        }
      ],
      { cancelable: false }
    );
  };

  getStyleForAnswerBtn = (isAnswered, isCorrectAnswer, buttonId) => {
    if (isAnswered && isCorrectAnswer && buttonId === this.state.btnPressedId) {
      return styles.ansCorrect;
    } else if (
      isAnswered &&
      !isCorrectAnswer &&
      buttonId === this.state.btnPressedId
    ) {
      return styles.ansIncorrect;
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          centerComponent={{
            text: "Abcd",
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
          <Text style={styles.questionText}>
            {this.state.questions[this.state.currQuestId]
              ? this.state.questions[this.state.currQuestId].questionTitle
              : null}
          </Text>

          <Button
            disabledStyle={this.getStyleForAnswerBtn(
              this.state.isAnswered,
              this.state.isCorrectAnswer,
              1
            )}
            type="outline"
            buttonStyle={styles.answerButton}
            titleStyle={styles.answerButtonText}
            title={this.state.currQuestPossibleAnswers[0]}
            disabled={this.state.isAnswered}
            onPress={() =>
              this.countScore(this.state.currQuestPossibleAnswers[0], 1)
            }
          />
          <Button
            disabledStyle={this.getStyleForAnswerBtn(
              this.state.isAnswered,
              this.state.isCorrectAnswer,
              2
            )}
            type="outline"
            buttonStyle={styles.answerButton}
            titleStyle={styles.answerButtonText}
            title={this.state.currQuestPossibleAnswers[1]}
            disabled={this.state.isAnswered}
            onPress={() =>
              this.countScore(this.state.currQuestPossibleAnswers[1], 2)
            }
          />
          <Button
            disabledStyle={this.getStyleForAnswerBtn(
              this.state.isAnswered,
              this.state.isCorrectAnswer,
              3
            )}
            type="outline"
            buttonStyle={styles.answerButton}
            titleStyle={styles.answerButtonText}
            title={this.state.currQuestPossibleAnswers[2]}
            disabled={this.state.isAnswered}
            onPress={() =>
              this.countScore(this.state.currQuestPossibleAnswers[2], 3)
            }
          />
          <Button
            disabledStyle={this.getStyleForAnswerBtn(
              this.state.isAnswered,
              this.state.isCorrectAnswer,
              4
            )}
            type="outline"
            buttonStyle={styles.answerButton}
            titleStyle={styles.answerButtonText}
            title={this.state.currQuestPossibleAnswers[3]}
            disabled={this.state.isAnswered}
            onPress={() =>
              this.countScore(this.state.currQuestPossibleAnswers[3], 4)
            }
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
    fontSize: 20,
    fontWeight: "700",
    color: "#fff"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#5388d0",
    padding: 10
  },
  questionId: {
    textAlign: "center",
    paddingBottom: 5,
    marginBottom: 30,
    alignItems: "center",
    borderRadius: 15,
    fontSize: 30
  },
  questionText: {
    fontSize: 48,
    textAlign: "center",
    marginVertical: 15,
    color: "#fff",
    fontFamily: "Lato-Bold"
  },
  answerButton: {
    width: "100%",
    backgroundColor: "#fff",
    marginVertical: 1
  },
  answerButtonText: {
    fontSize: 20,
    fontFamily: "Lato-Bold"
  },
  messageToAnswer: {
    fontSize: 40,
    textAlign: "center",
    marginVertical: 15,
    color: "#fff",
    fontFamily: "Lato-Bold"
  },
  ansCorrect: {
    width: "100%",
    marginVertical: 1,
    backgroundColor: "#0ffc73",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#0ffc73"
  },
  ansIncorrect: {
    width: "100%",
    marginVertical: 1,
    backgroundColor: "#B71C0C",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#B71C0C"
  }
});
