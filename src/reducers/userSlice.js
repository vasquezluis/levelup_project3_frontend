import { createSlice } from "@reduxjs/toolkit";

// TODO: aqui se declara el estado inicial y reducer
// TODO: slice = reducers + actions

const initialState = {
  id: "",
  user: "",
  token: "",
  permissions: [],
  roles: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  // ? funcion que toma el state y action y hace algo
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.permissions = action.payload.permission;
      state.roles = action.payload.roles;
    },
    unSetUser: (state, action) => {
      state.id = "";
      state.user = "";
      state.token = "";
      state.permissions = [];
      state.roles = [];
    },
  },
});

// ? export actions
export const { setUser, unSetUser } = userSlice.actions;

// ? este export es lo que va a estar en el store
export default userSlice.reducer;
