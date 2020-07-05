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
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
interface state {
  items: any;
  selectedDate: string;
}

let selectedDate: any;
const dimensions = Dimensions.get("screen");
export default class App extends React.Component<any, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: {},
      selectedDate: "",
    };
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, marginTop: 35 }}
        behavior="height"
      >
        <ScrollView>
          <View>
            <Calendar
              current={new Date()}
              onDayPress={(day) => {
                this.setState({ selectedDate: day["dateString"] });
              }}
              onDayLongPress={(day) => {
                console.log("selected day", day);
              }}
              onMonthChange={(month) => {
                console.log("month changed", month);
                // this.setState({ notes: "" });
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
                fontSize: 17,
              }}
              value={
                this.state.items[this.state.selectedDate] &&
                this.state.items[this.state.selectedDate]
              }
              onChangeText={(text) => {
                if (!this.state.items[this.state.selectedDate]) {
                  this.state.items[this.state.selectedDate] = text;
                } else {
                  this.state.items[this.state.selectedDate] = text;
                }
                this.setState({ items: this.state.items });
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({});
