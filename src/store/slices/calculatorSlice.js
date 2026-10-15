import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/store/api-client";

/**
 * Async Thunk: Calculate Janam Kundli / Horoscope
 * Payload shape expected by backend /api/v1/vedic/horoscope:
 * {
 *   name, gender, dob, tob, isTimeUnknown,
 *   location: { city, lat, lng, timezoneOffset }
 * }
 */
export const calculateKundli = createAsyncThunk(
  "calculators/calculateKundli",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/vedic/horoscope", payload);
      if (response.data && response.data.success) {
        // Cache last calculation in local storage for quick reload
        try {
          localStorage.setItem(
            "astrotring_last_kundli",
            JSON.stringify({
              input: payload,
              data: response.data.data,
              computedAt: new Date().toISOString(),
            })
          );
        } catch {
          // Ignore local storage write errors
        }
        return response.data.data;
      }
      return rejectWithValue(
        response.data?.message || "Failed to calculate birth chart."
      );
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Calculation service currently unavailable. Please verify coordinates and try again.";
      return rejectWithValue(message);
    }
  }
);

/**
 * Async Thunk: Location Autocomplete & Geocoding
 */
export const searchLocations = createAsyncThunk(
  "calculators/searchLocations",
  async (query, { rejectWithValue }) => {
    if (!query || query.trim().length < 2) {
      return [];
    }
    try {
      const response = await apiClient.get("/vedic/location/autocomplete", {
        params: { query: query.trim(), limit: 6 },
      });
      if (response.data && response.data.success) {
        return response.data.results || [];
      }
      return [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Location search failed."
      );
    }
  }
);

/**
 * Load cached Kundli if available
 */
const getInitialKundli = () => {
  try {
    const cached = localStorage.getItem("astrotring_last_kundli");
    if (cached) {
      const parsed = JSON.parse(cached);
      return {
        data: parsed.data || null,
        lastInput: parsed.input || null,
      };
    }
  } catch {
    // Ignore parse error
  }
  return { data: null, lastInput: null };
};

const initialCached = getInitialKundli();

const initialState = {
  kundliData: initialCached.data,
  lastInput: initialCached.lastInput,
  activeDivisionalChart: "D1", // "D1" | "D9" | "D10"
  status: initialCached.data ? "succeeded" : "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,

  // Location suggestions state
  locationQuery: "",
  locationSuggestions: [],
  isSearchingLocation: false,
};

export const calculatorSlice = createSlice({
  name: "calculators",
  initialState,
  reducers: {
    setDivisionalChart: (state, action) => {
      state.activeDivisionalChart = action.payload;
    },
    clearKundli: (state) => {
      state.kundliData = null;
      state.status = "idle";
      state.error = null;
      try {
        localStorage.removeItem("astrotring_last_kundli");
      } catch {
        // Ignore
      }
    },
    clearLocationSuggestions: (state) => {
      state.locationSuggestions = [];
      state.isSearchingLocation = false;
    },
    setLocationQuery: (state, action) => {
      state.locationQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // calculateKundli
      .addCase(calculateKundli.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(calculateKundli.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.kundliData = action.payload;
        state.error = null;
      })
      .addCase(calculateKundli.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to calculate birth chart.";
      })

      // searchLocations
      .addCase(searchLocations.pending, (state) => {
        state.isSearchingLocation = true;
      })
      .addCase(searchLocations.fulfilled, (state, action) => {
        state.isSearchingLocation = false;
        state.locationSuggestions = action.payload || [];
      })
      .addCase(searchLocations.rejected, (state) => {
        state.isSearchingLocation = false;
        state.locationSuggestions = [];
      });
  },
});

export const {
  setDivisionalChart,
  clearKundli,
  clearLocationSuggestions,
  setLocationQuery,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
