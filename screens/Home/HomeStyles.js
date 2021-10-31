import { StyleSheet, Dimensions } from "react-native";

const { width: windowWidth } = Dimensions.get("window");
const ITEM_WIDTH = 0.7 * windowWidth;
const SEPARATOR_WIDTH = 10;
export default StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },

  colorRed: {
    color: "red",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
  listIconContainer: {
    marginTop: -15,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iconRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  iconCol: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 18,
      height: 18,
    },
    width: "80%",
    shadowColor: "#70E2FF",

    shadowOpacity: 0.4,
    shadowRadius: 16.0,

    elevation: 24,
  },
  colorBG: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  iconIMG: {},
  iconText: {
    fontWeight: "bold",
    marginTop: 5,
    color: "#FFF",
  },

  oderButton: {
    position: "absolute",
    fontSize: 24,
    fontWeight: "bold",
    color: "#00AEEF",
  },
  userName: {
    color: "#00AEEF",
    fontWeight: "700",
  },
  helloText: {
    color: "rgba(0, 24, 32, 0.5)",
  },
});
