import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { Entypo } from "@expo/vector-icons";
const CustomHeader = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <Entypo
        name="chevron-small-left"
        size={28}
        color="#003244"
        onPress={() => navigation.goBack()}
      />
      <Text>{"  "}</Text>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 10,
    marginBottom: -15,
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 15,
    paddingBottom: 15,
    paddingRight: 35,
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#FFF",

    shadowColor: "rgb(0, 22, 31);",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.3,
    elevation: 13,
  },
  headerTitle: {
    fontWeight: "700",
    fontSize: 18,
    color: "#003244",
  },
});

export default CustomHeader;
