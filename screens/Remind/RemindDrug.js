import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import HTMLView from "react-native-htmlview";

import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import Collapsible from "react-native-collapsible";
import monzApi from "../../api/MonzApi";
import CustomHeader from "../../components/CustomHeader";

const ListReminder = ({ reminder_drug_input }) => {
  const [reminder_drug, setReminder_drug] = useState([]);

  useEffect(() => {
    setReminder_drug(reminder_drug_input);
    console.log(reminder_drug_input);
  }, [reminder_drug_input.length]);

  const remindColab = (index) => {
    const newArray = [...reminder_drug];
    newArray[index]["collap"] = !newArray[index]["collap"];
    setReminder_drug(newArray);
  };

  let list_remind_drug = <View />;

  if (reminder_drug) {
    list_remind_drug = reminder_drug.map(function (reminder, index) {
      var num_time = reminder.num_time.slice(1).slice(0, -1).split(",");
      var dose = reminder.num_pill.split(" ");
      var dose_per_day = dose[0] * num_time.length + " " + dose[1] + " /ngày";

      var meal_show = <View />;
      if (reminder.meal != "") {
        var meal_arr = reminder.meal.split(",");

        meal_show = meal_arr.map(function (meal, i) {
          var m;
          switch (meal) {
            case "before":
              m = "Trước bữa ăn";
              break;
            case "in":
              m = "Trong bữa ăn";
              break;
            case "after":
              m = "Sau bữa ăn";
              break;
          }

          return (
            <View key={i} style={styles.mealContainer}>
              <Text style={styles.collapText}>{m}</Text>
            </View>
          );
        });
        //meal_show = meal_show.join(" ").slice(0, -2);

        // meal_arr.map(function (meal, i) {
        //   console.log(meal);
        // });
      }

      var time_show = <View />;
      if (num_time) {
        time_show = num_time.map(function (time, i) {
          return (
            <View key={i} style={styles.mealContainer}>
              <Text style={styles.collapText}>{time}</Text>
            </View>
          );
        });
      }

      return (
        <View
          key={index}
          style={[
            styles.reminderDrugRow,
            styles.boxShadown,
            { backgroundColor: index % 2 ? "#00AEEF" : "#fff" },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 15,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: index % 2 ? "#fff" : "#00AEEF",
                  width: 25,
                  height: 25,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="checkmark"
                  size={20}
                  color={index % 2 ? "#00AEEF" : "#fff"}
                />
              </View>
              <View style={{ marginLeft: 15 }}>
                <HTMLView
                  textComponentProps={{
                    style: {
                      color: index % 2 ? "#fff" : "#003144",
                      fontSize: 16,
                      fontWeight: "bold",
                    },
                  }}
                  value={"<p>" + reminder.name + "</p>"}
                />
                <HTMLView
                  textComponentProps={{
                    style: {
                      color: index % 2 ? "#fff" : "#003144",
                      textTransform: "lowercase",
                    },
                  }}
                  value={"<p>" + dose_per_day + "</p>"}
                />
              </View>
            </View>
            <View style={[styles.editBtnContainer, styles.boxShadown]}>
              <TouchableOpacity style={styles.editBtn}>
                <SimpleLineIcons name="pencil" size={18} color="#00AEEF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.editBtn}>
                <Ionicons name="md-trash-outline" size={18} color="#00AEEF" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              paddingLeft: 15,
              paddingRight: 15,
              paddingBottom: 7,
            }}
          >
            <View
              style={{
                width: "100%",
                marginBottom: 8,
                borderBottomWidth: 0.5,
                borderBottomColor: index % 2 ? "#fff" : "rgba(0, 0, 0, 0.15)",
              }}
            />
            <TouchableOpacity
              style={{ width: "100%", alignItems: "center" }}
              onPress={() => {
                remindColab(index);
              }}
            >
              <Ionicons
                name={reminder.collap ? "ios-chevron-down" : "ios-chevron-up"}
                size={24}
                color={index % 2 ? "#fff" : "#00AEEF"}
              />
            </TouchableOpacity>
          </View>
          <Collapsible collapsed={reminder.collap}>
            <View style={styles.collapContainer}>
              <View style={styles.collapContent}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="alarm" size={32} color="#00AEEF" />
                  <Text style={styles.collapBoldText}>Dùng vào lúc</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Ionicons name="alarm" size={32} color="#fff" />
                  <View>
                    <View style={styles.mealRow}>{meal_show}</View>
                    <View style={styles.mealRow}>{time_show}</View>
                  </View>
                </View>
              </View>
            </View>
          </Collapsible>
        </View>
      );
    });
  }

  return <View>{list_remind_drug}</View>;
};

const RemindDrugScreen = () => {
  const navigation = useNavigation();
  const revisited = useIsFocused();
  const [reminder_drug, setReminderDrug] = useState([]);

  useEffect(() => {
    // Call only when screen open or when back on screen
    if (revisited) {
      monzApi.get_user_info_logedin().then((result) => {
        if (result) {
          monzApi.get_reminder_drug(result.id).then((val_remind_drug) => {
            if (val_remind_drug.error == 0) {
              for (i = 0; i < val_remind_drug.remainder_drug.length; i++) {
                val_remind_drug.remainder_drug[i]["collap"] = true;
              }
              setReminderDrug(val_remind_drug.remainder_drug);
            }
          });
        } else {
        }
      });
    }
  }, [revisited]);

  return (
    <View style={styles.mainContainer}>
      <CustomHeader title="Uống thuốc cùng MonZ" />
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={[
            styles.boxShadown,
            {
              backgroundColor: "#00AEEF",
              borderRadius: 20,
              alignItems: "center",
              paddingTop: 5,
              paddingBottom: 5,
              marginBottom: 20,
            },
          ]}
          onPress={() =>
            navigation.navigate("RemindDrugDetail", {
              remind_drug_id: 0,
            })
          }
        >
          <Ionicons name="add-circle" size={40} color="white" />
        </TouchableOpacity>

        <ListReminder reminder_drug_input={reminder_drug} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexDirectionRow: {
    flexDirection: "row",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  container: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "stretch",
  },
  boxShadown: {
    shadowOffset: {
      width: -4,
      height: 6,
    },
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8.0,
    elevation: 24,
  },
  reminderDrugRow: {
    marginBottom: 20,
    borderRadius: 20,
  },
  editBtnContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 5,
    paddingRight: 5,
  },
  editBtn: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  collapContainer: {
    borderRadius: 20,
    paddingTop: 3,
  },
  collapContent: {
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 3.0,
    elevation: 24,

    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
  },
  collapBoldText: {
    color: "#003144",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
  },
  collapText: {
    color: "#003144",
  },
  mealRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 10,
  },
  mealContainer: {
    backgroundColor: "#F9F9F9",
    paddingBottom: 7,
    paddingTop: 7,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    margin: 6,
  },
});
export default RemindDrugScreen;
