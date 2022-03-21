import { configureStore } from "@reduxjs/toolkit";
import actorsReducer from "../features/actorsSlice";
import favActorsReducer from "../features/favActorsSlice";

export const store = configureStore({
  reducer: {
    actors: actorsReducer,
    favActors: favActorsReducer,
  },
});
