import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";

export default class CreateNewSet extends Component {
  constructor(props) {
    super(props);
    this.state = { nameOfTheSet: "" };
    this.state = { descriptionOfTheSet: "" };
    this.state = { concept: "" };
    this.state = { definition: "" };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text
            style={{
              marginTop: 20,
              fontSize: 20,
              margin: 10,
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            Stwórz zestaw
          </Text>
          <Text style={styles.welcome}>Nazwa zestawu: </Text>
          <TextInput
            style={styles.text}
            placeholder="Nazwa zestawu"
            onChangeText={nameOfTheSet => this.setState({ nameOfTheSet })}
          />
          {/*<Text style={{padding: 10, fontSize: 42}}>*/}
          {/*{this.state.value.split(' ').map((word) => word && '⚽').join(' ')}*/}
          {/*</Text>*/}
          <Text style={styles.welcome}>Opis zestawu: </Text>
          <TextInput
            style={styles.text}
            placeholder="Opis zestawu"
            onChangeText={descriptionOfTheSet =>
              this.setState({ descriptionOfTheSet })
            }
          />
          <Text style={styles.welcome}>Fiszki: </Text>
          <View style={styles.tablica}>
            <Text style={styles.welcome}>Pojęcie: </Text>
            <TextInput
              style={styles.text}
              onChangeText={concept => this.setState({ concept })}
            />
            <Text style={styles.welcome}>Definicja: </Text>
            <TextInput
              style={styles.text}
              onChangeText={definition => this.setState({ definition })}
            />
          </View>
          <View style={styles.tablica}>
            <Text style={styles.welcome}>Pojęcie: </Text>
            <TextInput
              style={styles.text}
              onChangeText={concept => this.setState({ concept })}
            />
            <Text style={styles.welcome}>Definicja: </Text>
            <TextInput
              style={styles.text}
              onChangeText={definition => this.setState({ definition })}
            />
          </View>
          <View style={styles.tablica}>
            <Text style={styles.welcome}>Pojęcie: </Text>
            <TextInput
              style={styles.text}
              onChangeText={concept => this.setState({ concept })}
            />
            <Text style={styles.welcome}>Definicja: </Text>
            <TextInput
              style={styles.text}
              onChangeText={definition => this.setState({ definition })}
            />
          </View>
          <View style={styles.tablica}>
            <Text style={styles.welcome}>Pojęcie: </Text>
            <TextInput
              style={styles.text}
              onChangeText={concept => this.setState({ concept })}
            />
            <Text style={styles.welcome}>Definicja: </Text>
            <TextInput
              style={styles.text}
              onChangeText={definition => this.setState({ definition })}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    alignItems: "center"
  },
  welcome: {
    marginTop: 5,
    fontSize: 20,
    margin: 10,
    fontWeight: "bold"
  },
  text: {
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    width: 350,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black"
  },
  tablica: {
    paddingTop: 10,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    margin: 10,
    backgroundColor: "silver"
  }
});
