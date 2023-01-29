import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  menuContainer: {
    flex: 1,
    // backgroundColor: "green",
  },
  menuPopup: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "darkslategrey",
    backgroundColor: "white",
    paddingHorizontal: 10,
    position: "absolute",
    top: 93 + 16,
    right: 0,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderColor: "darkslategrey",
  },
  optText: {
    fontSize: 16,
    color: "darkslategrey",
  },
});

export default styles;
