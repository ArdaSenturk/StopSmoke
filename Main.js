import React from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Dimensions,
  ScrollView,
  Switch
} from "react-native";
import { Notifications, Permissions, AdMobInterstitial } from "expo";
import MainView from "./components/MainView";
import Button from "./components/Button";

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
    saveMoney: 0,
    switchValue: false
  };
  componentWillMount() {
    this.getSettings();
  }

  async componentDidMount() {
    AdMobInterstitial.setAdUnitID("ca-app-pub-6612319943575873/7308908291"); // Test ID, Replace with your-admob-unit-id
    AdMobInterstitial.setTestDeviceID("EMULATOR");
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
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

    this.calculate(this.state.relaseDate);
  }

  async calculate(relaseDate) {
    //Notification on or off
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      this.setState({ switchValue: false });
    } else {
      this.setState({ switchValue: true });
      this.sendNotification();
    }

    //DateFormatter
    var difference = now.getTime() - relaseDate;
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
    if (health <= 100) {
      this.setState({ health });
    } else {
      this.setState({ health: 100 });
    }

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

  toggleSwitch = async value => {
    this.setState({ switchValue: value });
    if (!value) {
      Notifications.dismissAllNotificationsAsync();
    }
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={styles.container}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#5B9BDB",
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
            color: "#5B9BDB",
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                color: "#5B9BDB",
                marginTop: 10,
                marginBottom: 10
              }}
            >
              Sağlık Durumu
            </Text>
            <MainView
              health
              viewWidth={width - 215}
              viewHeight={160}
              value={`%${this.state.health}`}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                color: "#5B9BDB",
                marginTop: 10,
                marginBottom: 10
              }}
            >
              İçilmeyen Sigara
            </Text>
            <MainView
              url={"../assets/no-smoking.png"}
              viewWidth={width - 215}
              viewHeight={160}
              value={this.state.nonSmoking}
            />
          </View>
        </View>
        <Button
          label="Sigara İçtim Tekrar Başla"
          buttonAction={async () => {
            await AsyncStorage.setItem("relaseDate", now.toString());
            await AsyncStorage.setItem(
              "cigarettesPerDay",
              this.state.cigarettesPerDay.toString()
            );
            await AsyncStorage.setItem(
              "cigarettesPerPackage",
              this.state.cigarettesPerPackage.toString()
            );
            await AsyncStorage.setItem(
              "cigarettesFee",
              this.state.cigarettesFee.toString()
            );
            await AsyncStorage.setItem(
              "smokePerCigarette",
              this.state.smokePerCigarette.toString()
            );
            this.calculate(now);
            this.props.navigation.navigate("Main");
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#5B9BDB",
              margin: 10
            }}
          >
            Bildirim
          </Text>
          <Switch
            onValueChange={this.toggleSwitch}
            value={this.state.switchValue}
          />
        </View>
      </ScrollView>
    );
  }

  sendNotification() {
    //5 Dakika Sonra Notification
    Notifications.scheduleLocalNotificationAsync(
      {
        title: "Tebrikler!",
        body: "Tebrikler Sigarayı Bırakmaya Karar Verdin."
      },
      {
        time: this.state.relaseDate + 300000
      }
    );

    //1 Saat Sonra Notification
    Notifications.scheduleLocalNotificationAsync(
      {
        title: "1 Saattir Sigara İçmedin!",
        body: "Koskoca 1 saat geçti aradan. Daha yolun başındasın."
      },
      {
        time: this.state.relaseDate + 3600000
      }
    );

    //3 Saat Sonra Notification
    Notifications.scheduleLocalNotificationAsync(
      {
        title: "3 Saattir Sigara İçmedin!",
        body: "Tamı tamına 3 saat geçti. Azmine bayıldım"
      },
      {
        time: this.state.relaseDate + 10800000
      }
    );

    //1 Gün Sonra Notification
    Notifications.scheduleLocalNotificationAsync(
      {
        title: "1 Gündür Sigara İçmedin!",
        body: "Tebrikler Sigarasız 1 Günün Geçti!"
      },
      {
        time: this.state.relaseDate + 86400000
      }
    );

    //2 Gün Sonra Notification
    Notifications.scheduleLocalNotificationAsync(
      {
        title: "2 Gündür Sigara İçmedin!",
        body: "Tebrikler Sigarasız 2. Günün!"
      },
      {
        time: this.state.relaseDate + 172800000
      }
    );

    //1 Hafta Sonra Notification
    Notifications.scheduleLocalNotificationAsync(
      {
        title: "1 Haftadır Sigara İçmedin!",
        body: "Tamı Tamına 1 Haftadır Sigara Kullanmadın!"
      },
      {
        time: this.state.relaseDate + 604800000
      }
    );

    //1 Ay Sonra Notification
    Notifications.scheduleLocalNotificationAsync(
      {
        title: "1 Aydır Sigara İçmedin!",
        body: "Aradan Tanışalı 1 Ay Geçti."
      },
      {
        time: this.state.relaseDate + 2419200000
      }
    );

    //2 Ay Sonra Notification
    Notifications.scheduleLocalNotificationAsync(
      {
        title: "2 Aydır Sigara İçmedin!",
        body: "Aradan Tanışalı 2 Ay Geçti."
      },
      {
        time: this.state.relaseDate + 4838400000
      }
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB"
  }
});
