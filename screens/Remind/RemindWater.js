import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modalize } from "react-native-modalize";
import SmoothPicker from "react-native-smooth-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Collapsible from "react-native-collapsible";

import monzApi from "../../api/MonzApi";
import CustomHeader from "../../components/CustomHeader";

const screenWidth = Dimensions.get("window").width;

const dataHourArr = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];
const dataMinuteArr = [
  "00",
  "05",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
];
const dataTimeWorkOut = [15, 30, 45, 60, 75, 90, 105, 120];
const opacities = {
  0: 1,
  1: 0.4,
};
const sizeText = {
  0: 30,
  1: 15,
  2: 10,
};
const Item = React.memo(
  ({ opacity, selected, vertical, fontSize, name, editingInfo }) => {
    return (
      <View
        style={[
          styles.OptionWrapper,
          {
            opacity,
            width: 95,
          },
        ]}
      >
        <Text style={{ fontSize, color: "#00789E" }}>
          {editingInfo == "timeWorkout" ? name + " Phút" : name}
        </Text>
      </View>
    );
  }
);
const ItemToRender = (
  { item, index },
  indexSelected,
  vertical,
  editingInfo
) => {
  const selected = index === indexSelected;
  const gap = Math.abs(index - indexSelected);

  let opacity = opacities[gap];
  if (gap > 1) {
    opacity = opacities[1];
  }
  let fontSize = sizeText[gap];
  if (gap > 1) {
    fontSize = sizeText[1];
  }

  return (
    <Item
      opacity={opacity}
      selected={selected}
      vertical={vertical}
      fontSize={fontSize}
      name={item}
      editingInfo={editingInfo}
    />
  );
};

