import { Navigation } from "react-native-navigation";
import App from "./App";
import SettingsScreen from "./screens/SettingsScreen";
import MySetsScreen from "./screens/MySetsScreen";
import CreateNewSetScreen from "./screens/CreateNewSetScreen";
import FlashcardsScreen from "./screens/FlashcardsScreen";
import LearnScreen from "./screens/LearnScreen";
import WritingScreen from "./screens/WritingScreen";
import ChoiceAbcdScreen from "./screens/ChoiceAbcdScreen";
import TestScreen from "./screens/TestScreen";
import ResultFromTestScreen from "./screens/ResultFromTestScreen";
import SetScreen from "./screens/SetScreen";

Navigation.registerComponent("App", () => App);
Navigation.registerComponent("SettingsScreen", () => SettingsScreen);
Navigation.registerComponent("MySetsScreen", () => MySetsScreen);
Navigation.registerComponent("CreateNewSetScreen", () => CreateNewSetScreen);
Navigation.registerComponent("FlashcardsScreen", () => FlashcardsScreen);
Navigation.registerComponent("LearnScreen", () => LearnScreen);
Navigation.registerComponent("WritingScreen", () => WritingScreen);
Navigation.registerComponent("ChoiceAbcdScreen", () => ChoiceAbcdScreen);
Navigation.registerComponent("TestScreen", () => TestScreen);
Navigation.registerComponent(
  "ResultFromTestScreen",
  () => ResultFromTestScreen
);
Navigation.registerComponent("SetScreen", () => SetScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    layout: {
      orientation: ["portrait"]
    },
    topBar: {
      elevation: 0,
      visible: false,
      drawBehind: true,
      animate: true,
      background: {
        color: "transparent"
      }
    }
  });
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
