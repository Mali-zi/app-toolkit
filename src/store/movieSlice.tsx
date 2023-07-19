import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitialState, IResponseById } from "../models";

const initialMovie: IResponseById = {
  Response: "False",
  inWatchlist: false,
};
const initialMovieList: IResponseById[] = [];

export const fetchMovieById = createAsyncThunk(
  'auth/getExampleThunk',
  async (url: string, thunkApi) => {
    const { rejectWithValue, fulfillWithValue } = thunkApi;
          try{
          const response = await fetch(url);
          if (!response.ok) {
              return rejectWithValue(response.status)
          }
          const data = await response.json();
          return fulfillWithValue(data)
      }catch(error){
          throw rejectWithValue('Не удалось выполнить поиск. Попробуйте еще раз!')
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
    toggleBtn: true,
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
    handleToggleBtn: (state) => {
      state.toggleBtn = !state.toggleBtn
    },
    resetSearch: (state) => {
      state.movie = initialMovie;
      state.status = 'idle';
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
        state.error = action.error.message;
        })
  }
})

export const {addMovie, deleteMovie, resetSearch} = movieSlice.actions;
export default movieSlice.reducer;
