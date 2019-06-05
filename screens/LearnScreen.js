import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";

export default class LearnScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsAndDefinitions: JSON.parse(this.props.wordsAndDefinitions),
      currentWordAndDefinition: JSON.parse(this.props.wordsAndDefinitions)[0],
      showHint: true
    };
  }

  checkIndexIsEven(n) {
    return n % 2 == 0;
  }

  render() {
    let cards = [];
    this.state.wordsAndDefinitions.forEach((wordsAndDefinition, index) => {
      cards.push(
        <Card
          key={index}
          style={[
            styles.card,
            {
              backgroundColor: this.checkIndexIsEven(index)
                ? "#FE474C"
                : "#FEB12C"
            }
          ]}
        >
          <Text style={styles.label}>{wordsAndDefinition.wordValue}</Text>
          <Text style={styles.label}>{wordsAndDefinition.definitionValue}</Text>
        </Card>
      );
    });

    return (
      <View style={styles.container}>
        {this.state.showHint ? (
          <View style={styles.header}>
            <Text>Przesuń kartę w prawo lub lewo</Text>
          </View>
        ) : null}

        <CardStack
          style={styles.content}
          renderNoMoreCards={() => (
            <View style={styles.noMoreCards}>
              <Text style={styles.noMoreCardsText}>Nie ma</Text>
              <Text style={styles.noMoreCardsText}>więcej kart :(</Text>
            </View>
          )}
          ref={swiper => {
            this.swiper = swiper;
          }}
          onSwiped={this.onSwiped}
          disableTopSwipe
          disableBottomSwipe
        >
          {cards}
        </CardStack>
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
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    flex: 7,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    width: 320,
    height: 470,
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)"
  },

  label: {
    lineHeight: 220,
    textAlign: "center",
    fontSize: 35,
    fontFamily: "System",
    color: "#ffffff",
    backgroundColor: "transparent"
  },
  noMoreCards: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  noMoreCardsText: {
    fontWeight: "700",
    fontSize: 36,
    color: "gray"
  }
});
