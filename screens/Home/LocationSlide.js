import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import Carousel from "react-native-anchor-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const { width: windowWidth } = Dimensions.get("window");
const ITEM_WIDTH = windowWidth / 2.3;
const SEPARATOR_WIDTH = 0;

renderItem = ({ item, index }) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        carouselRef.current.scrollToIndex(index);
      }}
    ></TouchableOpacity>
  );
};

export default function LocationSlide(props) {
  const [locationTouch, setLocationTouch] = useState(false);
  const [locationTouchID, setLocationTouchID] = useState(0);
  //console.log(props.data_list);
  const carouselRef = useRef(null);
  const navigation = useNavigation();
  function goToLocationDetail(location_id, location_type_id) {
    //  Alert.alert(location_id + `,` + location_type_id);
  }

  function renderItem({ item, index }) {
    //const { image, title, url } = item;
    const { id, name, image, location_type_id } = item;

    return (
      <Pressable
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}
      >
        <View
          style={{
            alignItems: "center",
            paddingBottom: 10,
            paddingTop: 10,
          }}
        >
          <TouchableHighlight
            underlayColor="#00AEEF"
            activeOpacity={1.0}
            onShowUnderlay={() => {
              setLocationTouch(true);
              setLocationTouchID(id);
            }}
            onHideUnderlay={() => {
              setLocationTouch(false);
              setLocationTouchID(0);
            }}
            onPress={() => {
              // goToLocationDetail(id, location_type_id)
              console.log(location_type_id);
              if (location_type_id == 1) {
                navigation.navigate("DrugStoreDetail", {
                  location_id: id,
                });
              }
            }}
            style={{
              width: "90%",
              padding: 7,
              backgroundColor: "#fff",
              borderRadius: 10,
              shadowColor:
                (locationTouch == true) & (locationTouchID == id)
                  ? "rgb(0, 174, 239)"
                  : "rgb(0, 22, 31);",
              shadowOffset: {
                width: 0,
                height: -2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 8.3,
              elevation: 13,
            }}
          >
            <View>
              <Image
                source={{ uri: image }}
                style={{
                  width: "100%",
                  height: null,
                  aspectRatio: 1,
                  borderRadius: 10,
                  resizeMode: "cover",
                  backgroundColor: "blue",
                }}
              />
              <View
                style={{
                  paddingTop: 5,
                  paddingRight: 20,
                  alignContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Ionicons
                  name="location-sharp"
                  size={24}
                  color={
                    (locationTouch == true) & (locationTouchID == id)
                      ? "#FFF"
                      : "#00AEEF"
                  }
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    color:
                      (locationTouch == true) & (locationTouchID == id)
                        ? "#FFF"
                        : "#000",
                  }}
                >
                  {name}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </Pressable>
    );
  }

  return (
    <View
      style={
        props.style !== undefined
          ? [styles.containercarousel, props.style]
          : styles.containercarousel
      }
    >
      <Text
        style={{
          marginLeft: 10,
          fontSize: 24,
          fontWeight: "800",
          color: "#003244",
        }}
      >
        {props.title}
      </Text>
      <Carousel
        keyExtractor={(item) => item?.id}
        style={[styles.carousel]}
        ref={carouselRef}
        data={props.list_location}
        renderItem={renderItem}
        autoplay={true}
        itemWidth={ITEM_WIDTH}
        separatorWidth={SEPARATOR_WIDTH}
        inActiveScale={1}
        inActiveOpacity={1}
        containerWidth={windowWidth}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containercarousel: {},
});
