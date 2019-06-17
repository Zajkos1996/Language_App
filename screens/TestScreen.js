import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { Navigation } from "react-native-navigation";

export default class TestScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sets: this.props.allSetsFromDb,
      wordsAndDefinitions: JSON.parse(this.props.wordsAndDefinitions),
      questionsAbcd: [],
      rowsAbcd: [],
      questionsWriting: [],
      rowsWriting: [],
      ansFromWriting: ["", "", "", "", ""],
      score: 0,
      ansButtonsDisabled: [false, false, false, false, false]
    };
  }

  goToResultScreen = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "ResultFromTestScreen",
        passProps: {
          score: this.state.score,
          availablePoints: 10,
          lastScreen: "TestScreen",
          wordsAndDefinitions: this.state.wordsAndDefinitions,
          allSetsFromDb: this.state.sets
        }
      }
    });
  };

  componentDidMount = async () => {
    // wygenerowanie losowych pytań
    let questionsAbcd = this.createAbcdQuestions();
    let questionsWriting = this.createAbcdQuestions();
    await this.setState({
      questionsAbcd: questionsAbcd,
      questionsWriting: questionsWriting
    });

    // stworzenie rzędów pytań abcd
    let rowsAbcd = [];
    this.state.questionsAbcd.forEach((question, index) => {
      rowsAbcd.push(this.renderSingleAbcdChoice(question, index));
    });

    // stworzenie rzedow pytań do wpisania
    let rowsWriting = this.renderWriting();
    await this.setState({ rowsAbcd: rowsAbcd, rowsWriting: rowsWriting });
  };

  // Tworzy pytania do wyboru ABCD
  createAbcdQuestions = () => {
    let questions = [];
    for (let i = 0; i < this.state.wordsAndDefinitions.length; i++) {
      let question = {
        questionTitle: this.state.wordsAndDefinitions[i].wordValue,
        correctAnswer: this.state.wordsAndDefinitions[i].definitionValue
      };
      questions = [...questions, question];
    }

    let randomQuestions = [];
    for (let i = 0; i < 5; i++) {
      let max = questions.length;
      let min = 0;
      let randomNumber = Math.floor(Math.random() * (max - min));
      randomQuestions.push(questions[randomNumber]);

      questions.splice(randomNumber, 1);
    }
    this.shuffleArray(randomQuestions);

    return randomQuestions;
  };

  createAbcdPossibleAnswers = correctAnswer => {
    // Stworzenie mozliwych odpowiedzi, po pobraniu danych z bazy
    let possibleAnswers = [];
    this.state.sets.forEach(set => {
      let wordsAndDefinitions = JSON.parse(set.wordsAndDefinitions);
      wordsAndDefinitions.forEach(wordAndDefinition =>
        possibleAnswers.push(wordAndDefinition.definitionValue)
      );
    });

    let randomPossibleAnswers = [];
    for (let i = 0; i < 3; i++) {
      let max = possibleAnswers.length;
      let min = 0;
      let randomNumber = Math.floor(Math.random() * (max - min));
      randomPossibleAnswers.push(possibleAnswers[randomNumber]);
      possibleAnswers.splice(randomNumber, 1);
    }

    randomPossibleAnswers.push(correctAnswer);

    this.shuffleArray(randomPossibleAnswers);

    return randomPossibleAnswers;
  };

  renderSingleAbcdChoice = (question, questionId) => {
    let rows = [];

    generatedPossAnswers = this.createAbcdPossibleAnswers(
      question.correctAnswer
    );

    generatedPossAnswers.forEach((ans, index) => {
      if (index === 0) {
        rows.push(
          <Text style={styles.txtQuestion}>{question.questionTitle}</Text>
        );
      }

      rows.push(
        <Button
          title={ans}
          type="outline"
          onPress={() =>
            this.countScoreFromAbcdChoice(
              question.correctAnswer,
              ans,
              questionId
            )
          }
          disabled={this.state.ansButtonsDisabled[questionId]}
        />
      );
    });

    return rows;
  };

  renderWriting = () => {
    let rows = [];
    this.state.questionsWriting.forEach((question, index) => {
      rows.push(
        <View key={index}>
          <Text style={styles.txtQuestion}>{question.questionTitle}</Text>

          <TextInput
            style={styles.txtInput}
            onChangeText={text => {
              let copyOfState = this.state.ansFromWriting;
              copyOfState[index] = text;
              this.setState({ ansFromWriting: copyOfState });
            }}
          />
        </View>
      );
    });
    return rows;
  };

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  countScoreFromAbcdChoice = async (correctAnswer, userAnswer, questionId) => {
    if (userAnswer === correctAnswer) {
      this.setState({ score: this.state.score + 1 });
    }

    // Wyłącz przyciski
    let copyOfState = this.state.ansButtonsDisabled;
    copyOfState[questionId] = true;
    await this.setState({
      ansButtonsDisabled: copyOfState
    });
  };

  countScoreFromWriting = async () => {
    let points = 0;
    this.state.questionsWriting.forEach((question, index) => {
      if (
        question.correctAnswer.trim().toLowerCase() ===
        this.state.ansFromWriting[index].trim().toLowerCase()
      ) {
        points++;
      }
    });
    await this.setState({
      score: this.state.score + points
    });
  };

  onFinishTest = async () => {
    await this.countScoreFromWriting();
    this.goToResultScreen();
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.questionHeader}>
            <Text style={styles.txtTaskTitle}>
              1. Wybierz poprawną odpowiedź
            </Text>
          </View>

          {this.state.rowsAbcd}
          <View style={styles.questionHeader}>
            <Text style={styles.txtTaskTitle}>2. Wpisz poprawną odpowiedź</Text>
          </View>
          {this.state.rowsWriting}
          <Button title="Zakończ test" onPress={this.onFinishTest} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  scrollContainer: {
    paddingHorizontal: 20
  },
  questionHeader: {
    marginVertical: 10
  },
  txtTaskTitle: {
    fontSize: 16,
    marginBottom: 10
  },
  txtQuestion: {
    textAlign: "center",
    fontSize: 24,
    marginTop: 15,
    marginBottom: 10
  },
  txtInput: {
    fontSize: 24,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#5388d0",
    borderStyle: "solid",
    textAlign: "center",
    borderRadius: 5
  }
});
