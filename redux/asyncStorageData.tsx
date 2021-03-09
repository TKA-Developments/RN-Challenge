import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const readFromAsync = async (key) => {
  try {
    // await AsyncStorage.removeItem("@todo_list");
    const jsonValue = await AsyncStorage.getItem("@todo_list");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // read error
  }
};

const storeToAsync = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@todo_list", jsonValue);
  } catch (e) {
    // saving error
    alert("error");
  }
};

export { readFromAsync, storeToAsync };
