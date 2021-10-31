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
  TextInput,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Share,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import monzApi from "../../api/MonzApi";

const LoginFormScreen = () => {
  const navigation = useNavigation();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  useEffect(() => {
    if (userName != "" && userPassword != "") {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [userName, userPassword]);

  const login = () => {
    var post = {};
    post["email"] = userName;
    post["password"] = userPassword;
    post["device_id"] = 12;
    post["brand"] = 12;
    // if (this.plt.is("android")) {
    post["platform_id"] = 1;
    // }
    // if (this.plt.is("ios")) {
    //   post["platform_id"] = 2;
    // }

    monzApi.action_login(JSON.stringify(post)).then(async (val) => {
      //nếu dăng nhập được thì trả về true, không thì false
      if (val) {
        navigation.navigate("Home");
      }
    });
  };

  const test = async () => {
    await AsyncStorage.setItem("loctest", "locteststring2");
  };

  const test2 = async () => {
    console.log("123");
    monzApi.get_user_info_logedin().then((val) => {
      console.log(val);
    });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
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
          <View style={styles.formInputContainer}>
            <AntDesign name="user" size={24} color="#00AEEF" />
            <TextInput
              placeholder="Số điện thoại"
              keyboardType="phone-pad"
              style={styles.inputText}
              value={userName}
              onChangeText={(text) => {
                setUserName(text);
              }}
            />
          </View>
          <View style={styles.formInputContainer}>
            <Feather name="unlock" size={24} color="#00AEEF" />
            <TextInput
              placeholder="Mật khẩu"
              style={styles.inputText}
              value={userPassword}
              onChangeText={(text) => {
                setUserPassword(text);
              }}
            />
          </View>
        </View>
        <View style={styles.formGroup}>
          <TouchableOpacity
            disabled={btnDisabled}
            style={[
              styles.loginBtn,
              { backgroundColor: "#00AEEF", opacity: btnDisabled ? 0.5 : 1 },
            ]}
            onPress={login}
          >
            <Text style={[styles.loginBtnText, { color: "#FFF" }]}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.loginBtn, { backgroundColor: "#fff" }]}
            onPress={test2}
          >
            <Text style={[styles.loginBtnText, { color: "#00AEEF" }]}>
              Đăng ký
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <TouchableOpacity>
              <Text style={{ color: "#00789E" }}>Quên mật khẩu ?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backBtn}>Bỏ qua</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  formGroup: {
    width: "80%",
    alignItems: "center",
  },
  formInputContainer: {
    width: "100%",
    paddingBottom: 8,
    marginTop: 15,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(105, 149, 204, 0.5);",
  },
  inputText: {
    //backgroundColor: "red",
    marginLeft: 15,
    flex: 1,
  },
  loginBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 15,
    shadowOffset: {
      width: -3,
      height: 5,
    },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 15,
  },
  loginBtnText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  backBtn: {
    fontWeight: "700",
    fontSize: 18,
    color: "#00AEEF",
  },
});
export default LoginFormScreen;
