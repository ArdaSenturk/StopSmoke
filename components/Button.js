import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.container}
      onPress={this.props.buttonAction}
      >
        <Text style={styles.labelStyle}>{this.props.label}</Text>
      </TouchableOpacity>
    )
  }
};


const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 25,
    width: width - 45,
    height: 50,
    backgroundColor: '#E27DFA',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  labelStyle: {
    fontSize: 20,
    color: '#FDF7F7',
  }
});