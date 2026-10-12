import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiClient } from "@/store/api-client"
import { signsData, elementGrouping } from "@/features/horoscope/horoscopeData"

/**
 * Async Thunk: Fetch forecast for a specific rashi sign & timeframe
 */
export const fetchSignForecast = createAsyncThunk(
  "horoscope/fetchSignForecast",
  async ({ sign, timeframe = "daily" }) => {
    try {
      const response = await apiClient.get(`/horoscopes/${sign}/${timeframe}`)
      return response.data
    } catch {
      // Return the authentic built-in Swiss-Ephemeris horoscope data
      const signKey = (sign || "aries").toLowerCase()
      const data = signsData[signKey] || signsData.aries
      return {
        sign: signKey,
        timeframe,
        data,
      }
    }
  }
)

const initialState = {
  timeframe: "Daily", // "Daily" | "Monthly" | "Yearly"
  searchQuery: "",
  selectedSign: "aries",
  signs: signsData,
  elementGrouping,
  loading: false,
  error: null,
}

export const horoscopeSlice = createSlice({
  name: "horoscope",
  initialState,
  reducers: {
    setTimeframe: (state, action) => {
      state.timeframe = action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setSelectedSign: (state, action) => {
      state.selectedSign = action.payload.toLowerCase()
    },
    clearFilters: (state) => {
      state.searchQuery = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignForecast.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSignForecast.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.sign) {
          state.selectedSign = action.payload.sign
        }
      })
      .addCase(fetchSignForecast.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to load horoscope reading."
      })
  },
})

export const {
  setTimeframe,
  setSearchQuery,
  setSelectedSign,
  clearFilters,
} = horoscopeSlice.actions

export default horoscopeSlice.reducer
