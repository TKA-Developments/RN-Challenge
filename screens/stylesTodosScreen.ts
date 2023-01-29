import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    padding: 30,
    position: "relative",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  titleContainer: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
    height: 40,
    fontSize: 32,
    fontWeight: "bold",
    color: "darkslategrey",
    textAlign: "center",
  },
  btnContainer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  btnAdd: {
    padding: 15,
    backgroundColor: "darkseagreen",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navbar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "darkseagreen",
    backgroundColor: "white",
  },
  navbarBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  navbarBtnText: {
    color: "darkslategrey",
  },
});

export default styles;
