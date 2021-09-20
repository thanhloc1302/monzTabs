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
        Alert.alert("Đã có lỗi xảy ra");
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
        Alert.alert("Đã có lỗi xảy ra");
      });
    return value;
  },
};

export default monzApi;
