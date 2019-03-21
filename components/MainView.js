import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default class MainView extends React.Component {
  render() {
    if (this.props.Date) {
      return (
        <View
          style={[
            styles.container,
            {
              width: this.props.viewWidth,
              height: this.props.viewHeight
            }
          ]}
        >
          <View>
            <View style={styles.viewInUpViewStyle}>
              <View
                style={{
                  width: width - 150,
                  justifyContent: "space-between",
                  alignSelf: "center",
                  flexDirection: "row"
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.dateTextStyle}>{this.props.year}</Text>
                  <Text style={styles.textStyle}>Yıl</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.dateTextStyle}>{this.props.month}</Text>
                  <Text style={styles.textStyle}>Ay</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.dateTextStyle}>{this.props.week}</Text>
                  <Text style={styles.textStyle}>Hafta</Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.viewInDownViewStyle}>
              <View
                style={{
                  width: width - 150,
                  justifyContent: "space-between",
                  alignSelf: "center",
                  flexDirection: "row"
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.dateTextStyle}>{this.props.day}</Text>
                  <Text style={styles.textStyle}>Gün</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.dateTextStyle}>{this.props.hour}</Text>
                  <Text style={styles.textStyle}>Saat</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.dateTextStyle}>{this.props.minute}</Text>
                  <Text style={styles.textStyle}>Dakika</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    } else if (this.props.saveMoney) {
      return (
        <View>
          <View
            style={[
              styles.container,
              {
                width: this.props.viewWidth,
                height: this.props.viewHeight
              }
            ]}
          >
            <Text style={styles.moneyTextStyle}>{this.props.money} ₺</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View
            style={[
              styles.container,
              {
                width: this.props.viewWidth,
                height: this.props.viewHeight
              }
            ]}
          >
            <Text style={styles.moneyTextStyle}>{this.props.value}</Text>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    elevation: 5,
    borderWidth: 1,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderColor: "#CBCBCB",
    backgroundColor: "#FBFBFB",
    alignItems: "center",
    justifyContent: "center"
  },
  viewInUpViewStyle: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#3333",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    width: width - 75,
    height: 85,
    margin: 5
  },
  viewInDownViewStyle: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#3333",
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    width: width - 75,
    height: 85,
    margin: 5
  },
  textStyle: {
    fontSize: 20,
    textAlign: "center",
    color: "#797777"
  },
  dateTextStyle: {
    fontSize: 40,
    textAlign: "center",
    color: "#B9B6B6"
  },
  moneyTextStyle: {
    fontSize: 40,
    color: "#050505",
    textAlign: "center"
  },
  imageStyle: {
    width: 10,
    height: 10
  }
});