const RemindWaterScreen = () => {
  const [arrayTimer, setArrayTimer] = useState([
    { uid: uuid.v4(), time: "8:30", hours: "8", minutes: "30" },
    { uid: uuid.v4(), time: "12:30", hours: "12", minutes: "30" },
    { uid: uuid.v4(), time: "21:30", hours: "21", minutes: "30" },
  ]);

  const [arrayTimerCount, setArrayTimerCount] = useState(3);

  const [isEnabled, setIsEnabled] = useState(false);
  const [collapsed, setToggleExpanded] = useState(true);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [userHeight, setUserHeight] = useState(null);
  const [userWeight, setUserWeight] = useState(null);
  const [userTimeWorkOut, setUserTimeWorkOut] = useState(75);
  const [userWater, setUserWater] = useState("2");
  const [userMess, setUserMess] = useState("Chủ tịch ơi đến giờ uống nước");
  function handleChange(index) {
    setSelected(index);
  }

  const [selected, setSelected] = React.useState(4);

  const timeWorkout = useRef(null);
  const timeWorkoutOnOpen = () => {
    setSelected(dataTimeWorkOut.indexOf(userTimeWorkOut));
    timeWorkout.current?.open();
  };
  const timeWorkoutOnClose = () => {
    timeWorkout.current?.close();
  };
  const timeWorkoutOnCloseSave = () => {
    setUserTimeWorkOut(dataTimeWorkOut[selected]);
    timeWorkout.current?.close();
  };

  const [editingArrIndex, setEditingIndex] = useState(0);
  const [selectedHour, setSelectedHour] = React.useState(4);
  const [selectedMinute, setSelectedMinute] = React.useState(4);
  const timeNoti = useRef(null);
  const timeNotitOnOpen = (listTimeIndex) => {
    //setSelected(dataTimeWorkOut.indexOf(userTimeWorkOut));
    //  console.log(arrayTimer[listTimeIndex]);
    //  console.log(dataHourArr.indexOf(arrayTimer[listTimeIndex].hours));
    setEditingIndex(listTimeIndex);
    setSelectedHour(dataHourArr.indexOf(arrayTimer[listTimeIndex].hours));
    setSelectedMinute(dataMinuteArr.indexOf(arrayTimer[listTimeIndex].minutes));
    timeNoti.current?.open();
  };
  const timeNotiOnClose = () => {
    timeNoti.current?.close();
  };
  const timeNotiOnCloseSave = () => {
    const newArrayTimer = [...arrayTimer];
    newArrayTimer.splice(editingArrIndex, 1);

    const hours = dataHourArr[selectedHour];
    const minutes = dataMinuteArr[selectedMinute];
    const time = hours + ":" + minutes;

    var addmore = {
      uid: uuid.v4(),
      time: time,
      hours: hours,
      minutes: minutes,
    };

    newArrayTimer.push(addmore);
    newArrayTimer.sort(function (a, b) {
      return parseFloat(a.hours) - parseFloat(b.hours);
    });
    setArrayTimer(newArrayTimer);

    timeNoti.current?.close();
  };

  useEffect(() => {
    if (userHeight != null && userWeight != null && userTimeWorkOut != "") {
      let waterShow =
        Math.round(
          (parseFloat(userWeight) + (parseFloat(userTimeWorkOut) / 30) * 12) *
            0.03 *
            10
        ) / 10;

      setUserWater(String(waterShow));
    }
  }, [userHeight, userWeight, userTimeWorkOut]);

  const addTimerArr = () => {
    var addmore = { uid: uuid.v4(), time: "20:30", hours: "20", minutes: "30" };
    const newArrayTimer = [...arrayTimer];
    newArrayTimer.push(addmore);
    //this.number_timer = this.time_arr.length;
    newArrayTimer.sort(function (a, b) {
      return parseFloat(a.hours) - parseFloat(b.hours);
    });
    setArrayTimer(newArrayTimer);
    setArrayTimerCount(newArrayTimer.length);
  };

  const minusTimerArr = () => {
    const newArrayTimer = [...arrayTimer];
    if (newArrayTimer.length > 0) {
      newArrayTimer.pop();
      //  this.number_timer = this.time_arr.length;

      newArrayTimer.sort(function (a, b) {
        return parseFloat(a.hours) - parseFloat(b.hours);
      });
      setArrayTimer(newArrayTimer);
      setArrayTimerCount(newArrayTimer.length);
    }
  };

  const delTimerArr = (index) => {
    const newArrayTimer = [...arrayTimer];
    newArrayTimer.splice(index, 1);
    setArrayTimer(newArrayTimer);
    setArrayTimerCount(newArrayTimer.length);
  };

  useEffect(() => {
    (async () => {
      try {
        let dataWaterRemind = await AsyncStorage.getItem("dataWaterRemind");
        if (dataWaterRemind !== null) {
          dataWaterRemind = JSON.parse(dataWaterRemind);

          setIsEnabled(dataWaterRemind.isEnabled);
          setUserHeight(dataWaterRemind.userHeight);
          setUserWeight(dataWaterRemind.userWeight);
          setUserTimeWorkOut(parseInt(dataWaterRemind.userTimeWorkOut));
          setUserWater(dataWaterRemind.userWater);
          setUserMess(dataWaterRemind.userMess);
          setArrayTimer(dataWaterRemind.arrayTimer);
          setArrayTimerCount(dataWaterRemind.arrayTimer.length);
        }
      } catch (e) {
        // error reading value
      }
    })();
  }, []);
  const confirmWaterRemind = async () => {
    const dataWaterRemind = {
      isEnabled: isEnabled,
      userHeight: userHeight,
      userWeight: userWeight,
      userTimeWorkOut: userTimeWorkOut,
      userWater: userWater,
      arrayTimer: arrayTimer,
      userMess: userMess,
    };

    await AsyncStorage.setItem(
      "dataWaterRemind",
      JSON.stringify(dataWaterRemind)
    );
  };

  const timerArrayListRender = arrayTimer.map((timerObj, index) => {
    return (
      <View
        key={timerObj.uid}
        style={[
          styles.listTimerRow,
          {
            backgroundColor: index % 2 ? "#fff" : "#00AEEF",
          },
        ]}
      >
        <Text style={{ color: index % 2 ? "#00AEEF" : "#fff" }}>
          Lần {index + 1} :
        </Text>

        {timerObj.hours >= 0 && timerObj.hours < 7 ? (
          <Ionicons
            name="moon-outline"
            size={24}
            color={index % 2 ? "#00AEEF" : "#fff"}
          />
        ) : null}
        {timerObj.hours >= 7 && timerObj.hours < 15 ? (
          <Ionicons
            name="sunny"
            size={24}
            color={index % 2 ? "#00AEEF" : "#fff"}
          />
        ) : null}
        {timerObj.hours >= 15 && timerObj.hours < 18 ? (
          <Ionicons
            name="ios-partly-sunny-outline"
            size={24}
            color={index % 2 ? "#00AEEF" : "#fff"}
          />
        ) : null}
        {timerObj.hours >= 18 && timerObj.hours < 24 ? (
          <Ionicons
            name="moon-outline"
            size={24}
            color={index % 2 ? "#00AEEF" : "#fff"}
          />
        ) : null}

        <Text style={{ color: index % 2 ? "#00AEEF" : "#fff" }}>
          {timerObj.time}
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={[
              styles.listTimerBtn,
              {
                backgroundColor: index % 2 ? "#00AEEF" : "#fff",
              },
            ]}
            onPress={() => timeNotitOnOpen(index)}
          >
            <SimpleLineIcons
              name="pencil"
              size={15}
              color={index % 2 ? "#fff" : "#00AEEF"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.listTimerBtn,
              {
                backgroundColor: index % 2 ? "#00AEEF" : "#fff",
              },
            ]}
            onPress={() => {
              delTimerArr(index);
            }}
          >
            <Ionicons
              name="md-trash-outline"
              size={15}
              color={index % 2 ? "#fff" : "#00AEEF"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  });
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title={"Uống nước cùng MonZ"} />
      <KeyboardAwareScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={styles.container}
        >
          {/** nut bat tat  */}
          <View style={styles.rowContainer}>
            <Image
              source={require("../../assets/icon/medical/water.png")}
              style={styles.iconIMG}
            />
            <Text style={styles.boldText}>Mục tiêu uống nước mỗi ngày</Text>

            <Switch
              trackColor={{ false: "#767577", true: "#FFD772" }}
              thumbColor={"#f4f3f4"}
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
            />
          </View>

          {/** chieu cao can nang */}
          <View style={styles.rowContainer}>
            <Image
              source={require("../../assets/icon/medical/ruler_blue.png")}
              style={styles.iconIMG}
            />
            <View
              style={{
                flex: 1,
              }}
            >
              <View style={[styles.flexRow, { marginBottom: 10 }]}>
                <Text style={styles.boldText}>Chiều cao :</Text>
                <TextInput
                  placeholder="160 ( cm )"
                  keyboardType="decimal-pad"
                  value={userHeight}
                  textAlign={"right"}
                  style={{ flex: 1 }}
                  onChangeText={(text) => {
                    setUserHeight(text.replace(",", "."));
                  }}
                />
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.boldText}>Cân nặng :</Text>
                <TextInput
                  placeholder="50 ( kg )"
                  keyboardType="decimal-pad"
                  value={userWeight}
                  textAlign={"right"}
                  style={{ flex: 1 }}
                  onChangeText={(text) => {
                    setUserWeight(text.replace(",", "."));
                  }}
                />
              </View>
            </View>
          </View>

          {/** thoi gian tap luyen  */}
          <View style={styles.rowContainer}>
            <View style={styles.flexRow}>
              <Image
                source={require("../../assets/icon/medical/muscle.png")}
                style={styles.iconIMG}
              />
              <Text style={styles.boldText}>Tham gia tập luyện:</Text>
            </View>
            <TouchableWithoutFeedback onPress={timeWorkoutOnOpen}>
              <Text>{userTimeWorkOut} phút / ngày</Text>
            </TouchableWithoutFeedback>
          </View>

          {/** so nuoc uong trong ngay  */}
          <View style={styles.rowContainerImgBg}>
            <ImageBackground
              source={require("../../assets/imgs/remainder-water-bg.png")}
              resizeMode="stretch"
              imageStyle={{ borderRadius: 20 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: 15,
                paddingTop: 15,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <Image
                source={require("../../assets/icon/medical/water.png")}
                style={styles.iconIMG}
              />
              <Text style={styles.boldText}>
                Số lít nước uống trong ngày ( khuyến nghị )
              </Text>
              <View style={styles.flexRow}>
                <TouchableOpacity
                  style={styles.changeWaterBtn}
                  onPress={() => {
                    setUserWater(
                      String(
                        (parseFloat(userWater) - 1).toFixed(1) < 0
                          ? 0
                          : (parseFloat(userWater) - 1).toFixed(1)
                      )
                    );
                  }}
                >
                  <Text style={styles.boldText}>-</Text>
                </TouchableOpacity>
                <TextInput
                  placeholder="2"
                  keyboardType="decimal-pad"
                  value={userWater}
                  textAlign={"center"}
                  style={{ marginLeft: 7, marginRight: 5 }}
                  onChangeText={(text) => {
                    setUserWater(text.replace(",", "."));
                  }}
                />
                <TouchableOpacity
                  style={styles.changeWaterBtn}
                  onPress={() => {
                    setUserWater(
                      String((parseFloat(userWater) + 1).toFixed(1))
                    );
                  }}
                >
                  <Text style={styles.boldText}>+</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>

          {/** so lan uong trong ngay  */}
          <View style={styles.colabRowContainer}>
            <View style={[styles.flexRow, { flex: 1 }]}>
              <View style={[styles.flexRow, { flex: 1 }]}>
                <Image
                  source={require("../../assets/icon/medical/water.png")}
                  style={styles.iconIMG}
                />
                <Text style={styles.boldText}>Số lần uống trong ngày</Text>
              </View>
              <View style={styles.flexRow}>
                <TouchableOpacity
                  style={styles.changeWaterBtn}
                  onPress={minusTimerArr}
                >
                  <Text style={styles.boldText}>-</Text>
                </TouchableOpacity>
                <Text style={{ marginLeft: 7, marginRight: 5 }}>
                  {arrayTimerCount}
                </Text>
                <TouchableOpacity
                  style={styles.changeWaterBtn}
                  onPress={addTimerArr}
                >
                  <Text style={styles.boldText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/** colab */}
            <View
              style={{
                width: "90%",
                borderBottomWidth: 1,
                borderBottomColor: "rgba(0, 0, 0, 0.1)",
                marginTop: 10,
                alignSelf: "center",
              }}
            />
            <View
              style={{
                marginLeft: -9,
                marginRight: -9,
                marginBottom: -14,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setToggleExpanded(!collapsed);
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.headerText}>
                    {collapsed ? (
                      <Feather name="chevron-down" size={24} color="black" />
                    ) : (
                      <Feather name="chevron-up" size={24} color="black" />
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 2,
                  shadowOffset: {
                    width: 0,
                    height: -3,
                  },
                  shadowColor: "#000",
                  shadowOpacity: 0.25,
                  shadowRadius: 6.0,
                  elevation: 24,
                }}
              >
                <Collapsible
                  collapsed={collapsed}
                  style={{
                    borderRadius: 20,
                    backgroundColor: "#fff",
                  }}
                >
                  <View
                    style={{
                      borderRadius: 20,
                      overflow: "hidden",
                    }}
                  >
                    {timerArrayListRender}
                  </View>
                </Collapsible>
              </View>
            </View>
          </View>

          {/** loi nhac */}
          <View style={styles.rowContainer}>
            <View style={styles.flexRow}>
              <Image
                source={require("../../assets/icon/medical/muscle.png")}
                style={styles.iconIMG}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: 4 }}>Nội dung nhắc nhở:</Text>
                <TextInput
                  multiline={true}
                  placeholder="Lời nhắc"
                  keyboardType="default"
                  value={userMess}
                  style={styles.boldText}
                  onChangeText={(text) => {
                    setUserMess(text);
                  }}
                />
              </View>
            </View>

            <View></View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      {/** nut xac nhan */}
      <View style={styles.confirmContainerWraper}>
        <View style={styles.confirmContainer}>
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={confirmWaterRemind}
          >
            <Text style={styles.confirmBtnText}>LƯU LỊCH NHẮC</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/** thoi gian tap luyen */}
      <Modalize
        ref={timeWorkout}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        adjustToContentHeight={true}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.flexRow,
              {
                width: "100%",
                paddingLeft: 20,
                paddingRight: 20,
                justifyContent: "space-between",
              },
            ]}
          >
            <Entypo name="cross" size={30} color="#fff" />
            <Text style={[styles.boldText, { fontSize: 18 }]}>
              Thời gian tập luyện
            </Text>
            <TouchableOpacity onPress={timeWorkoutOnClose}>
              <Entypo name="cross" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.wrapperVertical}>
            <SmoothPicker
              initialScrollToIndex={selected}
              onScrollToIndexFailed={() => {}}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              data={dataTimeWorkOut}
              scrollAnimation
              onSelected={({ item, index }) => handleChange(index)}
              renderItem={(option) =>
                ItemToRender(option, selected, true, "timeWorkout")
              }
              magnet
              selectOnPress
            />
          </View>
          <TouchableOpacity
            style={styles.btnConfirm}
            onPress={timeWorkoutOnCloseSave}
          >
            <Text style={styles.btnConfirmText}>CẬP NHẬT</Text>
          </TouchableOpacity>
        </View>
      </Modalize>

      {/** chinh sua gio` */}
      <Modalize
        ref={timeNoti}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        adjustToContentHeight={true}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.flexRow,
              {
                width: "100%",
                paddingLeft: 20,
                paddingRight: 20,
                marginBottom: 20,
                justifyContent: "space-between",
              },
            ]}
          >
            <Entypo name="cross" size={30} color="#fff" />
            <Text style={[styles.boldText, { fontSize: 30, color: "#00789E" }]}>
              LẦN {editingArrIndex + 1}
            </Text>
            <TouchableOpacity onPress={timeNotiOnClose}>
              <Entypo name="cross" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={[styles.wrapperVertical, { alignItems: "flex-end" }]}>
              <SmoothPicker
                initialScrollToIndex={selectedHour}
                onScrollToIndexFailed={() => {}}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                data={dataHourArr}
                scrollAnimation
                onSelected={({ item, index }) => setSelectedHour(index)}
                renderItem={(option) =>
                  ItemToRender(option, selectedHour, true, "timeNotiHour")
                }
                magnet
                selectOnPress
              />
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "700",
                  marginTop: -45,
                  color: "#00789E",
                }}
              >
                :
              </Text>
            </View>
            <View
              style={[styles.wrapperVertical, { alignItems: "flex-start" }]}
            >
              <SmoothPicker
                initialScrollToIndex={selectedMinute}
                onScrollToIndexFailed={() => {}}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                data={dataMinuteArr}
                scrollAnimation
                onSelected={({ item, index }) => setSelectedMinute(index)}
                renderItem={(option) =>
                  ItemToRender(option, selectedMinute, true, "timeNotiMinute")
                }
                magnet
                selectOnPress
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.btnConfirm}
            onPress={timeNotiOnCloseSave}
          >
            <Text style={styles.btnConfirmText}>CẬP NHẬT</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </View>
  );
};

