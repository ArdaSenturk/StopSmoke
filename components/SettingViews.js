import React from 'react';
import { View, StyleSheet, Text, TextInput, Dimensions, Picker, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export default class SettingViews extends React.Component {
  render() {
    if (this.props.date) {
      return (
        <View style={styles.container} >
          <Text style={styles.labelStyle} >{this.props.label}</Text>
          <TouchableOpacity
          onPress={this.props.dateChange}
          >
            <Text style={styles.dateLabelStyle} >{this.props.dateLabel}</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.container} >
          <Text style={styles.labelStyle} >{this.props.label}</Text>
          <TextInput
          style={styles.inputView}
          value={this.props.value}
          onChangeText={this.props.textChangeHandler}
          />
        </View>
      )
    }
  }
};


const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CCCCCC',
    width: width - 45,
    height: 50,
    backgroundColor: '#FBFBFB',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputView: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCCCCC',
    marginRight: 15,
    backgroundColor: '#fff',
    width: 55,
    height: 35,
    fontSize: 17,
    textAlign: 'center'
  },
  labelStyle: {
    marginLeft: 15,
    fontSize: 17,
    color: '#707070',
  },
  dateLabelStyle: {
    marginRight: 15,
    fontSize: 17,
    color: '#707070',
  }
});