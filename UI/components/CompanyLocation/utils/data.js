import { PHONE_NUMBER, PLACEMENT_DATA } from 'utils/constants/contacts';

export const addresses = [
  {
    title: 'In USA',
    text: PLACEMENT_DATA.USA,
    pathText: PHONE_NUMBER.us,
    path: `tel:${PHONE_NUMBER.us}`,
    type: 'phone',
  },
  {
    title: 'In Argentina',
    text: PLACEMENT_DATA.Argentina,
  },
  {
    title: 'In Poland',
    text: PLACEMENT_DATA.Poland,
  },
  {
    title: 'In Cyprus',
    text: PLACEMENT_DATA.Cyprus,
  },
];

export const addressesForContactUs = [
  addresses[0],
  addresses[2],
  addresses[3],
  addresses[1],
];
