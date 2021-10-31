import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import monzApi from "../../api/MonzApi";
import CustomHeader from "../../components/CustomHeader";

const screenWidth = Dimensions.get("window").width;

const RemindScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title={"Uống thuốc / nước cùng MonZ"}></CustomHeader>
      <View style={[styles.container1, styles.container]}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.iconContainer}
          onPress={() => {
            navigation.navigate("RemindDrug");
          }}
        >
          <Image
            source={require("../../assets/imgs/drug_icon.png")}
            style={styles.iconIMG}
          />
          <Text style={[styles.iconText, { color: "#C9001D" }]}>
            UỐNG THUỐC
          </Text>
          <Text style={[styles.iconText, { color: "#C9001D" }]}>MonZ</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.container2, styles.container]}>
        <Image
          source={require("../../assets/imgs/remainder_bg.png")}
          style={{
            width: screenWidth,
            height: "100%",

            resizeMode: "stretch",
            position: "absolute",
          }}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.iconContainer}
          onPress={() => {
            navigation.navigate("RemindWater");
          }}
        >
          <Image
            source={require("../../assets/imgs/water_icon.png")}
            style={styles.iconIMG}
          />
          <Text style={[styles.iconText, { color: "#004F98" }]}>UỐNG NƯỚC</Text>
          <Text style={[styles.iconText, { color: "#004F98" }]}>MonZ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  container1: {
    paddingTop: 30,
    flex: 1,
  },
  container2: {
    flex: 1.3,
  },
  iconContainer: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    shadowOffset: {
      width: -4,
      height: 10,
    },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,

    elevation: 24,
  },
  iconIMG: {
    width: screenWidth <= 320 ? 100 : 164,
    height: null,
    aspectRatio: 164 / 200,
    resizeMode: "cover",
    marginTop: -50,
  },
  iconText: {
    fontSize: screenWidth <= 320 ? 18 : 24,
    fontWeight: "700",
  },
});
export default RemindScreen;
