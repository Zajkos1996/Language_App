import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from "react-native";
import { Navigation } from "react-native-navigation";
import SQLite from "react-native-sqlite-storage";
import { Header } from "react-native-elements";
import SplashScreen from "react-native-splash-screen";

var db = SQLite.openDatabase({
  name: "md.db",
  createFromLocation: 1
});

export default class MySetsScreen extends Component {
  state = {
    sets: []
  };

  goToScreen = (screenName, set) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        passProps: {
          set,
          allSetsFromDb: this.state.sets
        }
      }
    });
  };

  downloadDataFromDatabase() {
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM sets;", [], (tx, results) => {
        var sets = [];
        for (let i = 0; i < results.rows.length; i++) {
          sets[i] = results.rows.item(i);
        }
        this.setState({ sets: sets });
      });
    });
  }

  async componentDidMount() {
    await this.downloadDataFromDatabase();
    SplashScreen.hide();
  }

  renderSets = () => {
    let rows = [];

    this.state.sets.forEach((set, index) => {
      rows.push(
        <TouchableOpacity
          key={index}
          style={styles.setContainer}
          onPress={() => this.goToScreen("SetScreen", set)}
        >
          <View style={styles.setContainerTitle}>
            <Text style={styles.setContainerTitleTxt}>{set.name}</Text>
          </View>
          <View style={styles.setContainerDesc}>
            <Text style={styles.setContainerDesc1}>
              {JSON.parse(set.wordsAndDefinitions).length} pojęć
            </Text>
            <Text style={styles.setContainerDesc2}>{set.desc}</Text>
          </View>
        </TouchableOpacity>
      );
    });
    return rows;
  };

  onAddIconPressed = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "CreateNewSetScreen"
      }
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          centerComponent={{
            text: "Twoje zestawy",
            style: styles.headerTitleText
          }}
          rightComponent={{
            icon: "add",
            color: "#fff",
            onPress: () => this.onAddIconPressed()
          }}
          containerStyle={{
            backgroundColor: "#4E046D",
            marginTop: (StatusBar.currentHeight || 0) * -1
          }}
        />
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {this.renderSets()}
          </ScrollView>
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
    backgroundColor: "#5388d0"
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  setContainer: {
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff"
  },
  setContainerTitle: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5
  },
  setContainerDesc: {
    paddingTop: 5
  },
  setContainerTitleTxt: {
    color: "#000",
    fontSize: 20,
    fontFamily: "Lato-Bold"
  },
  setContainerDesc1: {
    color: "#000",
    marginVertical: 2
  },
  setContainerDesc2: {
    color: "#000",
    fontFamily: "Lato-Regular"
  }
});
