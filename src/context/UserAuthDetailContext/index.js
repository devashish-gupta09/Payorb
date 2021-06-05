import React from "react";

import { getVendorVerifiedDetails } from "../../services/vendor";

const USER_AUTH_DETAIL_ACTION_TYPES = {
  UPDATE_DETAILS: "UPDATE_DETAILS",
  REFETCH_DETAILS: "UPDATE_DETAILS",
};

const UserAuthDetailsContext = React.createContext();

function userAuthDetailsReducer(state, action) {
  switch (action.type) {
    case USER_AUTH_DETAIL_ACTION_TYPES: {
      return { details: action.details };
    }
    default: {
      throw new Error(`Unhandled action type : ${action.type}`);
    }
  }
}

function useUserAuthDetails() {
  return React.useContext(UserAuthDetailsContext);
}

function UserAuthDetailsProvider({ children }) {
  const [state, dispatch] = React.useReducer(userAuthDetailsReducer);
  const value = { state, dispatch };

  return (
    <UserAuthDetailsContext.Provider value={value}>
      {children}
    </UserAuthDetailsContext.Provider>
  );
}

async function useFetchUserAuthDetails(dispatch) {
  try {
    const response = await getVendorVerifiedDetails();
    dispatch({ type: USER_AUTH_DETAIL_ACTION_TYPES, details: response.data });
  } catch (err) {
    console.log(err);
  }
}

export {
  UserAuthDetailsProvider,
  useUserAuthDetails,
  USER_AUTH_DETAIL_ACTION_TYPES,
  useFetchUserAuthDetails,
};
