import { AntDesign } from "@expo/vector-icons";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import * as React from "react";
import { Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import BottomDrawer from "../components/BottomDrawerSheet";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import Header from "../components/Header";
import { View } from "../components/Themed";
import TodoCard from "../components/TodoCard";
import ToDoModal from "../components/ToDoModal";
import Toolbar from "../components/Toolbar";
import { blueColor } from "../constants/Colors";
import { convertDatetimeToString } from "../lib/function";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

function Todo({ route }: { route: any }) {
  const bottomDrawerRef = React.useRef();
  const params = route?.params;
  // console.log(route);

  const [openDrawer, setopenDrawer] = React.useState(false);
  const [data, setdata] = React.useState([]);
  const [dataFiltered, setdataFiltered] = React.useState([...data]);
  const [modalInfo, setmodalInfo] = React.useState({
    show: false,
    mode: "update",
    id: "0",
  } as any);

  const { getItem, removeItem, setItem } = useAsyncStorage("@todolist_storage");
  const readItemFromStorage = async () => {
    try {
      const item = await getItem();

      if (item) {
        setdata(JSON.parse(item));
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(dataFiltered);

  const writeItemFromStorage = async (newValue: any, callback?: any) => {
    try {
      if (callback) {
        await setItem(JSON.stringify(newValue), callback);
      } else {
        await setItem(JSON.stringify(newValue));
      }
      readItemFromStorage();
    } catch (error) {
      console.log(error);
    }
  };

  const removeItemFromStorage = async () => {
    try {
      await removeItem();
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    // removeItemFromStorage();
    readItemFromStorage();
  }, [params?.token]);

  React.useEffect(() => {
    setdataFiltered([...data]);
  }, [data]);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Header setdataFiltered={setdataFiltered} dataFiltered={dataFiltered} />
        <Toolbar data={data} setdataFiltered={setdataFiltered} />
        {dataFiltered.length === 0 ? (
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 24,
              textAlign: "center",
              color: "#9c9b9b",
              marginTop: 20,
            }}
          >
            You have nothing to do
          </Text>
        ) : (
          <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
            {dataFiltered &&
              dataFiltered?.map((val: any, idx) => (
                <TodoCard
                  val={val}
                  deletefunction={() => {
                    setmodalInfo({ show: true, mode: "delete", id: val.id });
                  }}
                  // navigation={navigation}
                  doFunction={() => {
                    setmodalInfo({ show: true, mode: "update", id: val.id });
                  }}
                  done={val.done}
                  time={
                    convertDatetimeToString(new Date(val.date)) +
                    ", " +
                    new Date(val.time).toLocaleTimeString()
                  }
                  key={val.detail + idx}
                />
              ))}
          </ScrollView>
        )}

        <TouchableOpacity
          style={styles.createButton}
          activeOpacity={0.9}
          onPress={() => {
            // (bottomDrawerRef.current as any).swipe("up");
            (bottomDrawerRef.current as any).handlePresentModalPress();
          }}
        >
          <AntDesign name="plus" size={50} color={"white"} />
        </TouchableOpacity>
        <BottomDrawer
          // open={openDrawer}
          ref={bottomDrawerRef}
          closeFunction={() => {
            setopenDrawer(false);
          }}
          createFunction={async (createData: any, callback?: any) => {
            const tempData = [...(data as any)];
            tempData.push({ ...createData, done: false, id: uuid.v1() });

            await writeItemFromStorage(tempData, callback);
          }}
        />
        <ToDoModal
          visible={modalInfo.show}
          mode={modalInfo.mode}
          cancelFunction={() => {
            setmodalInfo({ show: false, mode: "update" });
          }}
          doFunction={async () => {
            let tempData = [...data];
            if (modalInfo.mode === "update") {
              const valIdx = tempData.findIndex(
                (val: any) => val.id === modalInfo.id
              );
              (tempData[valIdx] as any).done = !(tempData[valIdx] as any).done;
            } else {
              tempData = tempData.filter((val: any) => val.id !== modalInfo.id);
            }
            await writeItemFromStorage(tempData);
            setmodalInfo({ show: false, mode: "update" });
          }}
        />
      </View>
    </BottomSheetModalProvider>
  );
}

export default Todo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: "relative",
  },
  createButton: {
    position: "absolute",
    bottom: 10,
    right: 25,
    borderRadius: 35,
    padding: 10,
    backgroundColor: blueColor.normal,
    elevation: 20,
  },
});
