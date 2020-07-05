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
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={new Date()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          this.state.items[strTime].push({
            date: strTime,
            name: `#${strTime}: `,
          });
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach((key) => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { minHeight: 120 }]}>
        <TextInput
          style={{
            backgroundColor: "#EEEEEE",
            minHeight: 140,
            padding: 10,
            textAlignVertical: "top",
            borderRadius: 15,
            fontSize: 16,
          }}
          value={item.name}
          onChangeText={(text) => {
            
            const moddedObj = this.state.items[item.date];
            moddedObj[0]["name"] = text;
            console.log(moddedObj);
            this.state.items[item.date].pop();
            this.state.items[item.date].push(moddedObj);
            // this.setState({items : })
          }}
        />
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
