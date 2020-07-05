import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
  TextInput,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
const dimensions = Dimensions.get("screen");
interface state {
  items: any;
}
export default class App extends React.Component<any, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: {},
    };
  }
  render() {
    return (
      <View style={{ flex: 1, marginTop: 25 }}>
        <Calendar
          current={new Date()}
          onDayPress={(day) => {
            console.log("selected day", day);
          }}
          onDayLongPress={(day) => {
            console.log("selected day", day);
          }}
          onMonthChange={(month) => {
            console.log("month changed", month);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
