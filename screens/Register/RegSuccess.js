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
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../components/CustomHeader";
import { Modalize } from "react-native-modalize";

const RegSuccessScreen = () => {
  const navigation = useNavigation();

  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "shareVia",
        message: "I am message",
        caption: "I am a caption",
        url: "https://avi.edu.vn/wp-content/uploads/2019/11/london-2393098.jpg",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const userStart = () => {
    navigation.navigate("Home");
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF", position: "relative" }}>
      <CustomHeader title="Khởi tạo hồ sơ y tế" />
      <ScrollView
        contentContainerStyle={{
          minHeight: Dimensions.get("window").height - 90,
        }}
      >
        <View style={styles.container}>
          <View style={styles.container1}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../../assets/icon/medical/reg_success_check.png")}
                style={{
                  width: 21,
                  height: null,
                  aspectRatio: 1,
                  resizeMode: "cover",
                }}
              />
              <Text style={{ marginLeft: 20, color: "rgba(0, 55, 72, 0.72)" }}>
                Đăng ký thành công
              </Text>
            </View>
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeText}>
                Chào mừng LânZ đến với thế giới MonZ
              </Text>
            </View>
            <Image
              source={require("../../assets/imgs/reg_success.png")}
              style={styles.successIMG}
            />

            <View style={styles.shareTextContainer}>
              <Text style={styles.shareText}>
                Hãy chia sẻ điều này đến bạn bè và người thân, để cùng nhau PHÁT
                TRIỂN SỨC KHỎE và KIẾN THỨC KHOA HỌC CÁ NHÂN cùng MonZ !
              </Text>
              <TouchableOpacity style={styles.shareBtn} onPress={onShare}>
                <Image
                  source={require("../../assets/icon/medical/share_success.png")}
                  style={styles.shareBtnImage}
                />
                <Text style={styles.shareBtnText}>Chia sẻ</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.startBtn} onPress={() => userStart()}>
            <Text style={styles.startBtnText}>BẮT ĐẦU</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modalize
        ref={modalizeRef}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        //  snapPoint={300}
        //  modalHeight={300}
        adjustToContentHeight={true}
      >
        <View style={styles.modalContainer}>
          <Text>...your content</Text>

          <View>
            <TouchableOpacity style={{ backgroundColor: "red" }}>
              <Text>asdasdasdasdsadsda</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>HỦY</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  container1: {
    alignItems: "center",
  },
  welcomeTextContainer: {
    width: "85%",
    marginTop: 25,
    marginBottom: 35,
  },
  welcomeText: {
    fontWeight: "900",
    fontSize: 30,
    textAlign: "center",
  },
  successIMG: {
    width: "90%",
    height: null,
    aspectRatio: 324 / 246,
    resizeMode: "contain",
  },
  shareTextContainer: {
    marginTop: 16,
    width: "80%",
    alignItems: "center",
  },
  shareText: {
    fontSize: 12,
    color: "rgba(0, 38, 50, 0.7)",
    textAlign: "center",
  },
  shareBtn: {
    width: 120,
    flexDirection: "row",
    borderRadius: 8,
    marginTop: 20,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D5E8FE",
    shadowOffset: {
      width: -3,
      height: 5,
    },
    shadowColor: "rgb(34, 91, 177)",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 15,
  },
  shareBtnImage: {
    width: 20,
    height: null,
    aspectRatio: 1,
    resizeMode: "cover",
  },
  shareBtnText: {
    fontSize: 12,
    marginLeft: 15,
    color: "#2C4DC3",
  },
  startBtn: {
    backgroundColor: "#00AEEF",
    shadowOffset: {
      width: -3,
      height: 5,
    },
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 15,
    width: "90%",
    alignItems: "center",
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  startBtnText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#FFF",
    alignItems: "center",
    paddingTop: 10,
  },
  closeBtn: {
    borderRadius: 20,
    backgroundColor: "#EFEFEF",
    shadowOffset: {
      width: -3,
      height: 5,
    },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 15,
    width: "80%",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 15,
  },
  closeBtnText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#818181",
  },
});
export default RegSuccessScreen;
