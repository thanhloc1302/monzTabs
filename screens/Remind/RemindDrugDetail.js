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
import { useRoute } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import SmoothPicker from "react-native-smooth-picker";
import { Modalize } from "react-native-modalize";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Collapsible from "react-native-collapsible";

import CustomHeader from "../../components/CustomHeader";
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

const RemindDrugDetailScreen = () => {
  const route = useRoute();
  const { remind_drug_id } = route.params;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [arrayTimerCount, setArrayTimerCount] = useState(3);

  const [arrayTimer, setArrayTimer] = useState([
    { time: "8:30", hours: "8", minutes: "30" },
    { time: "12:30", hours: "12", minutes: "30" },
    { time: "21:30", hours: "21", minutes: "30" },
  ]);
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

  const addTimerArr = () => {
    var addmore = { time: "20:30", hours: "20", minutes: "30" };
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
  const timerArrayListRender = arrayTimer.map((timerObj, index) => {
    return (
      <View
        key={index}
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

  const [meal, setMeal] = useState([
    { code: "before", name: "trước", isCheck: false },
    { code: "in", name: "trong", isCheck: false },
    { code: "after", name: "sau", isCheck: false },
  ]);

  const [dateOfWeek, setDateOfWeek] = useState([
    { code: 2, name: "Thứ 2", textShow: 2, isCheck: true },
    { code: 3, name: "Thứ 3", textShow: 3, isCheck: false },
    { code: 4, name: "Thứ 4", textShow: 4, isCheck: false },
    { code: 5, name: "Thứ 5", textShow: 5, isCheck: false },
    { code: 6, name: "Thứ 6", textShow: 6, isCheck: false },
    { code: 7, name: "Thứ 7", textShow: 7, isCheck: false },
    { code: 8, name: "Chủ nhật", textShow: "chủ nhật", isCheck: false },
  ]);

  const [startEnd, setStartEnd] = useState("bắt đầu");

  const [numTimeCollapsed, setNumTimeCollapsed] = useState(true);
  const [mealCollapsed, setMealCollapsed] = useState(true);
  const [timeRangeCollapsed, setTimeRangeCollapsed] = useState(true);
  const [cycleCollapsed, setCycleCollapsed] = useState(true);

  const [userMess, setUserMess] = useState("Chủ tịch ơi đến giờ uống nước");
  useEffect(() => {
    console.log(remind_drug_id);
  }, []);

  let selectMeal = (index) => {
    let new_meal = [...meal];
    new_meal[index].isCheck = !new_meal[index].isCheck;
    setMeal(new_meal);
  };
  let mealShow = meal.map((meal, index) => {
    return (
      <TouchableWithoutFeedback key={index} onPress={() => selectMeal(index)}>
        <View
          style={[
            styles.flexRow,
            styles.boxShadow,
            {
              backgroundColor: "#fff",
              borderRadius: 20,
              width: "31%",
              justifyContent: "space-between",
              paddingTop: 5,
              paddingRight: 5,
              paddingBottom: 5,
              paddingLeft: 10,
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              flexShrink: 1,
              alignItems: "center",
              paddingRight: 4,
            }}
          >
            <Text style={{ fontSize: 12 }}>
              <Text style={{ textTransform: "capitalize" }}>{meal.name}</Text>{" "}
              bữa ăn
            </Text>
          </View>
          <AntDesign
            name="checkcircle"
            size={33}
            color={meal.isCheck ? "#FFD772" : "#DFDFDF"}
          />
          {/* <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 100,
            backgroundColor: "#FFD772",
          }}
        >
          <AntDesign name="check" size={24} color="black" />
        </View> */}
        </View>
      </TouchableWithoutFeedback>
    );
  });

  let selectDate = (index) => {
    let new_date = [...dateOfWeek];

    new_date[index].isCheck = !new_date[index].isCheck;
    setDateOfWeek(new_date);
  };
  let dateShow = dateOfWeek.map((date, index) => {
    return (
      <TouchableWithoutFeedback key={index} onPress={() => selectDate(index)}>
        <View
          style={[
            styles.boxShadow,
            {
              backgroundColor: "#fff",
              width: "18%",
              aspectRatio: 1,
              margin: 10,
              borderRadius: 20,
              borderWidth: 3,
              borderColor: "#00AEEF",
            },
          ]}
        >
          <View
            style={{
              width: "100%",
              aspectRatio: 1,
              justifyContent: "center",
              alignItems: "center",

              padding: 4,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "400" }}>{date.name}</Text>
          </View>

          <View
            style={{
              position: "absolute",
              alignSelf: "flex-end",
            }}
          >
            <Image
              source={
                date.isCheck
                  ? require("../../assets/icon/medical/check_yellow.png")
                  : require("../../assets/icon/medical/check_gray.png")
              }
              style={{
                width: 25,
                height: null,
                aspectRatio: 1,
                marginTop: -10,
                marginRight: -5,
                resizeMode: "contain",
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  });

  const timeRangeModal = useRef(null);
  const timeRangeOnOpen = (startend) => {
    // setSelected(dataTimeWorkOut.indexOf(userTimeWorkOut));
    setStartEnd(startend);
    timeRangeModal.current?.open();
  };
  const timeRangeOnClose = () => {
    timeRangeModal.current?.close();
  };
  const timeRangeOnCloseSave = () => {
    // setUserTimeWorkOut(dataTimeWorkOut[selected]);
    timeRangeModal.current?.close();
  };
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title={"Uống thuốc cùng MonZ"} />
      <KeyboardAwareScrollView
        style={styles.scrollViewContainer}
        extraScrollHeight={50}
      >
        <ScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={styles.container}
        >
          {/* tên thuốc*/}
          <View style={[styles.rowContainerImgBg, styles.boxShadow]}>
            <ImageBackground
              source={require("../../assets/imgs/remainder-water-bg.png")}
              resizeMode="stretch"
              imageStyle={{ borderRadius: 20 }}
              style={{}}
            >
              <View
                style={[
                  styles.flexRow,
                  styles.paddingRow,
                  {
                    justifyContent: "space-between",
                  },
                ]}
              >
                <Image
                  source={require("../../assets/icon/medical/water.png")}
                  style={styles.iconIMG}
                />
                <TextInput
                  placeholder="Tên thuốc..."
                  placeholderTextColor="#007BA3"
                  keyboardType="default"
                  style={{ flex: 1, marginLeft: 10, marginRight: 10 }}
                  onChangeText={(text) => {}}
                />
                <Switch
                  trackColor={{ false: "#767577", true: "#FFD772" }}
                  thumbColor={"#f4f3f4"}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                />
              </View>
              <View
                style={[
                  styles.flexRow,
                  {
                    paddingBottom: 10,
                    paddingTop: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    backgroundColor: "#00AEEF",
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: "#fff",
                    justifyContent: "space-between",
                  },
                ]}
              >
                <View style={styles.flexRow}>
                  <MaterialCommunityIcons name="pill" size={34} color="#fff" />
                  <Text style={{ color: "#fff" }}> 2 Viên</Text>
                </View>
                <TouchableWithoutFeedback>
                  <Text>Chọn đơn vị</Text>
                </TouchableWithoutFeedback>
              </View>
            </ImageBackground>
          </View>

          {/** số lần dùng trong ngày */}
          <View style={[styles.rowContainer, styles.boxShadow]}>
            <View
              style={[
                styles.flexRow,
                styles.paddingRow,
                { justifyContent: "space-between" },
              ]}
            >
              <View style={styles.flexRow}>
                <Image
                  source={require("../../assets/icon/medical/pill_clock.png")}
                  style={styles.iconIMG}
                />
                <Text style={styles.boldText}>Số lần dùng trong ngày</Text>
              </View>

              <View style={styles.flexRow}>
                <TouchableOpacity
                  style={styles.changeWaterBtn}
                  onPress={minusTimerArr}
                >
                  <Text style={styles.boldText}>-</Text>
                </TouchableOpacity>
                <Text style={{ marginLeft: 10, marginRight: 10 }}>
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

            <View style={styles.rowHorizon} />

            <View>
              <TouchableOpacity
                onPress={() => {
                  setNumTimeCollapsed(!numTimeCollapsed);
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.collapIcon}>
                    {numTimeCollapsed ? (
                      <Feather name="chevron-down" size={26} />
                    ) : (
                      <Feather name="chevron-up" size={26} />
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.boxShadowCollap}>
                <Collapsible
                  collapsed={numTimeCollapsed}
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

          {/** dùng với bữa ăn */}
          <View style={[styles.rowContainer, styles.boxShadow]}>
            <View style={[styles.flexRow, styles.paddingRow]}>
              <Image
                source={require("../../assets/icon/medical/meal.png")}
                style={styles.iconIMG}
              />
              <Text style={styles.boldText}>Uống trước / trong / sau ăn</Text>
            </View>

            <View style={styles.rowHorizon} />

            <View>
              <TouchableOpacity
                onPress={() => {
                  setMealCollapsed(!mealCollapsed);
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.collapIcon}>
                    {mealCollapsed ? (
                      <Feather name="chevron-down" size={26} />
                    ) : (
                      <Feather name="chevron-up" size={26} />
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
              <View>
                <Collapsible
                  collapsed={mealCollapsed}
                  style={{
                    borderRadius: 20,
                    backgroundColor: "#fff",
                  }}
                >
                  <View
                    style={[
                      styles.flexRow,
                      {
                        borderRadius: 20,
                        overflow: "hidden",
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 20,
                        justifyContent: "space-between",
                      },
                    ]}
                  >
                    {mealShow}
                  </View>
                </Collapsible>
              </View>
            </View>
          </View>

          {/** Thời gian sử dụng */}
          <View style={[styles.rowContainer, styles.boxShadow]}>
            <View style={[styles.flexRow, styles.paddingRow]}>
              <MaterialCommunityIcons name="clock" size={34} color="#00AEEF" />
              <Text style={styles.boldText}>Thời gian sử dụng</Text>
            </View>

            <View style={styles.rowHorizon} />

            <View>
              <TouchableOpacity
                onPress={() => {
                  setTimeRangeCollapsed(!timeRangeCollapsed);
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.collapIcon}>
                    {timeRangeCollapsed ? (
                      <Feather name="chevron-down" size={26} />
                    ) : (
                      <Feather name="chevron-up" size={26} />
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.boxShadowCollap}>
                <Collapsible
                  collapsed={timeRangeCollapsed}
                  style={{
                    borderRadius: 20,
                    backgroundColor: "#fff",
                  }}
                >
                  <View
                    style={[
                      styles.flexRow,
                      {
                        borderRadius: 20,
                        overflow: "hidden",
                        paddingBottom: 15,
                        paddingTop: 15,
                        backgroundColor: "#00AEEF",
                        justifyContent: "space-evenly",
                      },
                    ]}
                  >
                    <TouchableWithoutFeedback
                      onPress={() => timeRangeOnOpen("bắt đầu")}
                    >
                      <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "#fff", fontSize: 24 }}>31</Text>
                        <View
                          style={{
                            borderTopWidth: 2,
                            borderTopColor: "#FFF",
                            paddingTop: 15,
                            marginTop: 10,
                          }}
                        >
                          <Text style={{ color: "#FFF" }}>Tháng 5, 2021</Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                    <Feather
                      name="arrow-right"
                      size={23}
                      color="#fff"
                      style={{ marginTop: 7 }}
                    />
                    <TouchableWithoutFeedback
                      onPress={() => timeRangeOnOpen("kết thúc")}
                    >
                      <View style={{ alignItems: "center" }}>
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 24,
                            fontWeight: "400",
                          }}
                        >
                          05
                        </Text>
                        <View
                          style={{
                            borderTopWidth: 2,
                            borderTopColor: "#FFF",
                            paddingTop: 10,
                            marginTop: 10,
                          }}
                        >
                          <Text style={{ color: "#FFF" }}>Tháng 5, 2021</Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </Collapsible>
              </View>
            </View>
          </View>

          {/** chu kỳ sử dụng */}
          <View style={[styles.rowContainer, styles.boxShadow]}>
            <View style={[styles.flexRow, styles.paddingRow]}>
              <FontAwesome name="calendar-check-o" size={34} color="#00AEEF" />
              <Text style={styles.boldText}>Chu kỳ sử dụng</Text>
            </View>

            <View style={styles.rowHorizon} />

            <View>
              <TouchableOpacity
                onPress={() => {
                  setCycleCollapsed(!cycleCollapsed);
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.collapIcon}>
                    {cycleCollapsed ? (
                      <Feather name="chevron-down" size={26} />
                    ) : (
                      <Feather name="chevron-up" size={26} />
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.boxShadowCollap}>
                <Collapsible
                  collapsed={cycleCollapsed}
                  style={{
                    borderRadius: 20,
                    backgroundColor: "#fff",
                  }}
                >
                  <View
                    style={[
                      styles.flexRow,
                      {
                        borderRadius: 20,
                        overflow: "hidden",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        paddingTop: 5,
                        paddingBottom: 5,
                      },
                    ]}
                  >
                    {dateShow}
                  </View>
                </Collapsible>
              </View>
            </View>
          </View>

          {/** loi nhac */}

          <View
            style={[
              styles.rowContainer,
              styles.boxShadow,
              styles.paddingRow,
              styles.flexRow,
              { alignItems: "flex-start" },
            ]}
          >
            <Image
              source={require("../../assets/icon/medical/mess_alarm.png")}
              style={[styles.iconIMG, { marginTop: 4 }]}
            />
            <View style={{ flex: 1 }}>
              <Text style={{}}>Tạo lời nhắc</Text>
              <TextInput
                multiline={true}
                placeholder="Lời nhắc"
                keyboardType="default"
                value={userMess}
                style={[styles.boldText, { flex: 1 }]}
                onChangeText={(text) => {
                  setUserMess(text);
                }}
              />
            </View>

            <View></View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

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
  scrollViewContainer: {
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  boxShadow: {
    shadowOffset: {
      width: -4,
      height: 6,
    },

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6.0,
    elevation: 24,
  },
  boxShadowCollap: {
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6.0,
    elevation: 24,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  paddingRow: {
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  rowContainer: {
    width: "90%",
    borderRadius: 25,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  rowContainerImgBg: {
    borderRadius: 25,
    marginBottom: 15,
    backgroundColor: "#fff",
    width: "90%",
  },
  iconIMG: {
    width: 30,
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
  collapIcon: {
    color: "#00AEEF",
    marginTop: 5,
    marginBottom: 5,
    fontSize: 20,
  },
  rowHorizon: {
    width: "88%",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    marginTop: 10,
    alignSelf: "center",
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
});

export default RemindDrugDetailScreen;
