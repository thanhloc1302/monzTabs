/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              TabOneScreen: 'home',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
        },
      },
      DrugStore:'drugstore',
      DrugStoreDetail:'drugstoredetail',
      RegPhone:'regphone',
      RegPhoneOTP:'regphoneotp',
      RegInfo:'reginfo',
      RegSuccess:'regsuccess',
      LoginChoise: 'loginchoise',
      LoginForm: 'loginform',
      Remind:'remind',
      RemindWater:'remindwater',
      RemindDrug:'reminddrug',
      RemindDrugDetail:'reminddrugdetail',
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
