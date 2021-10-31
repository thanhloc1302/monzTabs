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
  Share,
} from "react-native";
import * as Facebook from "expo-facebook";
import { useNavigation } from "@react-navigation/native";

const LoginChoiseScreen = () => {
  const navigation = useNavigation();

  const loginPhone = () => {
    navigation.navigate("LoginForm");
  };

  const loginFB = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "176072057755857",
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile", "email"],
        });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );

        console.log(await response.json());
        // Object {
        //     "id": "4343938299027987",
        //     "name": "Lộc Nguyễn",
        //   }
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const onReg = () => {
    navigation.navigate("RegPhone");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/imgs/login_bg.png")}
        style={{
          width: Dimensions.get("window").width,
          height: undefined,
          aspectRatio: 414 / 304,
          resizeMode: "stretch",
        }}
      />
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <TouchableOpacity
            style={[styles.loginBtn, { backgroundColor: "#F14336" }]}
          >
            <Image
              source={require("../../assets/icon/medical/gg_login.png")}
              style={styles.loginIcon}
            />
            <Text style={styles.loginBtnText}>Đăng nhập với Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.loginBtn, { backgroundColor: "#475993" }]}
            onPress={loginFB}
          >
            <Image
              source={require("../../assets/icon/medical/fb_login.png")}
              style={styles.loginIcon}
            />
            <Text style={styles.loginBtnText}>Đăng nhập với Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.loginBtn, { backgroundColor: "#2F3A5A" }]}
            onPress={loginPhone}
          >
            <Image
              source={require("../../assets/icon/medical/phone_login.png")}
              style={styles.loginIcon}
            />
            <Text style={styles.loginBtnText}>Đăng nhập với SĐT</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Text>Bạn chưa có tài khoản? </Text>
            <TouchableOpacity onPress={onReg}>
              <Text style={{ color: "#00AEEF" }}>Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.backBtn}>Bỏ qua</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  formGroup: {
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
  },
  loginBtn: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 15,
    shadowOffset: {
      width: -3,
      height: 5,
    },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 15,
  },
  loginIcon: {
    width: 30,
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  loginBtnText: {
    color: "#fff",
    marginLeft: 20,
    fontWeight: "700",
    fontSize: 16,
  },
  backBtn: {
    fontWeight: "700",
    fontSize: 18,
    color: "#00AEEF",
  },
});
export default LoginChoiseScreen;
