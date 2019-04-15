import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';


test = [
    {
        id: 1,
        question: 'Computer: ',
        correctAnswer: 'Komputer',
        answerA: 'Komputer',
        answerB: 'Telefon',
        answerC: 'Drukarka',
        answerD: 'Mateusz'

    },
    {
        id: 2,
        question: 'Computer: ',
        correctAnswer: 'Komputer',
        answerA: 'Komputer',
        answerB: 'Telefon',
        answerC: 'Drukarka',
        answerD: 'Mateusz'

    },
    {
        id: 3,
        question: 'Computer: ',
        correctAnswer: 'Komputer',
        answerA: 'Komputer',
        answerB: 'Telefon',
        answerC: 'Drukarka',
        answerD: 'Mateusz'

    },
    {
        id: 4,
        question: 'Computer: ',
        correctAnswer: 'Komputer',
        answerA: 'Komputer',
        answerB: 'Telefon',
        answerC: 'Drukarka',
        answerD: 'Mateusz'

    },
];

export default class Tests1 extends Component {
    constructor(props){
        super(props);

        this.state = {
            questionNum: 1,
            question: test[0].question,
            answerA: test[0].answerA,
            answerB: test[0].answerB,
            answerC: test[0].answerC,
            answerD: test[0].answerD,
            points: 0
        };
    }

    goToScreen = (screenName) => {
        Navigation.push(this.props.componentId), {
            component: {
                name: screenName,
                options: {
                    topBar: {
                        title: {
                            text: screenName
                        }
                    }
                },
                passProps: {
                    points: this.state.points
                }
            }
        }
    }
    _changeQuestion(num){
        if(num < test.length){
            this.setState ({
                 questionNum: this.state.questionNum + 1,
                question: test[num].question,
                answerA: test[num].answerA,
                answerB: test[num].answerB,
                answerC: test[num].answerC,
                answerD: test[num].answerD,
            })
        }else {
            this.goToScreen('ChoiceAbcdScreen');
        }
    }

    _countScore(answer){
        console.log("answer: " + answer)

        if(answer === test[this.state.questionNum - 1].correctAnswer){
            this.setState({
                points: this.state.points + 1,
            })
        }

        this._changeQuestion(this.state.questionNum)
    }
    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.questionText}> {this.state.question}</Text>

                <TouchableOpacity style={styles.answerButton} onPress = {() => {this._countScore(this.state.answerA)}}>
                    <Text style = {styles.answerText}>{this.state.answerA}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.answerButton} onPress = {() => {this._countScore(this.state.answerB)}}>
                    <Text style = {styles.answerText}>{this.state.answerB}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.answerButton} onPress = {() => {this._countScore(this.state.answerC)}}>
                    <Text style = {styles.answerText}>{this.state.answerC}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.answerButton} onPress = {() => {this._countScore(this.state.answerD)}}>
                    <Text style = {styles.answerText}>{this.state.answerD}</Text>
                </TouchableOpacity>

                <Text>Punkty: {this.state.points}</Text>
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
        padding: 10
    },
    questionId: {
        textAlign: 'center',
        paddingBottom: 5,
        marginBottom: 30,
        alignItems: 'center',
        borderRadius: 15,
        fontSize: 30

    },
    questionText: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 30
    },
    answerButton: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        width: '95%',
        margin: 2,
        backgroundColor: 'deepskyblue',
        alignItems: 'center',
        borderRadius: 15
    },
    answerText: {
        textAlign: 'center',
        fontSize: 20
    }
});
