import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../Features/UserSlice";
import TourSlice from "../Features/TourSlice";
const store= configureStore({
  reducer:{
      user:UserSlice,
      tour:TourSlice
  }
})
export default store