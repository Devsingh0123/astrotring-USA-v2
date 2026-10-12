import { configureStore } from "@reduxjs/toolkit"

/**
 * AstroTring Redux Store Configuration
 * Feature slices are imported from their respective feature modules:
 * e.g., features/auth/authSlice.js, features/vaani/vaaniSlice.js
 */

// Initial root state reducer placeholder until feature slices are mounted
const initialRootReducer = (state = { ready: true }, _action) => {
  return state
}

export const store = configureStore({
  reducer: {
    app: initialRootReducer,
    // Register feature slices here:
    // auth: authReducer,
    // vaani: vaaniReducer,
    // user: userReducer,
    // reports: reportsReducer,
    // horoscope: horoscopeReducer,
    // compatibility: compatibilityReducer,
    // calculators: calculatorsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
})

export default store
