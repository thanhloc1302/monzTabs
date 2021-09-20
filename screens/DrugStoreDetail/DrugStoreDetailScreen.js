import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { TabView, SceneMap } from "react-native-tab-view";

import monzApi from "../../api/MonzApi";
import CustomHeader from "../../components/CustomHeader";

const DrugStoreScreenDetail = () => {
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title={"Chi tieets"} />

      <View style={{ flex: 1, backgroundColor: "red" }}></View>
      <View style={{ flex: 1, backgroundColor: "#FFF" }}></View>
      <View
        style={{
          backgroundColor: "#FFF",
          padding: 20,
          marginTop: -16,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,

          shadowColor: "rgb(0, 22, 31);",
          shadowOffset: {
            width: 0,
            height: -5,
          },
          shadowOpacity: 0.2,
          shadowRadius: 2.3,
          elevation: 13,
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={{
              width: "100%",
              height: null,
              aspectRatio: 270 / 40,
              resizeMode: "stretch",
              marginTop: 5,
            }}
            source={require("../../assets/icon/medical/oder-now-btn-bg.png")}
          />
          <Text
            style={{
              paddingLeft: 7,
              position: "absolute",
              fontWeight: "bold",
              fontSize: 16,
              color: "#fff",
            }}
          >
            Đặt thu<Text style={{ color: "#FF0000" }}>ốc ngay</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
export default DrugStoreScreenDetail;
