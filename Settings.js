import React from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  DatePickerAndroid,
  TimePickerAndroid
} from "react-native";
import { Constants, Permissions } from "expo";
import SettingsView from "./components/SettingViews";
import Button from "./components/Button";

export default class Settings extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    relaseDate: "",
    cigarettesPerDay: "20",
    cigarettesPerPackage: "20",
    cigarettesFee: "10.0",
    smokePerCigarette: "3",
    date: ""
  };

  componentWillMount() {
    const d = new Date();
    const date = `${d.getDate()}.${d.getMonth() +
      1}.${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`;
    this.setState({ date, relaseDate: d.getTime().toString() });
  }

  async componentDidMount() {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.isDevice && result.status === "granted") {
      console.log("Notification permissions granted.");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            color: "#5B9BDB",
            marginTop: 50,
            marginBottom: 20
          }}
        >
          Başlangıç Ayarları
        </Text>
        <SettingsView
          date
          dateChange={async () => {
            try {
              const { action, year, month, day } = await DatePickerAndroid.open(
                {
                  date: new Date()
                }
              );
              if (action !== DatePickerAndroid.dismissedAction) {
                try {
                  const { action, hour, minute } = await TimePickerAndroid.open(
                    {
                      is24Hour: true
                    }
                  );
                  if (action !== TimePickerAndroid.dismissedAction) {
                    this.setState({
                      date: `${day}.${month}.${year} - ${hour}:${minute}`
                    });
                    this.setState({
                      relaseDate: new Date(year, month, day, hour, minute)
                        .getTime()
                        .toString()
                    });
                  }
                } catch ({ code, message }) {
                  console.warn("Cannot open time picker", message);
                }
              }
            } catch ({ code, message }) {
              console.warn("Cannot open date picker", message);
            }
          }}
          label="Bırakma Tarihi"
          dateLabel={this.state.date}
          value={this.state.relaseDate}
          textChangeHandler={relaseDate => this.setState({ relaseDate })}
        />
        <SettingsView
          label="Günde İçilen Sigara Sayısı"
          value={this.state.cigarettesPerDay}
          textChangeHandler={cigarettesPerDay =>
            this.setState({ cigarettesPerDay })
          }
        />
        <SettingsView
          label="Paketteki Sigara Sayısı"
          value={this.state.cigarettesPerPackage}
          textChangeHandler={cigarettesPerPackage =>
            this.setState({ cigarettesPerPackage })
          }
        />
        <SettingsView
          label="Paketin Fiyatı"
          value={this.state.cigarettesFee}
          textChangeHandler={cigarettesFee => this.setState({ cigarettesFee })}
        />
        <SettingsView
          label="Bir Sigara İçme Süresi (dk.)"
          value={this.state.smokePerCigarette}
          textChangeHandler={smokePerCigarette =>
            this.setState({ smokePerCigarette })
          }
        />
        <Button
          label="Kaydet"
          buttonAction={async () => {
            await AsyncStorage.setItem("relaseDate", this.state.relaseDate);
            await AsyncStorage.setItem(
              "cigarettesPerDay",
              this.state.cigarettesPerDay
            );
            await AsyncStorage.setItem(
              "cigarettesPerPackage",
              this.state.cigarettesPerPackage
            );
            await AsyncStorage.setItem(
              "cigarettesFee",
              this.state.cigarettesFee
            );
            await AsyncStorage.setItem(
              "smokePerCigarette",
              this.state.smokePerCigarette
            );
            this.props.navigation.navigate("Main");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB",
    alignItems: "center"
  }
});