const styles = StyleSheet.create({
  confirmBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  scrollViewContainer: {
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    paddingTop: 30,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowOffset: {
      width: -4,
      height: 6,
    },
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6.0,
    elevation: 24,
  },
  colabRowContainer: {
    borderRadius: 20,
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowOffset: {
      width: -4,
      height: 6,
    },
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6.0,
    elevation: 24,
  },
  rowContainerImgBg: {
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowOffset: {
      width: -4,
      height: 4,
    },
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6.0,

    elevation: 24,
  },
  iconIMG: {
    width: 37,
    height: null,
    aspectRatio: 1,
    resizeMode: "contain",
    marginRight: 10,
  },
  boldText: {
    fontWeight: "700",
    color: "#003144",
    flexShrink: 1,
  },
  modalContainer: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
  btnConfirm: {
    borderRadius: 50,
    backgroundColor: "#00AEEF",
    width: "80%",
    alignItems: "center",
    paddingBottom: 15,
    paddingTop: 15,
    marginTop: 20,
    shadowOffset: {
      width: -4,
      height: 4,
    },
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6.0,
    elevation: 24,
  },
  btnConfirmText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 18,
  },
  wrapperVertical: {
    flex: 1,
    width: "100%",
    height: 250,
    justifyContent: "center",
    //  alignItems: "center",
    margin: "auto",
  },
  OptionWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 50,
  },
  changeWaterBtn: {
    backgroundColor: "#FFF",
    width: 24,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 2,
    marginLeft: 5,
    shadowOffset: {
      width: -4,
      height: 4,
    },
    borderRadius: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6.0,
    elevation: 24,
  },
  listTimerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  listTimerBtn: {
    marginLeft: 20,
    width: 24,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 2,
    shadowOffset: {
      width: -4,
      height: 4,
    },
    borderRadius: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6.0,
    elevation: 24,
  },
  confirmContainerWraper: {
    backgroundColor: "#fff",
  },
  confirmContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 30,
    paddingTop: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,

    backgroundColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
    elevation: 24,
  },
  confirmBtn: {
    backgroundColor: "#00AEEF",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    width: "80%",
    borderRadius: 50,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6.0,
    elevation: 24,
  },
});
export default RemindWaterScreen;
