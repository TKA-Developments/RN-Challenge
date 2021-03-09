import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import CalenderSchedule from "../components/CalenderSchedule";

import { Text, View } from "../components/Themed";
import moment from "moment";
import HorizontalMenu from "../components/HorizontalMenu";
import VerticalList from "../components/VerticalList";
import SearchBox from "../components/SearchBox";
import MyModal from "../components/MessageModal";

import { useSelector, useDispatch } from "react-redux";
import { removeData, doneTodo, fetchTodo } from "../redux/todoslice";
import AddButton from "../components/AddButton";
import NewTodo from "../components/NewTodo";

import MyImage from "../assets/images/myImage.jpg";
import ImageTime from "../assets/images/time_stop.jpg";

export default function List() {
  const [todoList, setTodoList] = React.useState([]);
  const todo = useSelector((state) => state.todo.value);
  const completed = useSelector((state) => state.todo.completed);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchTodo());
  }, []);

  const [showMessage, setShowMessage] = React.useState({
    title: "",
    message: "",
    image: "",
    show: false,
  });

  const [date, setDate] = React.useState(moment());

  const menu = ["all", "complete", "incomplete"];
  const [selectedMenu, setSelectedMenu] = React.useState(menu[0]);

  const onSelectedMenu = (type?: string) => {
    setSelectedMenu(type ? type : menu[0]);
  };

  const onSelectedDate = (date: any) => {
    setDate(date);
  };

  const [inputKey, setInputKey] = React.useState("");

  const handleChangeText = (text?: any) => {
    setInputKey(text);
  };

  const showMessageToggle = () => {
    setShowMessage({ ...showMessage, show: false });
  };

  const [showAddNewTodo, setShowAddNewTodo] = React.useState(false);

  const toggleTodo = (id?: any) => {
    dispatch(doneTodo(id));
    setShowMessage({
      title: "Good Job!",
      message: "Keep up your spirit and always be productive",
      image: MyImage,
      show: true,
    });
  };

  const toggleAddNewTodo = (id, task, edit) => {
    if (edit) {
      setState({ id, task, edit });
    }
    setShowAddNewTodo(!showAddNewTodo);
  };

  const [state, setState] = React.useState({
    id: "",
    task: "",
    edit: false,
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {!showAddNewTodo && <AddButton onPress={toggleAddNewTodo} />}
        {showMessage.show && (
          <MyModal
            showMessageToggle={showMessageToggle}
            title={showMessage.title}
            message={showMessage.message}
            images={showMessage.image}
          />
        )}
        <Text style={styles.title}>My Schedule</Text>
        <CalenderSchedule selectedDate={date} onSelectedDate={onSelectedDate} />
        <HorizontalMenu
          menu={menu}
          onSelectedMenu={onSelectedMenu}
          selectedMenu={selectedMenu}
        />
        <SearchBox inputKey={inputKey} handleChangeText={handleChangeText} />
        {todo.length > 0 && (
          <VerticalList
            todoList={todo}
            selectedDate={date}
            selectedMenu={selectedMenu}
            toggleTodo={toggleTodo}
            inputKey={inputKey}
            toggleEdit={toggleAddNewTodo}
          />
        )}
      </View>
      {showAddNewTodo && (
        <NewTodo
          selectedDate={date}
          toggle={toggleAddNewTodo}
          setShowMessage={setShowMessage}
          showMessageToggle={showMessageToggle}
          edit={state.edit}
          id={state.id}
          defaultValue={state.task}
          editState={setState}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
