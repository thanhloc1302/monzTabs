import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Constants from "expo-constants";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { TabView, SceneMap } from "react-native-tab-view";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Collapsible from "react-native-collapsible";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
          onPress={() =>
            navigation.navigate("DrugStoreDetail", {
              location_id: loca.id,
            })
          }
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
    { key: "trust", title: "Uy tín" },
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
  const route = useRoute();
  const { location_type_id } = route.params;
  const [locationTypeName, setLocationTypeName] = useState("");
  const [searchInputOffsetTop, setSearchInputOffsetTop] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    monzApi.get_location_type_name(location_type_id).then((val) => {
      console.log(val);
      setLocationTypeName(val.name);
    });
  }, []);

  const [mapRegion, setmapRegion] = useState({
    latitude: 21.0215979,
    longitude: 105.8324147,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // const [location, setLocation] = useState(null);

  const [list_drug_store, setListDrugStore] = useState(null);
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
        monzApi
          .get_location(location.latitude, location.longitude, location_type_id)
          .then((val) => {
            setListDrugStore(val["location"]);
            setLoading(false);
          });
      }
    })();
  }, []);

  const [searchBgHeight, setSearchBgHeight] = useState(0);
  const searchBgOpacity = useState(new Animated.Value(0))[0];

  const searchInputTopAnitated = useState(
    new Animated.Value(59 + Constants.statusBarHeight)
  )[0];

  const searchInputBgShow = () => {
    setSearchBgHeight(Dimensions.get("window").height);
    setIsSearching(true);
    Animated.timing(searchBgOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(searchInputTopAnitated, {
      toValue: Constants.statusBarHeight,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const searchInputBgHide = () => {
    Animated.timing(searchBgOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(({ finished }) => {
      setSearchBgHeight(0);
    });

    Animated.timing(searchInputTopAnitated, {
      toValue: searchInputOffsetTop,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setIsSearching(false);
  };

  let userSeaching;
  if (isSearching) {
    userSeaching = (
      <TouchableWithoutFeedback onPress={() => searchInputBgHide()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableWithoutFeedback>
    );
  } else {
    userSeaching = <FontAwesome name="search" size={18} color="#C5C5C5" />;
  }

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
  const ref = useRef();
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <CustomHeader title={locationTypeName}></CustomHeader>
      <View style={{ flex: 1 }}>
        {loadMap}
        <View style={styles.drugStoreList}>
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
                paddingBottom: 10,
              }}
            >
              <Text>
                {collapsed ? (
                  <Entypo name="chevron-thin-up" size={20} color="white" />
                ) : (
                  <Entypo name="chevron-thin-down" size={20} color="white" />
                )}
              </Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapsed}>
            <View
              style={[
                {
                  height: Dimensions.get("window").height / 2,
                },
              ]}
            >
              <TabsDrugStore listDrugStore={list_drug_store}></TabsDrugStore>
            </View>
          </Collapsible>
        </View>

        {/** nền và search input */}
        <View style={styles.searchContainer}>
          <View
            style={[styles.searchBgBorder, { opacity: 0 }]}
            ref={ref}
            onLayout={(e) => {
              ref.current.measureInWindow((x, y) => {
                setSearchInputOffsetTop(y);
              });
            }}
          ></View>
        </View>
      </View>

      <Animated.View
        style={[
          styles.inputSearchActionView,
          {
            height: searchBgHeight,
            opacity: searchBgOpacity,
          },
        ]}
      ></Animated.View>
      <Animated.View
        style={[
          {
            position: "absolute",
            zIndex: 8999,
            marginTop: searchInputTopAnitated,
            alignSelf: "center",
          },
          styles.searchBgBorder,
        ]}
      >
        {userSeaching}

        <TextInput
          placeholder={"Tìm kiếm " + locationTypeName + "..."}
          keyboardType="default"
          style={styles.searchInputText}
          onFocus={searchInputBgShow}
        />
      </Animated.View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  inputSearchActionView: {
    // height: Dimensions.get("window").height,
    position: "absolute",
    backgroundColor: "#FFF",
    width: "100%",
    zIndex: 10,
    overflow: "hidden",
  },

  searchContainer: {
    width: "100%",
    paddingTop: 30,

    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBgBorder: {
    flexDirection: "row",
    padding: 15,
    width: "85%",
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "rgb(0, 22, 31);",
    shadowOffset: {
      width: -3,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 13,
  },
  searchInputText: {
    flex: 1,
    marginLeft: 10,
  },
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
