

export const createBookClub = ( vals, navigator ) => {
  navigateTo(navigator, 'ClubComponent', vals);
}

export const vratiSeNaPocetnu=(vals,navigator)=>{
  navigateTo(navigator,'CreateClub');
}

export const DodajClanove=(vals,navigator)=>{
  navigateTo(navigator,'AddMembers');
}


const navigateTo = ( navigator, routeName, params ) => {
  navigator.navigate(routeName, params);
}
