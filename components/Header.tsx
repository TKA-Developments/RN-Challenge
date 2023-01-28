import { Text } from "@rneui/base";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { Pressable, View } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { getDateReadable } from "../lib/function";
import { Switch } from "@rneui/themed";

type Props = {
  dataFiltered: Array<any>;
  setdataFiltered: any;
};

const Header = (props: Props) => {
  const [datePicker, setdatePicker] = useState({
    show: false,
    date: new Date(),
  });
  const [activateDateFilter, setactivateDateFilter] = useState(false);
  const [tempDataFiltered, settempDataFiltered] = useState([
    ...props.dataFiltered,
  ]);

  const filterByDate = (date: Date, item: any) => {
    const tempDate = new Date(item.date);
    return (
      tempDate.getDate() === date.getDate() &&
      tempDate.getMonth() === date.getMonth() &&
      tempDate.getFullYear() === date.getFullYear()
    );
  };

  React.useEffect(() => {
    if (activateDateFilter) {
      props.setdataFiltered(
        props.dataFiltered.filter(val => filterByDate(datePicker.date, val))
      );
    } else {
      props.setdataFiltered([...tempDataFiltered]);
    }
  }, [datePicker.date, activateDateFilter]);

  return (
    <View
      style={{
        marginTop: 20,
        marginBottom: 20,
        // backgroundColor: "transparent",
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          // backgroundColor: "transparent",
        }}
      >
        <Text
          style={{ fontSize: 44, fontFamily: "Montserrat", fontWeight: "700" }}
        >
          Todo
        </Text>
        <View style={{ alignItems: "center", flexDirection: "row-reverse" }}>
          <Pressable
            onPress={() => {
              setdatePicker({ show: true, date: datePicker.date });
            }}
          >
            <Icon name="calendar" size={20} color="#9c9b9b" />
          </Pressable>
          <Switch
            value={activateDateFilter}
            onValueChange={val => {
              setactivateDateFilter(val);
            }}
            style={{ padding: 0, margin: 0 }}
          />
        </View>
      </View>
      <Text
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: 12,
          color: "#9c9b9b",
        }}
      >
        {activateDateFilter
          ? getDateReadable(datePicker.date)
          : getDateReadable(new Date())}
      </Text>
      {datePicker.show && (
        <RNDateTimePicker
          value={datePicker.date}
          onChange={(e, val) => {
            setdatePicker({ show: false, date: val as any });
          }}
          mode="date"
        />
      )}
    </View>
  );
};

export default Header;
