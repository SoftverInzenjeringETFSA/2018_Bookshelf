import { StackNavigator } from 'react-navigation';

import AddMembers from '../pages/AddMembers';
import ClubComponent from '../pages/ClubComponent';
import CreateClub from '../pages/CreateClub';

const RootStack = StackNavigator(
  {
    AddMembers: {
      screen: AddMembers,
    },
    ClubComponent: {
      screen: ClubComponent,
    },
    CreateClub: {
      screen: CreateClub,
    },
  },
  {
    initialRouteName: 'CreateClub'
  }
);

export default RootStack;
