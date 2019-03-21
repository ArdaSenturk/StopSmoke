import React from "react";
import { StyleSheet, Text, View, AsyncStorage, Dimensions, ScrollView } from "react-native";
import MainView from "./components/MainView";

const { width } = Dimensions.get("window");
const now = new Date();

export default class Main extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    relaseDate: 0,
    cigarettesPerDay: 20,
    cigarettesPerPackage: 20,
    cigarettesFee: 10,
    smokePerCigarette: 20,
    year: 0,
    month: 0,
    week: 0,
    day: 0,
    hour: 0,
    minute: 0,
    nonSmoking: 0,
    health: 0,
    saveMoney: 0
  };
  componentWillMount() {
    //this.getSettings()
    this.calculate(this.state.relaseDate);
  }

  async getSettings() {
    const relaseDate = await AsyncStorage.getItem("relaseDate");
    const cigarettesPerDay = await AsyncStorage.getItem("cigarettesPerDay");
    const cigarettesPerPackage = await AsyncStorage.getItem(
      "cigarettesPerPackage"
    );
    const cigarettesFee = await AsyncStorage.getItem("cigarettesFee");
    const smokePerCigarette = await AsyncStorage.getItem("smokePerCigarette");

    this.setState({
      relaseDate: parseInt(relaseDate),
      cigarettesPerDay: parseInt(cigarettesPerDay),
      cigarettesPerPackage: parseInt(cigarettesPerPackage),
      cigarettesFee: parseInt(cigarettesFee),
      smokePerCigarette: parseInt(smokePerCigarette)
    });
  }

  calculate(relaseDate) {
    //DateFormatter
    var difference = now.getTime() - 1552957230000;
    var yearDifference = Math.floor(
      difference / 1000 / 60 / 60 / 24 / 7 / 4 / 12
    );
    difference -= yearDifference * 1000 * 60 * 60 * 24 * 7 * 4 * 12;
    var monthDifference = Math.floor(difference / 1000 / 60 / 60 / 24 / 7 / 4);
    difference -= monthDifference * 1000 * 60 * 60 * 24 * 7 * 4;
    var weekDifference = Math.floor(difference / 1000 / 60 / 60 / 24 / 7);
    difference -= weekDifference * 1000 * 60 * 60 * 24 * 7;
    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24;
    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60;
    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;

    //Sigarayı Bıraktıktan Sonra Geçen Yıl,Ay,Hafta,Gün
    const allYear = yearDifference * 24 * 7 * 4 * 12;
    const allMonth = monthDifference * 24 * 7 * 4;
    const allWeek = weekDifference * 24 * 7;
    const allDay = daysDifference * 24;

    this.setState({
      year: yearDifference,
      month: monthDifference,
      week: weekDifference,
      day: daysDifference,
      hour: hoursDifference,
      minute: minutesDifference
    });

    //Sigarayı Bırkatıktan Sonra Kaç Adet Sigara İçmedi
    const cigarettesPerHour = this.state.cigarettesPerDay / 24;
    const nonSmoking = (
      (allYear + allMonth + allWeek + allDay + hoursDifference) *
      cigarettesPerHour
    ).toFixed(0);
    this.setState({ nonSmoking });

    //Sağlık Durumu
    const health = (
      (allYear + allMonth + allWeek + allDay + hoursDifference) *
      0.2
    ).toFixed(0);
    this.setState({ health });

    //Cepte Kalan Para
    const oneHourSaveMoney =
      ((this.state.cigarettesPerDay / this.state.cigarettesPerPackage) *
        this.state.cigarettesFee) /
      24;
    const saveMoney = (
      (allYear + allMonth + allWeek + allDay + hoursDifference) *
      oneHourSaveMoney
    ).toFixed(1);
    this.setState({ saveMoney });
  }

  render() {
    console.log(this.state.health);
    console.log(this.state.nonSmoking);
    console.log(this.state.saveMoney);
    return (
      <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            color: "#707070",
            marginTop: 50,
            marginBottom: 10
          }}
        >
          Tebrikler Sigarayı Bırakıyorsun!
        </Text>
        <MainView
          Date
          viewWidth={width - 25}
          viewHeight={220}
          year={this.state.year}
          month={this.state.month}
          week={this.state.week}
          day={this.state.day}
          hour={this.state.hour}
          minute={this.state.minute}
        />
        <Text
          style={{
            fontSize: 20,
            color: "#707070",
            marginTop: 10,
            marginBottom: 10
          }}
        >
          Cebinde Kalan Para
        </Text>
        <MainView
          saveMoney
          viewWidth={width - 25}
          viewHeight={80}
          money={this.state.saveMoney}
        />
        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 20,
                color: "#707070",
                marginTop: 10,
                marginBottom: 10
              }}
            >
              Sağlık Durumu
            </Text>
            <MainView
              viewWidth={width - 215}
              viewHeight={160}
              value={`%${this.state.health}`}
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 20,
                color: "#707070",
                marginTop: 10,
                marginBottom: 10
              }}
            >
              İçilmeyen Sigara
            </Text>
            <MainView
              url={'../assets/no-smoking.png'}
              viewWidth={width - 215}
              viewHeight={160}
              value={this.state.nonSmoking}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB",
  }
});
