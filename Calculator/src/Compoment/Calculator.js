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
  ListView,
  Platform
} from 'react-native';

import KeypadView from 'Calculator/src/Compoment/KeypadView';

const SCREEN_WIDTH            = Dimensions.get('window').width;
const SCREEN_HEIGHT           = Dimensions.get('window').height;

var leftNumber      = '';
var rightNumber     = '';
var operation       = '';

export default class Calculator extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        '1', '2', '3', '/', '4', '5', '6', 'X','7','8','9','-','0','.','+','='
      ]),
      leftText : '0',
    };
  }

  render() {

    return (
      <View>
      <View style = {styles.answerView}>
      <Text style = {styles.answerText} > {this.state.leftText} </Text>

      </View>
      <ListView contentContainerStyle={styles.listView}
      dataSource={this.state.dataSource}
      horizontal={true}
      scrollEnabled = {false}
      initialListSize={100}
      renderRow= {this.renderRow.bind(this)}
      />
      </View>
    );
  }

  renderRow(rowData,sectionID,rowIDs) {

    return (
      <KeypadView keypadObject = {rowData} calculate = {this.calculate}/>
    );
  }

  calculate = (pressed) => {

    if (this._isNumber(pressed)) {

      if(operation == '=') {

        leftNumber = pressed;
        rightNumber = '';
        operation = '';
        this.setState({leftText:leftNumber.toString()});
      } else if (operation.length == 0) {

        leftNumber = leftNumber + pressed;
        this.setState({leftText:leftNumber.toString()});
      } else {

        rightNumber = rightNumber + pressed;
        this.setState({leftText:rightNumber.toString()});
      }
    } else {

      if (pressed == '=' && leftNumber.length > 0 && rightNumber.length > 0) {

        this._performOperation();
        operation = '=';
      } else {

        if (operation.length > 0 && leftNumber.length > 0 && rightNumber.length > 0) {
          this._performOperation();
        }
        operation = pressed;

      }
    }

  }

  _performOperation () {

    if (operation == '+') {

      leftNumber = (parseInt(leftNumber,10) + parseInt(rightNumber,10)).toString();
    } else   if (operation == '-') {

      leftNumber = (parseInt(leftNumber,10) - parseInt(rightNumber,10)).toString();
    }  else   if (operation == 'X') {

      leftNumber = (parseInt(leftNumber,10) * parseInt(rightNumber,10)).toString();
    }  else   if (operation == '/') {


      if (rightNumber == '0') {

        alert('Can not divide using 0');
        return;
      }
      leftNumber = (parseInt(leftNumber,10) / parseInt(rightNumber,10)).toString();
    }
    rightNumber = '';
    this.setState({leftText:leftNumber.toString()});
  }

  _isNumber(pressed) {

    var numberValidate = false;
    if (pressed == '0' ||
    pressed == '1' ||
    pressed == '2' ||
    pressed == '3' ||
    pressed == '4'||
    pressed == '5' ||
    pressed == '6' ||
    pressed == '7' ||
    pressed == '8' ||
    pressed == '9'||
    pressed == '.') {

      numberValidate =  true;
    }
    return numberValidate;
  }

}


var styles = StyleSheet.create({

  listView: {
    width: SCREEN_WIDTH,
    height: Dimensions.get('window').height,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom : 0
  },
  answerView: {
    backgroundColor: 'black',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - SCREEN_WIDTH-25,
  },
  answerText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'right',
    lineHeight:  SCREEN_HEIGHT - SCREEN_WIDTH-25,
    color:'white'
  }

});
