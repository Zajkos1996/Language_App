import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import SQLite from "react-native-sqlite-storage";
import { Navigation } from "react-native-navigation";

var db = SQLite.openDatabase({
  name: "md.db",
  createFromLocation: 1
});

export default class ChoiceAbcdScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sets: [],
      wordsAndDefinitions: JSON.parse(this.props.wordsAndDefinitions),
      questions: [],
      currQuestId: 0,
      currQuestPossibleAnswers: [],
      score: 0
    };
  }

  downloadDataFromDatabase = async () => {
    await db.transaction(tx => {
      tx.executeSql("SELECT * FROM sets;", [], (tx, results) => {
        let sets = [];
        for (let i = 0; i < results.rows.length; i++) {
          sets[i] = results.rows.item(i);
        }
        this.setState({ sets: sets });
        this.createQuestions();
        this.createPossibleAnswers();
      });
    });
  };

  async componentDidMount() {
    await this.downloadDataFromDatabase();
  }

  createPossibleAnswers = () => {
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

    randomPossibleAnswers.push(
      this.state.questions[this.state.currQuestId].correctAnswer
    );

    this.shuffleAnswers(randomPossibleAnswers);

    this.setState({ currQuestPossibleAnswers: randomPossibleAnswers });
  };

  // Pobranie słówek do pytań z konkretnego testu
  createQuestions = () => {
    let questions = [];
    this.state.wordsAndDefinitions.forEach(wordAndDefinition => {
      let question = {
        questionTitle: wordAndDefinition.wordValue,
        correctAnswer: wordAndDefinition.definitionValue
      };
      questions = [...questions, question];
    });
    this.setState({
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

  countScore = answer => {
    // checkAnswer
    if (answer === this.state.questions[this.state.currQuestId].correctAnswer) {
      this.setState({
        score: this.state.score + 1
      });
    } else {
    }

    if (this.state.currQuestId + 1 >= this.state.questions.length) {
      this.goToScreen("App");
    } else {
      //change question
      this.setState({
        currQuestId: ++this.state.currQuestId
      });
      this.createPossibleAnswers();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.questionText}>
          {this.state.questions[this.state.currQuestId]
            ? this.state.questions[this.state.currQuestId].questionTitle
            : null}
        </Text>

        <TouchableOpacity
          style={styles.answerButton}
          onPress={() =>
            this.countScore(this.state.currQuestPossibleAnswers[0])
          }
        >
          <Text style={styles.answerText}>
            {this.state.currQuestPossibleAnswers[0]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.answerButton}
          onPress={() =>
            this.countScore(this.state.currQuestPossibleAnswers[1])
          }
        >
          <Text style={styles.answerText}>
            {this.state.currQuestPossibleAnswers[1]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.answerButton}
          onPress={() =>
            this.countScore(this.state.currQuestPossibleAnswers[2])
          }
        >
          <Text style={styles.answerText}>
            {this.state.currQuestPossibleAnswers[2]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.answerButton}
          onPress={() =>
            this.countScore(this.state.currQuestPossibleAnswers[2])
          }
        >
          <Text style={styles.answerText}>
            {this.state.currQuestPossibleAnswers[3]}
          </Text>
        </TouchableOpacity>
        <Text style={styles.answerText}>{this.state.score}</Text>
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
    textAlign: "center",
    marginBottom: 20,
    fontSize: 30
  },
  answerButton: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    width: "95%",
    margin: 2,
    backgroundColor: "deepskyblue",
    alignItems: "center",
    borderRadius: 15
  },
  answerText: {
    textAlign: "center",
    fontSize: 20
  }
});
