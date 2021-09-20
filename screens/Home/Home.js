import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";

import monzApi from "../../api/MonzApi";
import styles from "./HomeStyles";

import NewsSlide from "./NewsSlide";
import LocationSlide from "./LocationSlide";
import { useNavigation } from "@react-navigation/native";

let covid_vn_dt = [];
let covid_w = {};
let covid_w_dt = [];
let covid_list_news = [];
let vn_total_today = 0;
let vn_total_27_4 = 0;
let vn_rank;

let covid;

const HomeHeader = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Entypo name="menu" size={40} color="#00AEEF" />
        <Image
          style={{
            marginLeft: 5,
            width: 95,
            height: null,
            resizeMode: "cover",
            aspectRatio: 95 / 27,
          }}
          source={require("../../assets/logo_light.png")}
        />
      </View>
      <View style={{ marginRight: 10 }}>
        <FontAwesome name="search" size={30} color="#00AEEF" />
      </View>
    </View>
  );
};

const IconMenu = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.listIconContainer}>
      <View style={styles.iconRow}>
        <View style={styles.iconCol}>
          <TouchableOpacity activeOpacity={0.5} style={styles.iconContainer}>
            <LinearGradient
              colors={["#FFFFFF", "rgba(231, 248, 255, 0.87)", "#42CCFF"]}
              style={styles.colorBG}
            >
              <Image
                source={require("../../assets/icon/medical/bv.png")}
                style={styles.iconIMG}
              />
              <Text style={styles.iconText}>Cơ sở y tế</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.iconCol}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.iconContainer}
            onPress={() => navigation.navigate("DrugStore")}
          >
            <LinearGradient
              colors={["#FFFFFF", "rgba(231, 248, 255, 0.87)", "#42CCFF"]}
              style={styles.colorBG}
            >
              <Image
                source={require("../../assets/icon/medical/nt.png")}
                style={styles.iconIMG}
              />
              <Text style={styles.iconText}>Nhà thuốc</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.iconCol}>
          <TouchableOpacity activeOpacity={0.5} style={styles.iconContainer}>
            <LinearGradient
              colors={["#FFFFFF", "rgba(231, 248, 255, 0.87)", "#42CCFF"]}
              style={styles.colorBG}
            >
              <Image
                source={require("../../assets/icon/medical/cc.png")}
                style={styles.iconIMG}
              />
              <Text style={styles.iconText}>Cấp cứu</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.iconRow}>
        <View style={styles.iconCol}>
          <TouchableOpacity activeOpacity={0.5} style={styles.iconContainer}>
            <LinearGradient
              colors={["#FFFFFF", "rgba(231, 248, 255, 0.87)", "#42CCFF"]}
              style={styles.colorBG}
            >
              <Image
                source={require("../../assets/icon/medical/gc.png")}
                style={styles.iconIMG}
              />
              <Text style={styles.iconText}>Giảm cân</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.iconCol}>
          <TouchableOpacity activeOpacity={0.5} style={styles.iconContainer}>
            <LinearGradient
              colors={["#FFFFFF", "rgba(231, 248, 255, 0.87)", "#42CCFF"]}
              style={styles.colorBG}
            >
              <Image
                source={require("../../assets/icon/medical/nn.png")}
                style={styles.iconIMG}
              />
              <Text style={styles.iconText}>Nhắc nhở</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.iconCol}>
          <TouchableOpacity activeOpacity={0.5} style={styles.iconContainer}>
            <LinearGradient
              colors={["#FFFFFF", "rgba(231, 248, 255, 0.87)", "#42CCFF"]}
              style={styles.colorBG}
            >
              <Image
                source={require("../../assets/icon/medical/kn.png")}
                style={styles.iconIMG}
              />
              <Text style={styles.iconText}>Tra cứu</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const getDrugStore = () => {};

const HomeScreen = () => {
  //lấy thông tin nhà thuốc quanh đây
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [list_drug_store, setListDrugStore] = useState(null);
  const [covid_list_news, setCovid_list_news] = useState([]);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location["coords"]);

      if (location != null) {
        monzApi
          .get_location(location.latitude, location.longitude, 1)
          .then((val) => {
            setListDrugStore(val["location"]);
          });
      }

      //lấy thông tin covid

      monzApi.get_covid().then((val) => {
        covid_vn = val["vietnam"];
        covid_vn_dt = val["vietnam_detail"];
        for (var i = 0; i < covid_vn_dt.length; i++) {
          if (Number.isFinite(Number(covid_vn_dt[i].today))) {
            vn_total_today = vn_total_today + Number(covid_vn_dt[i].today);
          }
        }
        covid_w = val["world"];
        covid_w_dt = val["world_detail"];

        for (var i = 0; i < val["news"].length; i++) {
          val["news"][i]["id"] = "item" + i;
        }
        setCovid_list_news(val["news"]);
        vn_total_27_4 = covid_vn["total"].replace(".", "") - 3053;
      });
    })();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <HomeHeader></HomeHeader>
        {/* slide */}
        <NewsSlide data_list={covid_list_news}></NewsSlide>
        <View>
          {/* icon */}
          <IconMenu></IconMenu>
          {/*hết icon */}

          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Image
              style={{ width: "100%", resizeMode: "contain" }}
              source={require("../../assets/icon/medical/oder-btn-bg.png")}
            />

            <Text style={styles.oderButton}>
              Đặt thuốc s<Text style={{ color: "#FFF" }}>iêu tốc 24/7</Text>
            </Text>
          </TouchableOpacity>

          <LocationSlide
            list_location={list_drug_store}
            title={"Cơ sở y tế"}
          ></LocationSlide>

          <LocationSlide
            list_location={list_drug_store}
            title={"Nhà thuốc"}
            style={{ paddingTop: 20 }}
          ></LocationSlide>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
