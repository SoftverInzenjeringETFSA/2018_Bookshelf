

export const createBookClub = ( vals, navigator ) => {
  navigateTo(navigator, 'ClubComponent', vals);
}


const navigateTo = ( navigator, routeName, params ) => {
  navigator.navigate(routeName, params);
}
