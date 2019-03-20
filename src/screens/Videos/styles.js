import { StyleSheet } from "react-native";

export default StyleSheet.create({
  main: {
    backgroundColor: "black",
    padding: 15
  },

  heading: {
    textAlign: "center",
    fontSize: 24,
    textDecorationLine: "underline",
    marginBottom: 20,
    marginTop: 10,
    color: "white",
    fontWeight: "600"
  },
  container: {
    flexDirection: "row",
    marginBottom: 15,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  imageContainer: {
    paddingRight: 15
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: "space-between",
    color: "white"
  },
  titleText: {
    color: "white",
    fontWeight: "bold"
  },
  descriptionText: {
    color: "white"
  },
  smallText: {
    fontSize: 13,
    color: "rgb(144, 148, 155)"
  }
});
