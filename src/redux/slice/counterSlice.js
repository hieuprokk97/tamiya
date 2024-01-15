import { createSlice } from "@reduxjs/toolkit";
import { create } from "react-native-axios";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    round: 0,
    semiFinal: 0,
  },
  reducers: {
    updateRound: (state, actions) => {
      state.round = actions.payload;
    },
    updateSemiFinal: (state, actions) => {
      state.semiFinal = actions.payload;
    },
  },
});
export const { updateRound, updateSemiFinal } = counterSlice.actions;
export default counterSlice.reducer;
