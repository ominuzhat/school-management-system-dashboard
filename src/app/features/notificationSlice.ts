import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type NotificationInitialStateTypes = {
  type: "success" | "info" | "warning" | "error";
  message: string | undefined;
  placement?:
    | "top"
    | "topLeft"
    | "topRight"
    | "bottom"
    | "bottomLeft"
    | "bottomRight";
};

const initialState: NotificationInitialStateTypes = {
  type: "success",
  message: undefined,
  placement: "topRight",
};

const notificationSlice = createSlice({
  name: "notification-slice",
  initialState,
  reducers: {
    openNotification: (
      state,
      { payload }: PayloadAction<NotificationInitialStateTypes>
    ) => {
      state.type = payload.type;
      state.message = payload.message;
      state.placement = payload.placement;
    },
    clearNotification: (state) => {
      state.type = "info";
      state.message = undefined;
      state.placement = "topRight";
    },
  },
});

export const { openNotification, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
