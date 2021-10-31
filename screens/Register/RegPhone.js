import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
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
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import CustomHeader from "../../components/CustomHeader";

const RegPhoneScreen = () => {
  const navigation = useNavigation();

  const [phonenumber, setPhoneNumber] = useState("+84352138689");
  const [userPass, setUserPass] = useState("");
  const [securePass, setSecurePass] = useState(true);
  const [userRePass, setUserRePass] = useState("");
  const [secureRePass, setSecureRePass] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(true);
  useEffect(() => {
    if (phonenumber != "" && userPass != "" && userRePass != "") {
      if (userPass == userRePass) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }
    } else {
      setBtnDisabled(true);
    }
  }, [phonenumber, userPass, userRePass]);

  const phoneSubmit = () => {
    navigation.navigate("RegPhoneOTP", {
      phonenumber: phonenumber,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title={"Tạo tài khoản mới"} />
      <KeyboardAwareScrollView
        enableAutomaticScroll={false}
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <View style={styles.container}>
          <Text
            style={{
              marginTop: 40,
              marginBottom: 30,
              width: "80%",
              textAlign: "center",
              color: "#7D7D7D",
            }}
          >
            Đăng ký tài khoản sẽ giúp bạn sử dụng được đầy đủ các tính năng của
            MonZ
          </Text>
          {/** form */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <AntDesign name="user" size={24} color="#00AEEF" />
              <TextInput
                placeholder="Số điện thoại của bạn"
                keyboardType="phone-pad"
                style={styles.inputText}
                value={phonenumber}
                onChangeText={(text) => {
                  setPhoneNumber(text);
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Feather name="unlock" size={24} color="#00AEEF" />
              <TextInput
                secureTextEntry={securePass}
                placeholder="Nhập mật khẩu"
                style={styles.inputText}
                onChangeText={(text) => {
                  setUserPass(text);
                }}
              />
              <Feather
                name="eye"
                size={24}
                color={securePass ? "rgba(0, 0, 0, 0.2)" : "black"}
                onPress={() => setSecurePass(!securePass)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Feather name="unlock" size={24} color="#00AEEF" />
              <TextInput
                secureTextEntry={secureRePass}
                placeholder="Nhập lại mật khẩu"
                style={styles.inputText}
                onChangeText={(text) => {
                  setUserRePass(text);
                }}
              />
              <Feather
                name="eye"
                size={24}
                color={secureRePass ? "rgba(0, 0, 0, 0.2)" : "black"}
                onPress={() => setSecureRePass(!secureRePass)}
              />
            </View>
          </View>
          {/** btn submit */}
          <TouchableOpacity
            style={[styles.btnSubmit, { opacity: btnDisabled ? 0.3 : 1 }]}
            disabled={btnDisabled}
            onPress={phoneSubmit}
          >
            <Text style={{ color: "#FFF", fontWeight: "700" }}>ĐĂNG KÝ</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <Text
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20,
          textAlign: "center",
          color: "#7D7D7D",
        }}
      >
        Bằng cách nhấn nút đăng ký, tôi xác nhận đã đọc và đồng ý với các Quy
        định sử dụng và Chính sách quyền riêng tư.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: 30,
  },
  formContainer: {
    //  backgroundColor: "red",
    alignSelf: "stretch",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: -20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    backgroundColor: "#FFF",
    shadowOffset: {
      width: -7,
      height: 5,
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 15,

    justifyContent: "space-between",
  },
  inputText: {
    //backgroundColor: "red",
    marginLeft: 15,
    flex: 1,
  },
  btnSubmit: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00AEEF",
    paddingTop: 20,
    paddingBottom: 20,
    width: "70%",
    borderRadius: 20,
    shadowOffset: {
      width: -7,
      height: 5,
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 15,
  },
});
export default RegPhoneScreen;
