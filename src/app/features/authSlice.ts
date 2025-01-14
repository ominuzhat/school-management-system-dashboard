import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthInitialStateTypes = {
  success: boolean;
  access: string | null | undefined;
  message?: string | undefined;
};

const initialState: AuthInitialStateTypes = {
  success: false,
  access: null,
  message: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, { payload }: PayloadAction<AuthInitialStateTypes>) => {
      state.success = payload.success;
      state.access = payload.access;
    },
    loggedOut: (state) => {
      state.success = false;
      state.access = null;
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
