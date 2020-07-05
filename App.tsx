import React, { Fragment } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  AsyncStorage,
} from "react-native";
import { Calendar } from "react-native-calendars";
interface state {
  items: any;
  selectedDate: string;
  markedDates: any;
}

const dimensions = Dimensions.get("screen");
export default class App extends React.Component<any, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: {},
      selectedDate: `${new Date().getUTCFullYear()}-${
        new Date().getUTCMonth().toString().length == 1 ? "0" : ""
      }${new Date().getUTCMonth()}-${new Date().getUTCDate()}`,
      markedDates: {},
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("items").then((data) => {
      if (data != null) {
        this.setState({ items: JSON.parse(data) }, () => {
          Object.keys(this.state.items).map((date) => {
            this.state.markedDates[date] = {
              marked: true,
            };
          });
          this.setState({ markedDates: this.state.markedDates });
        });
      }
    });
  }
  render() {
    let markedObject = {};
    Object.keys(this.state.items).map((date) => {
      markedObject[date] = {
        marked: true,
      };
    });
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, marginTop: 35 }}
        behavior="height"
      >
        <ScrollView>
          <Fragment>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Calendar
                current={new Date()}
                markedDates={markedObject}
                onDayPress={(day) => {
                  this.setState({
                    selectedDate: day["dateString"],
                  });
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
                placeholder="Type your notes here"
                placeholderTextColor="gray"
                style={{
                  backgroundColor: "#EEE",
                  height: dimensions.height / 4,
                  width: dimensions.width / 1.15,
                  borderRadius: 15,
                  padding: 15,
                  textAlignVertical: "top",
                  fontSize: 17,
                }}
                value={
                  (this.state.items &&
                    this.state.items[this.state.selectedDate]) ||
                  ""
                }
                onChangeText={(text) => {
                  if (!this.state.items[this.state.selectedDate]) {
                    this.state.items[this.state.selectedDate] = text;
                  } else {
                    this.state.items[this.state.selectedDate] = text;
                  }
                  this.setState({ items: this.state.items }, () => {
                    Object.keys(this.state.items).map((date) => {
                      markedObject[date] = {
                        marked: true,
                      };
                    });
                    AsyncStorage.setItem(
                      "items",
                      JSON.stringify(this.state.items)
                    );
                  });
                }}
              />
            </View>
          </Fragment>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({});
