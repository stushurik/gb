import { createAction } from './actions'

export const SHOW_USER_DETAILS = 'SHOW_USER_DETAILS';

export default (
  state = {
    isUserDetailsVisible: false
  },
  {type}
) => {
  switch (type) {
    case SHOW_USER_DETAILS:
      return {isUserDetailsVisible: true};
    default:
      return state;
  }
}

export function showUserDetails() {
  return createAction(SHOW_USER_DETAILS)
}