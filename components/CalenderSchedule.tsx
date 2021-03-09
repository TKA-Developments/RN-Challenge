import * as React from "react";

import { Text, View } from "./Themed";

import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";

export default function CalenderSchedule(props: {
  selectedDate: any;
  onSelectedDate: any;
}) {
  const getTodoList = (date?: Date) => {
    alert(moment(date).format("YYYYMMDD"));
  };

  const customDatesStyles = [];

  customDatesStyles.push({
    dateContainerStyle: { backgroundColor: "#C9EBFF" },
  });

  return (
    <View>
      <CalendarStrip
        calendarAnimation={{ type: "sequence", duration: 30 }}
        onDateSelected={props.onSelectedDate}
        selectedDate={props.selectedDate}
        style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
        calendarHeaderStyle={{ color: "#1D1B25" }}
        calendarColor={"transparent"}
        dateNumberStyle={{ color: "#5B6470" }}
        dateNameStyle={{ color: "#5B6470" }}
        highlightDateNumberStyle={{ color: "white" }}
        highlightDateContainerStyle={{ backgroundColor: "#005182" }}
        highlightDateNameStyle={{ color: "white" }}
        iconContainer={{ flex: 0.1 }}
      />
    </View>
  );
}
