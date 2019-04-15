import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Dimensions
} from 'react-native';
import {Navigation} from "react-native-navigation";
import {Tile} from "react-native-elements";

type Props = {};
export default class App extends Component<Props> {


    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width
        };
    }

    goToScreen = (screenName) => {
        Navigation.push(this.props.componentId, {
            component: {
                name: screenName
            }
        })
    };


    render() {
        const { width } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{
                        flex: 1,
                        flexWrap: 'wrap',
                        flexDirection: 'row'
                    }}>
                    <Tile
                        width={width/2}
                        // containerStyle={{marginTop: 5}}
                        imageSrc={require('./img/zdj.png')}
                        featured
                        title="TWOJE ZESTAWY"
                        onPress ={() => this.goToScreen('MySetsScreen')}/>
                    <Tile
                        width={width/2}
                        // containerStyle={{marginTop: 5}}
                        imageSrc={require('./img/zdj.png')}
                        featured
                        title="UTWÓRZ NOWY ZESTAW"
                        onPress ={() => this.goToScreen('CreateNewSetScreen')}/>
                    <Tile
                        width={width/2}
                        // containerStyle={{marginTop: 5 }}
                        imageSrc={require('./img/zdj.png')}
                        featured
                        title="UCZ SIĘ"
                        onPress ={() => this.goToScreen('LearnScreen')}/>
                    <Tile
                        width={width/2}
                        // containerStyle={{marginTop: 5}}
                        imageSrc={require('./img/zdj.png')}
                        featured
                        title="FISZKI"
                        onPress ={() => this.goToScreen('FlashcardsScreen')}/>
                    <Tile
                        width={width/2}
                        // containerStyle={{marginTop: 5}}
                        imageSrc={require('./img/zdj.png')}
                        featured
                        title="PISANIE"
                        onPress ={() => this.goToScreen('WritingScreen')}/>
                    <Tile
                        width={width/2}
                        // containerStyle={{marginTop: 5}}
                        imageSrc={require('./img/zdj.png')}
                        featured
                        title="WYBÓR ABCD"
                        onPress ={() => this.goToScreen('ChoiceAbcdScreen')}/>
                    <Tile
                        width={width/2}
                        // containerStyle={{marginTop: 5}}
                        imageSrc={require('./img/zdj.png')}
                        featured
                        title="TEST"
                        onPress ={() => this.goToScreen('TestScreen')}/>
                    <Tile
                        width={width/2}
                        // containerStyle={{marginTop: 5}}
                        imageSrc={require('./img/zdj.png')}
                        featured
                        title="USTAWIENIA"
                        onPress ={() => this.goToScreen('SettingsScreen')}/>
                    </View>


                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }

});
