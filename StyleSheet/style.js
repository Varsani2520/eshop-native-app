import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  imageContainer: {
    margin: 10,
    borderRadius: 10,
  },
  image: {
    width: width - 20,
    height: height / 3,
    resizeMode: "cover",
    borderRadius: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#3498db",
    color: "#ffffff",
    padding: 10,
    marginVertical: 10, // Adjust margin as needed
  },

  CardContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardImageContainer: {
    position: "relative",
    justifyContent: "center",
    marginBottom: "100px",
  },
  mediumcardImage: {
    // width: 500,
    // height: 500,
    borderRadius: 10,
    marginBottom: 10,
    width: width - 80,
    height: height / 3,
    resizeMode: "cover",
  },
  cardTitleContainer: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Background color for the title container
    width: "100%",
    padding: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  CardTitle: {
    color: "white", // Text color for the title
    textAlign: "center",
    fontSize: 30,
  },
  overlayIcons: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "center",
    alignItems: "center",
  },

  iconButton: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  CardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  textContainer: {
    flex: 1,
    fontSize: 18,
  },
});
