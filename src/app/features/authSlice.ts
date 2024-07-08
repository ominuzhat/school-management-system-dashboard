import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthInitialStateTypes = {
  success: boolean;
  token: string | null | undefined;
  message?: string | undefined;
};

const initialState: AuthInitialStateTypes = {
  success: false,
  token: null,
  message: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, { payload }: PayloadAction<AuthInitialStateTypes>) => {
      state.success = payload.success;
      state.token = payload.token;
    },
    loggedOut: (state) => {
      state.success = false;
      state.token = null;
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
