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
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import call from "react-native-phone-call";

import { TabView, SceneMap } from "react-native-tab-view";
import Collapsible from "react-native-collapsible";
import { useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

import monzApi from "../../api/MonzApi";
import CustomHeader from "../../components/CustomHeader";

const DrugStoreScreenDetail = () => {
  const route = useRoute();
  const { location_id } = route.params;

  const [mapRegion, setmapRegion] = useState({
    latitude: 21.0215979,
    longitude: 105.8324147,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [locationInfo, setLocationInfo] = useState({});
  const [locationRegion, setLocationRegion] = useState({
    latitude: 21.0215979,
    longitude: 105.8324147,
  });
  const [isLoading, setLoading] = useState(true);

  const [collapsed, setToggleExpanded] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //   setLocation(location["coords"]);

      setmapRegion({
        latitude: location["coords"].latitude,
        longitude: location["coords"].longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      if (location != null) {
        const locationId = location_id;
        monzApi
          .get_location_detail(
            location["coords"].latitude,
            location["coords"].longitude,
            locationId
          )
          .then((val) => {
            if (val.error == 0) {
              setLocationInfo(val.location[0]);
              setLocationRegion({
                latitude: parseFloat(val.location[0].lat),
                longitude: parseFloat(val.location[0].lng),
              });
            } else {
              Alert.alert("Đã có lỗi xảy ra!");
            }
            setLoading(false);
          });
      }
    })();
  }, []);

  const phoneCall = () => {
    const args = {
      number: locationInfo.phone,
      prompt: true,
    };
    // Make a call
    call(args).catch(console.error);
  };

  let loadMap;
  if (isLoading) {
    loadMap = (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    loadMap = (
      <MapView style={{ flex: 1 }} region={mapRegion}>
        <Marker
          coordinate={mapRegion}
          title="Vị trí hiện tại"
          //  image={{ uri: "http://monz.vn/data/data_img/dot2.png" }}
        >
          <Image
            source={{ uri: "http://monz.vn/data/data_img/dot2.png" }}
            style={{ width: 22, height: null, aspectRatio: 36 / 46 }}
            resizeMode="cover"
          />
        </Marker>
        <Marker
          coordinate={locationRegion}
          title={locationInfo.name}
          //  image={{ uri: "http://monz.vn/data/data_img/dot2.png" }}
        >
          <Image
            source={{ uri: "http://monz.vn/data/data_img/dot.png" }}
            style={{ width: 25, height: null, aspectRatio: 1 }}
            resizeMode="cover"
          />
        </Marker>
      </MapView>
    );
  }
  console.log(locationInfo);

  let btnAction;
  if (locationInfo.location_type_id == 1) {
    btnAction = (
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
    );
  } else if (locationInfo.location_type_id == 3) {
    btnAction = (
      <View
        style={{
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={[
            styles.btnActionBorder,
            {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#00AEEF",
            },
          ]}
          onPress={phoneCall}
        >
          <Text style={[styles.btnActionText, { color: "#00AEEF" }]}>
            Liên hệ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnActionBorder,
            {
              backgroundColor: "#00AEEF",
              borderWidth: 1,
              borderColor: "#fff",
            },
          ]}
        >
          <Text style={[styles.btnActionText, { color: "#fff" }]}>
            Chỉ đường
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title={locationInfo.name} />

      {loadMap}
      <View
        style={{
          backgroundColor: "#00AEEF",
          marginTop: -20,

          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setToggleExpanded(!collapsed);
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 10,
            }}
          >
            <Text style={styles.headerText}>
              {collapsed ? (
                <Feather name="chevron-up" size={24} color="#fff" />
              ) : (
                <Feather name="chevron-down" size={24} color="#fff" />
              )}
            </Text>
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={collapsed} collapsedHeight={19}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
                fontSize: 17,
                width: "75%",
                textAlign: "center",
                paddingBottom: 15,
              }}
            >
              {locationInfo.address}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingTop: 10,
              paddingBottom: 30,
              shadowColor: "rgb(0, 22, 31);",
              shadowOffset: {
                width: 0,
                height: -5,
              },
              shadowOpacity: 0.1,
              shadowRadius: 2.3,
              elevation: 13,
            }}
          >
            {/** dong` 1 */}
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                paddingTop: 10,
                paddingLeft: 25,
                paddingRight: 25,
                justifyContent: "space-between",
              }}
            >
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="clock"
                  size={30}
                  color="#00AEEF"
                />
                <Text style={{ marginLeft: 10, color: "#003244" }}>
                  T2-CN / 6h30 - 23h30
                </Text>
              </View>

              {locationInfo.location_type_id == 1 ? (
                <View
                  style={{
                    backgroundColor: "#00AEEF",
                    padding: 5,
                    borderRadius: 50,
                    marginRight: 3,
                  }}
                >
                  <Ionicons name="chatbubble-ellipses" size={18} color="#fff" />
                </View>
              ) : (
                <View />
              )}
            </View>

            {/** dong` 2 */}
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                paddingTop: 10,
                paddingLeft: 25,
                paddingRight: 25,
                paddingBottom: 10,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  paddingLeft: 5,
                }}
              >
                <Fontisto name="motorcycle" size={30} color="#00AEEF" />

                <Text style={{ marginLeft: 14, color: "#003244" }}>2km</Text>
              </View>

              {locationInfo.location_type_id == 1 ? (
                <MaterialCommunityIcons
                  name="directions"
                  size={33}
                  color="#00AEEF"
                />
              ) : (
                <View />
              )}
            </View>
          </View>
        </Collapsible>
      </View>
      {/** nut cuoi' man hinh */}
      <View style={styles.bottomContainer}>{btnAction}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnActionBorder: {
    shadowColor: "rgb(0, 0, 0);",
    shadowOffset: {
      width: -3,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 13,
    padding: 12,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
  },
  btnActionText: {
    fontWeight: "700",
    fontSize: 16,
  },
  bottomContainer: {
    backgroundColor: "#FFF",
    padding: 25,
    marginTop: -16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    shadowColor: "rgb(0, 22, 31);",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.07,
    shadowRadius: 2.3,
    elevation: 13,
  },
});
export default DrugStoreScreenDetail;
