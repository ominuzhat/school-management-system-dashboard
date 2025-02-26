import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type FilterTypes =
  | ({
      page_size?: number;
      skip?: number;
      key?: string | undefined;
    } & Record<string, any>)
  | undefined;

const initialState: FilterTypes = {
  page_size: 50,
  skip: 0,
  key: undefined,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setLimit: (state, { payload }: PayloadAction<number>) => {
      state.page_size = payload;
    },

    setSkip: (state, { payload }: PayloadAction<number>) => {
      state.skip = payload;
    },

    setKey: (state, { payload }: PayloadAction<string | undefined>) => {
      state.key = payload;
    },
  },
});

export const { setLimit, setSkip, setKey } = filterSlice.actions;

export default filterSlice.reducer;

// import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// export type FilterTypes =
//   | ({
//       page_size?: number;
//       skip?: number;
//       currentPage?: number;
//       key?: string | undefined;
//     } & Record<string, any>)
//   | undefined;

// const initialState: FilterTypes = {
//   page_size: 15,
//   skip: 0,
//   currentPage: 1, // Added currentPage
//   key: undefined,
// };

// const filterSlice = createSlice({
//   name: "filter",
//   initialState,
//   reducers: {
//     setLimit: (state, { payload }: PayloadAction<number>) => {
//       state.page_size = payload;
//     },

//     setSkip: (state, { payload }: PayloadAction<number>) => {
//       state.skip = payload;
//       state.currentPage = Math.floor(payload / state.page_size!) + 1; // Update currentPage
//     },

//     setCurrentPage: (state, { payload }: PayloadAction<number>) => {
//       state.currentPage = payload;
//       state.skip = (payload - 1) * state.page_size!; // Update skip based on page
//     },

//     setKey: (state, { payload }: PayloadAction<string | undefined>) => {
//       state.key = payload;
//     },
//   },
// });

// export const { setLimit, setSkip, setCurrentPage, setKey } = filterSlice.actions;
// export default filterSlice.reducer;
