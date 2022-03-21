import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  actors: [],
  loading: true,
};

const actorsSlice = createSlice({
  name: "actors",
  initialState: initialState,
  reducers: {
    fetchingActors(state) {
      state.loading = true;
    },
    fetchedActors(state, action) {
      state.actors = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchingActors, fetchedActors } = actorsSlice.actions;
export default actorsSlice.reducer;
