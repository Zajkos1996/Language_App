import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";

export default class Writing extends Component {
  constructor(props) {
    super(props);
    this.state = { concept: "" };
    this.state = { definition: "" };
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.welcome}>Computer</Text>
        </View>
        <View style={styles.tab}>
          <TextInput
            style={styles.txt}
            onChangeText={definition => this.setState({ definition })}
          />
        </View>
        <View style={styles.btn}>
          <TouchableOpacity>
            <Text style={styles.txt}>Nie wiem</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity>
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
