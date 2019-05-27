import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";

export default class Learn extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Learn</Text>
        <CardStack
          style={styles.content}
          renderNoMoreCards={() => (
            <Text style={{ fontWeight: "700", fontSize: 40, color: "gray" }}>
              No more cards :(
            </Text>
          )}
          ref={swiper => {
            this.swiper = swiper;
          }}
          onSwiped={() => console.log("onSwiped")}
          onSwipedLeft={() => console.log("onSwipedLeft")}
        >
          <Card style={[styles.card, styles.card1]}>
            <Text style={styles.label}>Computer</Text>
            <Text style={styles.label}>Computer</Text>
          </Card>
          <Card
            style={[styles.card, styles.card2]}
            onSwipedLeft={() => alert("onSwipedLeft")}
          >
            <Text style={styles.label}>Computer</Text>
            <Text style={styles.label}>Computer</Text>
          </Card>
          <Card style={[styles.card, styles.card1]}>
            <Text style={styles.label}>Computer</Text>
            <Text style={styles.label}>Computer</Text>
          </Card>
          <Card style={[styles.card, styles.card2]}>
            <Text style={styles.label}>Computer</Text>
            <Text style={styles.label}>Computer</Text>
          </Card>
          <Card style={[styles.card, styles.card1]}>
            <Text style={styles.label}>Computer</Text>
            <Text style={styles.label}>Computer</Text>
          </Card>
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
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  content: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    width: 350,
    height: 450,
    backgroundColor: "#FE474C",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)"
    // shadowOffset: {
    //     width: 0,
    //     height: 1
    // },
    // shadowOpacity:0.5,
  },
  card1: {
    backgroundColor: "#FE474C"
  },
  card2: {
    backgroundColor: "#FEB12C"
  },
  label: {
    lineHeight: 220,
    textAlign: "center",
    fontSize: 35,
    fontFamily: "System",
    color: "#ffffff",
    backgroundColor: "transparent"
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    shadowOpacity: 0.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0
  }
});
