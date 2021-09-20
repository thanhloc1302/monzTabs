import React, { Component, useState, useRef } from "react";
//import react in our code.
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
//import all the components we are going to use.
import style from "./HomeScreen.style";
import logic from "./HomeScreen.logic";
import monzApi from "../../api/MonzApi";

import { Alert } from "react-native";
import Carousel from "react-native-anchor-carousel";

const { width: windowWidth } = Dimensions.get("window");
const data = [
  {
    uri: "https://i.imgur.com/GImvG4q.jpg",
    title: "Lorem ipsum dolor sit amet",
    content:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    uri: "https://i.imgur.com/Pz2WYAc.jpg",
    title: "Lorem ipsum ",
    content: "Neque porro quisquam est qui dolorem ipsum ",
  },
  {
    uri: "https://i.imgur.com/IGRuEAa.jpg",
    title: "Lorem ipsum dolor",
    content:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    uri: "https://i.imgur.com/fRGHItn.jpg",
    title: "Lorem ipsum dolor",
    content: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet",
  },
  {
    uri: "https://i.imgur.com/WmenvXr.jpg",
    title: "Lorem ipsum ",
    content: "Neque porro quisquam est qui dolorem ipsum quia dolor ",
  },
];
const INITIAL_INDEX = 0;
export default class FirstPage extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      tuoi: 0,
      currentIndex: INITIAL_INDEX,
    };

    let covid_vn_dt = [];
    let covid_w = {};
    let covid_w_dt = [];
    let covid_list_news = [];
    let vn_total_today = 0;
    let vn_total_27_4 = 0;
    let vn_rank;
  }

  componentDidMount() {
    monzApi.get_covid().then((val) => {
      this.covid_vn = val["vietnam"];
      this.covid_vn_dt = val["vietnam_detail"];
      for (var i = 0; i < this.covid_vn_dt.length; i++) {
        if (Number.isFinite(Number(this.covid_vn_dt[i].today))) {
          this.vn_total_today =
            this.vn_total_today + Number(this.covid_vn_dt[i].today);
        }
      }
      this.covid_w = val["world"];
      this.covid_w_dt = val["world_detail"];
      // for(var i = 0; i < this.covid_w_dt.length; i++){
      //   if(this.covid_w_dt[i].country == 'Vietnam'){
      //     this.covid_w_dt[i]['rank'] = i + 1;
      //     this.vn_rank = this.covid_w_dt[i];
      //   }
      // }
      // console.log(this.vn_rank);
      this.covid_list_news = val["news"];
      this.vn_total_27_4 = this.covid_vn["total"].replace(".", "") - 3053;
      // setTimeout(function () {
      //   $('#world-detail').height($('#world').height());
      // }, 3000);

      console.log(this.covid_vn);
    });
  }

  componentDidUpdate() {
    console.log(this.state.name);
    //  logic.HelloChandu(this.state.name);
  }

  handleCarouselScrollEnd(item, index) {
    (index) => {
      his.setState({ currentIndex: index });
    };
  }

  renderItem({ item, index }) {
    const { uri, title, content } = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={style.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}
      >
        <ImageBackground source={{ uri: uri }} style={style.imageBackground}>
          <View style={style.rightTextContainer}>
            <Text style={style.rightText}>Lorem</Text>
          </View>
        </ImageBackground>
        <View style={style.lowerContainer}>
          <Text style={style.titleText}>{title}</Text>
          <Text style={style.contentText}>{content}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ paddingTop: 50 }}>
        {/* slide */}
        <Carousel
          style={style.carousel}
          data={data}
          renderItem={this.renderItem}
          itemWidth={0.7 * windowWidth}
          inActiveOpacity={0.3}
          containerWidth={windowWidth}
          onScrollEnd={this.handleCarouselScrollEnd}
          ref={useRef(null)}
        />

        {/* icon */}
        <View>
          <View style={style.iconRow}>
            <View style={style.iconCol}>
              <TouchableOpacity activeOpacity={0.5} style={style.iconContainer}>
                <LinearGradient
                  colors={["#FFFFFF", "rgba(231, 248, 255, 0.87)", "#42CCFF"]}
                  style={style.colorBG}
                >
                  <Image
                    source={require("../../assets/icon/medical/bv.png")}
                    style={style.iconIMG}
                  />
                  <Text style={style.iconText}>Cơ sở y tế</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={style.iconCol}>
              <TouchableOpacity activeOpacity={0.5} style={style.iconContainer}>
                <LinearGradient
                  colors={["#FFFFFF", "rgba(231, 248, 255, 0.87)", "#42CCFF"]}
                  style={style.colorBG}
                >
                  <Image
                    source={require("../../assets/icon/medical/nt.png")}
                    style={style.iconIMG}
                  />
                  <Text style={style.iconText}>Nhà thuốc</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={style.iconCol}>
              <TouchableOpacity activeOpacity={0.5} style={style.iconContainer}>
                <LinearGradient
                  colors={["#FFFFFF", "rgba(231, 248, 255, 0.87)", "#42CCFF"]}
                  style={style.colorBG}
                >
                  <Image
                    source={require("../../assets/icon/medical/cc.png")}
                    style={style.iconIMG}
                  />
                  <Text style={style.iconText}>Cấp cứu</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.iconRow}>
            <View style={style.iconCol}>
              <TouchableOpacity activeOpacity={0.5} style={style.iconContainer}>
                <LinearGradient
                  colors={["#FFFFFF", "rgba(231, 248, 255, 0.87)", "#42CCFF"]}
                  style={style.colorBG}
                >
                  <Image
                    source={require("../../assets/icon/medical/gc.png")}
                    style={style.iconIMG}
                  />
                  <Text style={style.iconText}>Giảm cân</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={style.iconCol}>
              <TouchableOpacity activeOpacity={0.5} style={style.iconContainer}>
                <LinearGradient
                  colors={["#FFFFFF", "rgba(231, 248, 255, 0.87)", "#42CCFF"]}
                  style={style.colorBG}
                >
                  <Image
                    source={require("../../assets/icon/medical/nn.png")}
                    style={style.iconIMG}
                  />
                  <Text style={style.iconText}>Nhắc nhở</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={style.iconCol}>
              <TouchableOpacity activeOpacity={0.5} style={style.iconContainer}>
                <LinearGradient
                  colors={["#FFFFFF", "rgba(231, 248, 255, 0.87)", "#42CCFF"]}
                  style={style.colorBG}
                >
                  <Image
                    source={require("../../assets/icon/medical/kn.png")}
                    style={style.iconIMG}
                  />
                  <Text style={style.iconText}>Tra cứu</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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

          <Text style={style.oderButton}>
            Đặt thuốc s<Text style={{ color: "#FFF" }}>iêu tốc 24/7</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={monzApi.get_covid}>
          <Text>123213213</Text>
        </TouchableOpacity>
        <TextInput
          value={this.name}
          onChangeText={(text) => {
            this.setState({ name: text });
          }}
        ></TextInput>
        <Text>{this.state.name}4567</Text>
        <TextInput
          value={this.tuoi}
          onChangeText={(text) => {
            this.setState({ tuoi: text });
          }}
        ></TextInput>
        <Text>{this.state.tuoi}45454444877</Text>
      </View>
    );
  }
}
