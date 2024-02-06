import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitialState, IResponseById } from "../models";

const initialMovie: IResponseById = {
  Response: "False",
  inWatchlist: false,
};
const initialMovieList: IResponseById[] = [];

export const fetchMovieById = createAsyncThunk(
  'auth/getExampleThunk',
  async ({par, query}: {par: string, query: string}, thunkApi) => {
    const url = `https://www.omdbapi.com?apikey=64405bd2&${par}=${query}`;

    const { rejectWithValue, fulfillWithValue } = thunkApi;
          try{
          const response = await fetch(url);
          if (!response.ok) {
              return rejectWithValue(response.status)
          }
          const data = await response.json();
          return fulfillWithValue(data)
      }catch(error){
          throw rejectWithValue('Oops! Something went wrong. Try again!')
      }
  }
);

export const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movie: initialMovie,
    movieList: initialMovieList,
    status: 'idle',
    error: null,
  } as IInitialState,
  reducers: {
    addMovie: (state, action: PayloadAction<IResponseById>) => {
      if (action.payload.Response === "True" && !action.payload.inWatchlist) {
        state.movieList.push(action.payload);
        state.movie.inWatchlist = true;
      }
    },
    deleteMovie: (state, action: PayloadAction<IResponseById>) => {
      state.movieList = state.movieList.filter(item => item.imdbID !== action.payload.imdbID);
      state.movie = {
        ...action.payload,
        inWatchlist: false,
        };
    },
    resetSearch: (state) => {
      state.movie = initialMovie;
      state.status = 'idle';
    },
    findMovie: (state, action: PayloadAction<string>) => {
      const foundMovie = state.movieList.find(item => (item.imdbID && item.imdbID === action.payload));
      if (foundMovie) {
        state.movie = {
          ...foundMovie,
          inWatchlist: true,
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieById.fulfilled, (state, action: PayloadAction<IResponseById>) => {
        const findMovie = state.movieList.find(item => item.imdbID === action.payload.imdbID);
        if (findMovie) {
          state.movie = {
            ...action.payload,
            inWatchlist: true,
          }
        } else {
          state.movie = {
            ...action.payload,
            inWatchlist: false,
            };
          };
        state.status = 'fulfilled';
      })
      .addCase(fetchMovieById.pending, (state) => {
          state.status = 'pending';
          state.movie = initialMovie;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
        })
  }
})

export const {addMovie, deleteMovie, resetSearch, findMovie} = movieSlice.actions;
export default movieSlice.reducer;
