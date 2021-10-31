import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import CustomHeader from "../../components/CustomHeader";
const RegInfoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [usetHeight, setUserHeight] = useState("");
  const [userWeight, setUserWeight] = useState("");
  const [gender, setGender] = useState(1);
  const [email, setEmail] = useState("");
  const [timestampDOB, setTimestampDOB] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const timestamp = new Date(date).getTime();
    setTimestampDOB(timestamp);
    console.log(timestamp);
    var d = new Date(timestamp);
    const date_string =
      d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    //console.log(date_string);
    setDob(date_string);
    hideDatePicker();
  };

  const confirmRegister = () => {
    navigation.navigate("RegSuccess");
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title={"Khởi tạo hồ sơ ý tế"} />
      <ScrollView>
        <KeyboardAwareScrollView style={styles.container}>
          <Text style={{ color: "rgba(0, 55, 72, 0.72)" }}>
            Vui lòng nhập chính xác thông tin cá nhân
          </Text>
          {/** Họ tên */}
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Họ và tên</Text>
            <View style={styles.inputContainer}>
              <SimpleLineIcons name="pencil" size={24} color="#00AEEF" />
              <TextInput
                placeholder="Họ và tên của bạn"
                style={styles.inputText}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                }}
              />
            </View>
          </View>

          {/* ngày sinh */}
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Ngày sinh</Text>
            <View style={styles.inputContainer}>
              <Feather name="calendar" size={24} color="#00AEEF" />

              <Text onPress={showDatePicker} style={styles.inputText}>
                {dob != "" ? dob : "DD/MM/YYYY"}
              </Text>
              {/* <TextInput
              placeholder="Họ và tên của bạn"
              style={styles.inputText}
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
            /> */}
            </View>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            locale="vi_VN"
            cancelTextIOS="Hủy"
            confirmTextIOS="Xác nhận"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          {/** chiều cao/ cân nặng */}
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Chiều cao / cân nặng</Text>
            <View style={styles.inputContainer}>
              <Image
                source={require("../../assets/icon/medical/ruler_blue.png")}
                style={{
                  width: 20,
                  height: null,
                  aspectRatio: 20 / 25,
                }}
              />
              <View style={{ flex: 1, marginLeft: 15 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 7,
                  }}
                >
                  <Text>Chiều cao:</Text>
                  <TextInput
                    placeholder="160 ( cm )"
                    value={usetHeight}
                    keyboardType="numeric"
                    style={{ alignSelf: "flex-end" }}
                    onChangeText={(text) => {
                      setUserHeight(text);
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Cân nặng:</Text>
                  <TextInput
                    placeholder="50 ( kg )"
                    value={userWeight}
                    keyboardType="numeric"
                    style={{ alignSelf: "flex-end" }}
                    onChangeText={(text) => {
                      setUserWeight(text);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          {/** giới tính */}
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Giới tính</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[styles.inputContainer, styles.genderOptionContainer]}
                onPress={() => {
                  setGender(1);
                }}
              >
                <View style={styles.genderRadio}>
                  {gender ? (
                    <View style={styles.genderRadioChecked} />
                  ) : (
                    <View />
                  )}
                </View>
                <Text>Nam</Text>
                <Image
                  source={require("../../assets/icon/medical/ava_male.png")}
                  style={{
                    width: 30,
                    height: null,
                    aspectRatio: 1,
                  }}
                />
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                style={[styles.inputContainer, styles.genderOptionContainer]}
                onPress={() => {
                  setGender(0);
                }}
              >
                <View style={styles.genderRadio}>
                  {!gender ? (
                    <View style={styles.genderRadioChecked} />
                  ) : (
                    <View />
                  )}
                </View>
                <Text>Nữ</Text>
                <Image
                  source={require("../../assets/icon/medical/ava_female.png")}
                  style={{
                    width: 30,
                    height: null,
                    aspectRatio: 1,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/** email */}
          <View style={styles.inputRow}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.inputLabel}>Địa chỉ email</Text>
              <Text style={{ color: "#00AEEF" }}>Không bắt buộc</Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Địa chỉ email"
                style={styles.inputText}
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.btnConfirm}
            onPress={() => confirmRegister()}
          >
            <Text style={styles.btnConfirmText}>LƯU THÔNG TIN</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  inputRow: {
    paddingTop: 10,
  },
  inputLabel: {
    marginBottom: 10,
    fontWeight: "700",
    color: "#003144",
  },
  inputContainer: {
    minHeight: 55,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 15,
  },
  inputText: {
    //backgroundColor: "red",
    marginLeft: 15,
    flex: 1,
  },
  genderOptionContainer: {
    flex: 12,
    justifyContent: "space-between",
  },
  genderRadio: {
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    borderRadius: 50,
    backgroundColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 15,
  },
  genderRadioChecked: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: "#00AEEF",
  },
  btnConfirm: {
    backgroundColor: "#00AEEF",
    marginTop: 35,
    marginBottom: 20,
    paddingTop: 15,
    paddingBottom: 15,
    alignSelf: "center",
    alignItems: "center",
    width: "70%",
    borderRadius: 20,
    shadowOffset: {
      width: -7,
      height: 5,
    },
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 15,
  },
  btnConfirmText: {
    color: "#FFF",
    fontWeight: "700",
  },
});
export default RegInfoScreen;
