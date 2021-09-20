import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
  colorRed: {
    color: "red",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
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
  carousel: {
    backgroundColor: "#141518",
    aspectRatio: 1.5,
    flexGrow: 0,
    marginBottom: 20,
  },
  item: {
    borderWidth: 2,
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    borderColor: "white",
    elevation: 3,
  },
  imageBackground: {
    flex: 2,
    backgroundColor: "#EBEBEB",
    borderWidth: 5,
    borderColor: "white",
  },
  rightTextContainer: {
    marginLeft: "auto",
    marginRight: -2,
    backgroundColor: "rgba(49, 49, 51,0.5)",
    padding: 3,
    marginTop: 3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightText: { color: "white" },
  lowerContainer: {
    flex: 1,
    margin: 10,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  contentText: {
    marginTop: 10,
    fontSize: 12,
  },
});
