import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IResponseById } from "../models";

interface IInitialState {
  movie?: IResponseById,
  movieList: IResponseById[],
  status: string,
  error: null | string,
}

// const createAppAsyncThunk = createAsyncThunk.withTypes<{
//   state: RootState
//   dispatch: AppDispatch
//   rejectValue: MyKnownError
//   extra: { s: string; n: number }
// }>()

const initialMovie: IResponseById = require('./components/data.json');
const initialMovieList: IResponseById[] = [];

// const fetchMovieById = createAsyncThunk(
//   'movies/fetchMovieById',
//   async (url: string) => {
//     const response = await fetch(url)
//     return (await response.json()) as IResponseById
//   }
// )

const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (url: string) => {
    return await fetch(url)
      .then(res => res.json());
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
      state.movieList.push(action.payload)
    },
    deleteMovie: (state, action: PayloadAction<string>) => {
      state.movieList = state.movieList.filter(movie => movie.imdbID !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieById.fulfilled, (state, action: PayloadAction<IResponseById>) => {
        state.movie = action.payload;
        state.status = 'fulfilled';
      })
      .addCase(fetchMovieById.pending, (state) => {
        if (state.status === 'idle') {
          state.status = 'pending';
        }
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.status = 'rejected';
        })
  }
})

// export const { addMovie, deleteMovie} = movieSlice.actions;
export const MovieActions = { ...movieSlice.actions, fetchMovieById }
export default movieSlice.reducer;