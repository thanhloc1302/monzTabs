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
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import monzApi from "../../api/MonzApi";
import CustomHeader from "../../components/CustomHeader";

const initialLayout = { width: Dimensions.get("window").width };

const TabsScreen = ({ listDrugStore }) => {
  const navigation = useNavigation();
  let listItems = (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={styles.textNoData}>Không có dữ liệu!</Text>
    </View>
  );
  if (listDrugStore != null) {
    listItems = listDrugStore.map(function (loca, idx) {
      let take_time = loca.take_time.split(" ");

      return (
        <TouchableOpacity
          key={idx}
          style={styles.listDrugStoreRow}
          onPress={() => navigation.navigate("DrugStoreDetail")}
        >
          <Image
            source={{ url: loca.image }}
            style={{
              borderRadius: 20,
              width: "25%",
              height: null,
              aspectRatio: 1,
              resizeMode: "cover",
            }}
          />
          <View
            style={{
              flex: 1,
              marginLeft: 15,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.locationName}>{loca.name}</Text>
              <Text style={styles.locationInfoText}>{loca.address}</Text>
            </View>

            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <View style={{ flex: 4 }}>
                <Text style={styles.locationInfoText}>Giờ mở cửa : 7h</Text>
                <Text style={styles.locationInfoText}>Giờ đóng cửa : 23h</Text>
                <View
                  style={{
                    backgroundColor: "#00AEEF",
                    width: "80%",
                    height: 5,
                    borderRadius: 5,
                    marginTop: 5,
                  }}
                ></View>
              </View>
              <View
                style={{
                  flex: 3,
                  justifyContent: "flex-end",
                }}
              >
                <Text style={[styles.locationInfoText, { paddingLeft: 10 }]}>
                  {take_time[0]}
                </Text>
                <View
                  style={{
                    backgroundColor: "#00AEEF",
                    width: "70%",
                    height: 5,
                    borderRadius: 5,
                    marginTop: 5,
                    marginLeft: 10,
                  }}
                ></View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                }}
              >
                <Text style={styles.locationInfoText}>{take_time[1]}</Text>
                <View
                  style={{
                    backgroundColor: "#00AEEF",
                    width: 20,
                    height: 5,
                    borderRadius: 5,
                    marginTop: 5,
                  }}
                ></View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  }

  return <ScrollView style={styles.tabsScreen}>{listItems}</ScrollView>;
};

const TabsDrugStore = (cusData) => {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: "near", title: "Gần nhất" },
    { key: "good", title: "Đánh giá tốt" },
    { key: "trust", title: "Bệnh viện uy tín" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "near":
        return <TabsScreen listDrugStore={cusData.listDrugStore} />;
      case "good":
        return <TabsScreen />;
      case "trust":
        return <TabsScreen />;
      default:
        return null;
    }
  };

  // const renderScene = SceneMap({
  //   first: FirstRoute,
  //   second: SecondRoute,
  //   third: ThirdRoute,
  // });

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const TabItemBg =
            props.navigationState.index == i
              ? styles.tabItemBgActive
              : styles.tabItemBg;

          const TextItem =
            props.navigationState.index == i
              ? styles.tabItemTextActive
              : styles.tabItemText;

          return (
            <TouchableOpacity
              key={i}
              style={[styles.tabItem, TabItemBg]}
              onPress={() => setIndex(i)}
            >
              <Text style={TextItem}>{route.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  );
};

const DrugStoreScreen = () => {
  const [mapRegion, setmapRegion] = useState({
    latitude: 21.0215979,
    longitude: 105.8324147,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [list_drug_store, setListDrugStore] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isShow, setIsShow] = useState(false);

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
        monzApi
          .get_location(location.latitude, location.longitude, 1)
          .then((val) => {
            //   console.log(val["location"]);
            setListDrugStore(val["location"]);
            setLoading(false);
          });
      }

      console.log("1234566");
    })();
  }, []);

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
        {list_drug_store.map((drugStore) => (
          <Marker
            key={drugStore.id}
            coordinate={{
              latitude: parseFloat(drugStore.lat),
              longitude: parseFloat(drugStore.lng),
            }}
            title={drugStore.name}
            //   image={{ uri: "http://monz.vn/data/data_img/dot.png" }}
          >
            <Image
              source={{ uri: "http://monz.vn/data/data_img/dot.png" }}
              style={{ width: 25, height: null, aspectRatio: 1 }}
              resizeMode="cover"
            />
          </Marker>
        ))}
      </MapView>
    );
  }

  let isShowIcon;
  if (isShow) {
    isShowIcon = (
      <TouchableWithoutFeedback
        style={styles.isShowIconContainer}
        onPress={() => setIsShow(false)}
      >
        <Entypo name="chevron-thin-down" size={20} color="white" />
      </TouchableWithoutFeedback>
    );
  } else {
    isShowIcon = (
      <TouchableWithoutFeedback
        style={styles.isShowIconContainer}
        onPress={() => setIsShow(true)}
      >
        <Entypo
          name="chevron-thin-up"
          size={20}
          color="white"
          style={{ marginBottom: 10 }}
        />
      </TouchableWithoutFeedback>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title={"Nhà thuốc"}></CustomHeader>
      {loadMap}
      <View
        style={[styles.drugStoreList, isShow ? { flex: 1.5 } : { flex: 0 }]}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            paddingTop: 5,
          }}
        >
          {isShowIcon}
        </View>
        <TabsDrugStore listDrugStore={list_drug_store}></TabsDrugStore>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containercarousel: {},
  //  drugStoreList
  drugStoreList: {
    backgroundColor: "#00AEEF",
    // height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -16,
    shadowColor: "rgb(0, 22, 31);",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.3,
    elevation: 13,
  },
  isShowIconContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  //tabs
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 10,
  },
  tabItem: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 13,

    shadowColor: "rgb(0, 0, 0);",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.3,
    elevation: 13,

    // font-weight: bold;
    // color: var(--ion-color-monzdarknew);
  },

  tabItemBg: {
    backgroundColor: "#FFF",
  },
  tabItemBgActive: {
    backgroundColor: "#003244",
  },

  tabItemText: {
    fontWeight: "bold",
    color: "#003244",
    textAlignVertical: "center",
    textAlign: "center",
  },
  tabItemTextActive: {
    fontWeight: "bold",
    color: "#FFF",
    textAlignVertical: "center",
    textAlign: "center",
  },
  tabsScreen: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  //location info
  listDrugStoreRow: {
    borderRadius: 20,
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  textNoData: {
    color: "#fff",
  },
  locationName: {
    fontWeight: "bold",
    fontSize: 12,
  },
  locationInfoText: {
    fontSize: 10,
  },
});

export default DrugStoreScreen;
