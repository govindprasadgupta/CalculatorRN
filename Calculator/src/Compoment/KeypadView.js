/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

const SCREEN_WIDTH            = Dimensions.get('window').width;

export default class KeypadView extends Component {

  render(){

    var textStyle = styles.numberText;
    if (this.props.keypadObject == '+' ||
    this.props.keypadObject == '-' ||
    this.props.keypadObject == 'X' ||
    this.props.keypadObject == '/' ||
    this.props.keypadObject == '=' ) {

      textStyle = styles.operationText;
    }
    return (

      <View style = {styles.innerView}>

      <TouchableHighlight style = {{backgroundColor : 'white'}}
      onPress={() => this.passedNumber()}
      >
      <Text style = {textStyle} > {this.props.keypadObject} </Text>
      </TouchableHighlight>
      </View>

    );
  }

  passedNumber () {
    this.props.calculate(this.props.keypadObject);
  }
}

var styles = StyleSheet.create({

  innerView: {
    width: parseInt(SCREEN_WIDTH/4),
    height: parseInt(SCREEN_WIDTH/4),
  },
  numberText: {
    backgroundColor: 'white',

    borderWidth: 0.5,
    borderColor: '#d6d7da',
    fontSize: 40,
    lineHeight: parseInt(SCREEN_WIDTH/4),
    textAlign: 'center'
  },
  operationText: {
    backgroundColor: 'yellow',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    fontSize: 40,
    lineHeight: parseInt(SCREEN_WIDTH/4),
    fontWeight: 'bold',
    textAlign: 'center'
  }

});
