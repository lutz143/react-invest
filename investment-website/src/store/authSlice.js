import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async thunk action to signup a new user
export const signup = createAsyncThunk('auth/api/users', async({id, username, password}, thunkAPI) => {
  try {
    const res = await axios.post('http://localhost:3001/api/users', {id, username, password})
    return res.data
  } catch (err) {
    console.log(err)
    return thunkAPI.rejectWithValue(err.message)
  }
}) 

// async thunk action to login a new user
export const login = createAsyncThunk('auth/api/users/login', async({username, password}, thunkAPI) => {
  try {
    const res = await axios.post('http://localhost:3001/api/users/login', {username, password})
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue('Incorrect username or password')
  }
})

// async thunk action to delete a stock from the portfolio
export const deleteStock = createAsyncThunk('auth/api/portfolio/', async (stockId, user_id, thunkAPI) => {
  try {
    const response = await axios.delete(`http://localhost:3001/api/portfolio/${stockId}`, {data: {user_id}});
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue('uh oh' + err.message);
  }
});

const initialState = {
  user: '',
  user_id: null,
  portfolioIds: [],
  isLoggedIn: false,
  loading: false,
  error: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    portfolioIds: [], // initial state for portfolio IDs
  },
  reducers: {
    logout: (state, action) => {
      state.user = ''
      state.isLoggedIn = false
      state.loading = false
      state.error = null
    },
    deleteStockFromPortfolio: (state, action) => {
      const stockIdToDelete = action.payload;
      state.portfolioIds = state.portfolioIds.filter((id) => id !== stockIdToDelete);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.username
        state.user_id = action.payload.id
        state.isLoggedIn = true
        state.loading = false
        state.error = null
      })
      .addCase(signup.pending, (state, action) => {
        state.loading = true
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false
        state.isLoggedIn = false
        state.error = action.payload
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.username
        state.user_id = action.payload.user_id
        state.portfolioIds = action.payload.portfolioIds
        state.isLoggedIn = true
        state.loading = false
        state.error = null
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.isLoggedIn = false
        state.error = action.payload
      })
      .addCase(deleteStock.fulfilled, (state, action) => {
        // state.user_id = action.payload.user_id
        // state.portfolioIds = action.payload.portfolioIds
        // console.log(state.user_id)
        const stockIdToDelete = action.payload
        state.portfolioIds = state.portfolioIds.filter((id) => id !== stockIdToDelete)
      })
  }
})

export const { logout } = authSlice.actions
export const { deleteStockFromPortfolio } = authSlice.actions

export default authSlice.reducer;