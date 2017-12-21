import { createAction } from './actions';

export const SHOW_USER_DETAILS = 'SHOW_USER_DETAILS';
export const HIDE_USER_DETAILS = 'HIDE_USER_DETAILS';

export default (
  state = {
    isUserDetailsVisible: false
  },
  { type }
) => {
  switch (type) {
    case SHOW_USER_DETAILS:
      return { isUserDetailsVisible: true };
    case HIDE_USER_DETAILS:
      return { isUserDetailsVisible: false };
    default:
      return state;
  }
};

export function showUserDetails() {
  return createAction(SHOW_USER_DETAILS);
}

export function hideUserDetails() {
  return createAction(HIDE_USER_DETAILS);
}
