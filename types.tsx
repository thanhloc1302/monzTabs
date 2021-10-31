/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  DrugStore:undefined;
  DrugStoreDetail:undefined;
  RegPhone:undefined;
  RegPhoneOTP:undefined;
  RegInfo:undefined;
  RegSuccess:undefined;
  LoginChoise: undefined;
  LoginForm: undefined;
  Remind:undefined;
  RemindWater: undefined;
  RemindDrug:undefined;
  RemindDrugDetail: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  DrugStore:undefined;
  DrugStoreDetail:undefined;
  RegPhone:undefined;
  RegPhoneOTP:undefined;
  RegInfo:undefined;
  RegSuccess:undefined;
  Home:undefined;
  TabOne: undefined;
  TabTwo: undefined;
  LoginChoise: undefined;
  LoginForm: undefined;
  Remind:undefined;
  RemindWater: undefined;
  RemindDrug:undefined;
  RemindDrugDetail: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
