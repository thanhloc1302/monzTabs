import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "../../constants/firebase";

import CustomHeader from "../../components/CustomHeader";

const windowWidth = Dimensions.get("window").width;

const RegPhoneOTPScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { phonenumber } = route.params;
  const [btnDisabled, setBtnDisabled] = useState(true);

  const [phoneNumber, setPhoneNumber] = useState(phonenumber);
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const [resent, setResent] = useState(false);
  const [countDown, setCountDown] = useState(90);
  const timer = useRef();
  useEffect(() => {
    (async () => {
      await sendVerification();
      timer.current = setInterval(
        () => setCountDown((countDown) => countDown - 1),
        1000
      );
    })();
  }, []);

  useEffect(() => {
    if (countDown <= 0) {
      setResent(true);
      // return () => {
      clearInterval(timer.current);
      // };
    }
  }, [countDown]);

  const reSendVerification = () => {
    (async () => {
      await sendVerification();
      setCountDown(90);
      setResent(false);
      timer.current = setInterval(
        () => setCountDown((countDown) => countDown - 1),
        1000
      );
    })();
  };

  // Function to be called when requesting for a verification code
  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId)
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to be called when confirming the verification code that we received
  // from Firebase via SMS

  const triggerConfirmCode = () => {
    confirmCode();
    let timer1 = setTimeout(() => confirmCode(), 1000);

    // this will clear Timeout
    // when component unmount like in willComponentUnmount
    // and show will not change to true
    return () => {
      clearTimeout(timer1);
    };
  };

  const confirmCode = async () => {
    const credential = await firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );

    console.log(credential);

    await firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        // Do something with the results here
        navigation.navigate("RegInfo", {
          phonenumber: phonenumber,
        });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
      />

      <CustomHeader title={"Xác thực số điện thoại"} />
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Mã xác thực OTP đã được gửi đến số điện thoại sau:
        </Text>
        <Text
          style={{
            fontWeight: "700",
            color: "rgba(0, 49, 68, 0.72)",
            fontSize: 36,
            marginTop: 15,
          }}
        >
          {phoneNumber}
        </Text>
        <OTPInputView
          pinCount={6}
          style={styles.otpView}
          codeInputHighlightStyle={styles.codeInputHighlightStyle}
          codeInputFieldStyle={styles.codeInputFieldStyle}
          onCodeChanged={(value) => {
            if (value.length == 6) {
              setBtnDisabled(false);
            } else {
              setBtnDisabled(true);
            }
          }}
          onCodeFilled={(value) => {
            setCode(value);
            setBtnDisabled(false);
            // console.log(value);
          }}
        />
        <TouchableOpacity
          style={[styles.btnSubmit, { opacity: btnDisabled ? 0.3 : 1 }]}
          disabled={btnDisabled}
          onPress={() => {
            triggerConfirmCode();
          }}
        >
          <Text style={{ color: "#FFF", fontWeight: "700" }}>XÁC NHẬN</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "rgba(0, 55, 72, 0.72)" }}>
            Bạn chưa nhận được mã OTP?
          </Text>
          <TouchableOpacity
            style={{ opacity: resent ? 1 : 0.3 }}
            disabled={!resent}
            onPress={() => reSendVerification()}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                marginTop: 10,
                color: "rgba(0, 55, 72, 0.72)",
              }}
            >
              Gửi lại OTP ({countDown}s)
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  otpView: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 100,
    color: "black",
  },
  codeInputHighlightStyle: {
    width: windowWidth > 320 ? 50 : 42,
    height: windowWidth > 320 ? 48 : 40,
    borderWidth: 0,
    borderBottomWidth: 2,
    color: "black",
    borderBottomColor: "#17BED0",
    backgroundColor: "#F9F9F9",
    fontSize: 18,
    borderRadius: 8,
  },
  codeInputFieldStyle: {
    width: windowWidth > 320 ? 50 : 42,
    height: windowWidth > 320 ? 48 : 40,
    borderWidth: 0,
    color: "black",
    backgroundColor: "#F9F9F9",
    fontSize: 18,
    borderRadius: 8,
  },
  btnSubmit: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00AEEF",
    marginTop: 20,
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
export default RegPhoneOTPScreen;
