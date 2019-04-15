import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity,ScrollView} from 'react-native';
import {Navigation} from "react-native-navigation";

type Props = {};
export default class App extends Component<Props> {

    goToScreen = (screenName) => {
        Navigation.push(this.props.componentId, {
            component: {
                name: screenName
            }
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                <Text style={styles.welcome}>Twoje zestawy </Text>
                <TouchableOpacity style={styles.test} onPress={() => this.goToScreen('SetScreen')}>
                    <Text title="Zestaw 1" style={styles.welcome}> Zestaw 1</Text>
                    <Text> 10 pojęć</Text>
                    <Text title="Zestaw 1"> Lato się kończy,
                    Jesieni powoli początek.
                    Czas zajrzeć po naukę
                    w ciemny pamięci zakątek.
                    Lecz pocieszam się myślą,
                    że znowu będzie lato.
                    I że zaczną się szaleństwa,
                    choć mało czasu na to.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.test}>
                    <Text title="Zestaw 2" style={styles.welcome}> Zestaw 2</Text>
                    <Text> 10 pojęć</Text>
                    <Text title="Zestaw 2"> Lato się kończy,
                    Jesieni powoli początek.
                    Czas zajrzeć po naukę
                    w ciemny pamięci zakątek.
                    Lecz pocieszam się myślą,
                    że znowu będzie lato.
                    I że zaczną się szaleństwa,
                    choć mało czasu na to.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.test}>
                    <Text title="Zestaw 3" style={styles.welcome}> Zestaw 3</Text>
                    <Text> 10 pojęć</Text>
                    <Text title="Zestaw 3"> Lato się kończy,
                    Jesieni powoli początek.
                    Czas zajrzeć po naukę
                    w ciemny pamięci zakątek.
                    Lecz pocieszam się myślą,
                    że znowu będzie lato.
                    I że zaczną się szaleństwa,
                    choć mało czasu na to.</Text>
                </TouchableOpacity>
                    <TouchableOpacity style={styles.test}>
                        <Text title="Zestaw 4" style={styles.welcome}> Zestaw 4</Text>
                        <Text> 10 pojęć</Text>
                        <Text title="Zestaw 4"> Lato się kończy,
                            Jesieni powoli początek.
                            Czas zajrzeć po naukę
                            w ciemny pamięci zakątek.
                            Lecz pocieszam się myślą,
                            że znowu będzie lato.
                            I że zaczną się szaleństwa,
                            choć mało czasu na to.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.test}>
                        <Text title="Zestaw 5" style={styles.welcome}> Zestaw 5</Text>
                        <Text> 10 pojęć</Text>
                        <Text title="Zestaw 5"> Lato się kończy,
                            Jesieni powoli początek.
                            Czas zajrzeć po naukę
                            w ciemny pamięci zakątek.
                            Lecz pocieszam się myślą,
                            że znowu będzie lato.
                            I że zaczną się szaleństwa,
                            choć mało czasu na to.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.test}>
                        <Text title="Zestaw 6" style={styles.welcome}> Zestaw 6</Text>
                        <Text> 10 pojęć</Text>
                        <Text title="Zestaw 6"> Lato się kończy,
                            Jesieni powoli początek.
                            Czas zajrzeć po naukę
                            w ciemny pamięci zakątek.
                            Lecz pocieszam się myślą,
                            że znowu będzie lato.
                            I że zaczną się szaleństwa,
                            choć mało czasu na to.</Text>
                    </TouchableOpacity>
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
        backgroundColor: '#f0f0f0',
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        color: 'black',
        fontWeight: 'bold'
    },
    test: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        width: '95%',
        margin: 10,
        backgroundColor: 'white'
    }
});
