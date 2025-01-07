import { createSlice } from "@reduxjs/toolkit";

export type ThemesTypes = {
  themes: "dark" | "light";
  primaryColor: string;
  darkColor: string;
  color1: string; // primary color
  color2: string; // dark mode color
};

const storedTheme = localStorage.getItem("themes") as "dark" | "light" | null;

const initialState: ThemesTypes = {
  themes: storedTheme || "light",
  primaryColor: "#6097f9",
  darkColor: "#141414",
  color1: "#FFFFFF",
  color2: "#000000",
};

const themeSlice = createSlice({
  name: "themes",
  initialState,
  reducers: {
    toggleThemes: (state) => {
      state.themes = state.themes === "light" ? "dark" : "light";
      localStorage.setItem("themes", state.themes);
    },
  },
});

export const { toggleThemes } = themeSlice.actions;

export default themeSlice.reducer;
