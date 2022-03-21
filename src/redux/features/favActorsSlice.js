import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  actors: [],
  loading: false,
};

const favActorsSlice = createSlice({
  name: "favActors",
  initialState: initialState,
  reducers: {
    addFavActor(state, action) {
      state.loading = true;
      if (!state.actors.find((ac) => ac.id === action.payload.id)) {
        state.actors.push(action.payload);
      }
      state.loading = false;
    },
  },
});

export const { addFavActor } = favActorsSlice.actions;
export default favActorsSlice.reducer;
