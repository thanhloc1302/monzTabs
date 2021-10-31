import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
const ver = 10137;
const url = "http://monz.vn/mobile_api_" + ver + "/";
const monzApi = {
  HelloChandu: function (name) {},
  HelloTester: function () {},

  get_covid: async function () {
    // console.log(url);
    var value;
    await fetch(url + "get_covid")
      .then((response) => response.json())
      .then((responseJson) => {
        value = responseJson;
      })
      .catch((error) => {
        //   Alert.alert("Đã có lỗi xảy ra");
      });
    return value;
  },

  get_location_type_name: async function (location_type_id) {
    var value;
    await fetch(
      url + "get_location_type_name?location_type_id=" + location_type_id
    )
      .then((response) => response.json())
      .then((responseJson) => {
        value = responseJson;
      })
      .catch((error) => {
        // Alert.alert("Đã có lỗi xảy ra");
      });
    return value;
  },

  get_location: async function (cur_lat, cur_lng, location_type_id) {
    var value;
    await fetch(
      url +
        "get_location?cur_lat=" +
        cur_lat +
        "&cur_lng=" +
        cur_lng +
        "&location_type_id=" +
        location_type_id
    )
      .then((response) => response.json())
      .then((responseJson) => {
        value = responseJson;
      })
      .catch((error) => {
        //  Alert.alert("Đã có lỗi xảy ra");
      });
    return value;
  },

  get_location_detail: async function (cur_lat, cur_lng, location_id) {
    var value;
    await fetch(
      url +
        "get_location_detail?cur_lat=" +
        cur_lat +
        "&cur_lng=" +
        cur_lng +
        "&location_id=" +
        location_id
    )
      .then((response) => response.json())
      .then((responseJson) => {
        value = responseJson;
      })
      .catch((error) => {
        //  Alert.alert("Đã có lỗi xảy ra");
      });
    return value;
  },

  get_user_info_logedin: async function () {
    var result = null;

    const user_id = await AsyncStorage.getItem("user_id");
    if (user_id != null) {
      await fetch(url + "get_user_infor?user_id=" + user_id)
        .then((response) => response.json())
        .then((responseJson) => {
          result = responseJson;
        })
        .catch((error) => {
          //  Alert.alert("Đã có lỗi xảy ra");
        });
    }

    return result;
  },

  get_reminder_drug: async function (user_id) {
    // console.log(url);
    var value;
    await fetch(url + "get_remainder_drug?user_id=" + user_id)
      .then((response) => response.json())
      .then((responseJson) => {
        value = responseJson;
      })
      .catch((error) => {
        // Alert.alert("Đã có lỗi xảy ra");
      });
    return value;
  },

  action_login: async function (post) {
    var result = false;
    await fetch(url + "action_login?post=" + post)
      .then((response) => response.json())
      .then((responseJson) => {
        let value = responseJson;

        switch (value.error) {
          case 0:
            AsyncStorage.setItem("user_id", value.user_id);
            result = true;
            break;
          case 1:
            Alert.alert("Sai tài khoản hoặc mật khẩu!");
            break;
          case 2:
            Alert.alert("Email sai định dạng");
            break;
        }
      })
      .catch((error) => {
        //  Alert.alert("Đã có lỗi xảy ra");
      });
    return result;
  },

  action_logout: function () {
    AsyncStorage.removeItem("user_id");
  },
};

export default monzApi;
