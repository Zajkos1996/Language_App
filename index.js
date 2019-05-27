import { Navigation } from "react-native-navigation";
import App from "./App";
import Settings from "./screens/Settings";
import MySets from "./screens/MySets";
import CreateNewSet from "./screens/CreateNewSet";
import Flashcards from "./screens/Flashcards";
import Learn from "./screens/Learn";
import Writing from "./screens/Writing";
import ChoiceAbcd from "./screens/ChoiceAbcd";
import Test from "./screens/Test";
import Set from "./screens/Set";

Navigation.registerComponent("App", () => App);
Navigation.registerComponent("Settings", () => Settings);
Navigation.registerComponent("MySets", () => MySets);
Navigation.registerComponent("CreateNewSet", () => CreateNewSet);
Navigation.registerComponent("Flashcards", () => Flashcards);
Navigation.registerComponent("Learn", () => Learn);
Navigation.registerComponent("Writing", () => Writing);
Navigation.registerComponent("ChoiceAbcd", () => ChoiceAbcd);
Navigation.registerComponent("Test", () => Test);
Navigation.registerComponent("Set", () => Set);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        id: "AppStack",
        children: [
          {
            component: {
              name: "App",
              options: {
                bottomTab: {
                  text: "LearningApp"
                }
              }
            }
          }
        ]
      }
    }
  });
});
