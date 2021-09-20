import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  StyleSheet,
} from "react-native";
import Carousel from "react-native-anchor-carousel";
import { LinearGradient } from "expo-linear-gradient";

const { width: windowWidth } = Dimensions.get("window");
const ITEM_WIDTH = windowWidth;
const SEPARATOR_WIDTH = 10;

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

export default function NewsSlide(props) {
  //console.log(props.data_list);
  const carouselRef = useRef(null);

  async function handleInstallNowClick(url) {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }

  function renderItem({ item, index }) {
    //const { image, title, url } = item;
    const { des, img_link, link, title } = item;

    return (
      <Pressable
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}
      >
        <Image source={{ uri: img_link }} style={styles.image} />
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[
            "rgba(231, 248, 255, 0)",
            "rgba(231, 248, 255, 0.4)",
            "rgba(0, 190, 252, 0.6)",
            "rgba(0, 165, 219, 1)",
          ]}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            numberOfLines={4}
            ellipsizeMode="tail"
            style={{
              width: "50%",
              fontSize: 18,
              fontWeight: "bold",
              color: "#FFF",
              marginTop: "10%",
              marginLeft: "50%",
            }}
          >
            {title}
          </Text>
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <View style={styles.containercarousel}>
      <Carousel
        keyExtractor={(item) => item?.id}
        style={[styles.carousel]}
        ref={carouselRef}
        data={props.data_list}
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
  containercarousel: {
    width: windowWidth,
    height: (windowWidth * 188) / 300,
    shadowColor: "rgb(0, 22, 31);",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8.3,
    elevation: 13,
  },
  carousel: {
    width: windowWidth,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // height: ITEM_WIDTH,
    height: (windowWidth * 188) / 300,
    flexGrow: 0,
  },
  item: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    backgroundColor: "white",
    //height: "98%",
    borderColor: "#EAECEE",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    aspectRatio: 300 / 188,
    backgroundColor: "#EBEBEB",
  },
});
