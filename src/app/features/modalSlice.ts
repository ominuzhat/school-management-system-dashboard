import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalInitialStateTypes = {
  open: boolean;
  title: string | undefined;
  content: React.ReactNode | undefined;
};

const initialState: ModalInitialStateTypes = {
  open: false,
  title: undefined,
  content: undefined,
};

const modalSlice = createSlice({
  name: "common-slice",
  initialState,
  reducers: {
    showModal: (
      state,
      {
        payload,
      }: PayloadAction<
        | {
            title: string | undefined;
            content: React.ReactNode | undefined;
          }
        | undefined
      >
    ) => {
      state.open = true;
      state.title = payload?.title;
      state.content = payload?.content;
    },

    closeModal: (state) => {
      state.open = false;
      state.title = undefined;
      state.content = undefined;
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
