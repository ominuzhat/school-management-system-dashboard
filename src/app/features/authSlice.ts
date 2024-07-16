import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthInitialStateTypes = {
  success: boolean;
  access_token: string | null | undefined;
  message?: string | undefined;
};

const initialState: AuthInitialStateTypes = {
  success: false,
  access_token: null,
  message: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, { payload }: PayloadAction<AuthInitialStateTypes>) => {
      state.success = payload.success;
      state.access_token = payload.access_token;
    },
    loggedOut: (state) => {
      state.success = false;
      state.access_token = null;
    },

    setMessage: (state, { payload }: PayloadAction<string | undefined>) => {
      state.message = payload;
    },

    clearMessage: (state) => {
      state.message = undefined;
    },
  },
});

export const { loggedIn, loggedOut, setMessage, clearMessage } =
  authSlice.actions;
export default authSlice.reducer;
