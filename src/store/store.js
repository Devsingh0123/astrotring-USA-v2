import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/store/slices/authSlice"
import horoscopeReducer from "@/store/slices/horoscopeSlice"

/**
 * AstroTring Redux Store Configuration
 * Feature slices are imported from "@/store/slices/"
 */

// Initial root state reducer placeholder until feature slices are mounted
const initialRootReducer = (state = { ready: true }, _action) => {
  return state
}

export const store = configureStore({
  reducer: {
    app: initialRootReducer,
    auth: authReducer,
    horoscope: horoscopeReducer,
    // vaani: vaaniReducer,
    // user: userReducer,
    // reports: reportsReducer,
    // compatibility: compatibilityReducer,
    // calculators: calculatorsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
