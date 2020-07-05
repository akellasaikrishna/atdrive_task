import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
  TextInput,
  KeyboardAvoidingView,
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
      <KeyboardAvoidingView
        style={{ flex: 1, marginTop: 25 }}
        behavior="height"
      >
        <View>
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
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            flex: 1,
          }}
        >
          <Text
            style={{
              paddingVertical: 10,
              fontSize: 17,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Notes
          </Text>
          <TextInput
            style={{
              backgroundColor: "#EEE",
              height: dimensions.height / 3,
              width: dimensions.width / 1.15,
              borderRadius: 15,
              padding: 15,
              textAlignVertical: "top",
              fontSize: 16,
            }}
            // value={"demo"}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({});
