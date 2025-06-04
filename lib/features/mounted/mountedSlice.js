import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mounted: false,
};

const mountedSlice = createSlice({
  name: "mounted",
  initialState,
  reducers: {
    setMounted(state, action) {
      state.mounted = action.payload;
    },
  },
});

export const { setMounted } = mountedSlice.actions;
export const selectMounted = (state) => state.mounted.mounted;
export default mountedSlice.reducer;