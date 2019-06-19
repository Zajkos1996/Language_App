import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar, Alert } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { Header } from "react-native-elements";
import { Navigation } from "react-native-navigation";

export default class LearnScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsAndDefinitions: JSON.parse(this.props.wordsAndDefinitions),
      currentWordAndDefinition: JSON.parse(this.props.wordsAndDefinitions)[0],
      showHint: true
    };
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

  checkIndexIsEven(n) {
    return n % 2 == 0;
  }

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
      <View style={{ flex: 1 }}>
        <Header
          centerComponent={{
            text: "Nauka",
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
          {this.state.showHint ? (
            <View style={styles.header}>
              <Text style={styles.headerTxt}>
                Przesuń kartę w prawo lub lewo
              </Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5388d0"
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headerTxt: {
    fontFamily: "Lato-Bold",
    color: "#fff"
  },
  content: {
    flex: 7,
    backgroundColor: "#5388d0",
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
    fontFamily: "Lato-Bold",
    color: "#fff",
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
    color: "#fff"
  },
  btnTitle: {
    color: "#fff"
  },
  btn: {
    borderColor: "#fff"
  }
});
