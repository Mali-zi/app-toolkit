export interface IResponseById {
  Title?:      string;
  Year?:       string;
  Rated?:      string;
  Released?:   string;
  Runtime?:    string;
  Genre?:      string;
  Director?:   string;
  Writer?:     string;
  Actors?:     string;
  Plot?:       string;
  Language?:   string;
  Country?:    string;
  Awards?:     string;
  Poster?:     string;
  Ratings?:    Rating[];
  Metascore?:  string;
  imdbRating?: string;
  imdbVotes?:  string;
  imdbID?:     string;
  Type?:       string;
  DVD?:        string;
  BoxOffice?:  string;
  Production?: string;
  Website?:    string;
  Response:    string;
  Error?:      string;
  inWatchlist?: boolean,
}

export interface Rating {
  Source?: string;
  Value?:  string;
}
export interface IInitialState {
  movie: IResponseById,
  movieList: IResponseById[],
  status: string,
  error: any,
  toggleBtn: boolean,
}

export interface Props {
  url: string, 
  opts: string
}

export interface SearchResultProps {
  id: string, 
  children: React.ReactNode
}

// export interface HandleResponseChangeProps {
//   query: IQueryByTitle | IQueryById, 
//   setQuery: (val: IQueryByTitle | IQueryById) => void,
//   field: string, 
//   event: ChangeEvent<HTMLInputElement>
// }

// export interface PostCardProps {
//   post: Post,
//   children: React.ReactElement;
// }

// export interface CreatePostsProps {
//   posts: Post[]
//   setPosts: (val: Post[]) => void,
// }

// export interface NewPostProps {
//   setPosts: (val: Post[]) => void,
// }

// export interface EditPostProps {
//   post: Post, 
//   setPost: (val: Post) => void,
//   setEdit: (val: boolean) => void, 
// }

// export interface LinkProps
//   extends Omit<
//     React.AnchorHTMLAttributes<HTMLAnchorElement>,
//     "href"
//   > {
//   replace?: boolean;
//   state?: any;
//   to: To;
//   reloadDocument?: boolean;
//   preventScrollReset?: boolean;
//   relative?: "route" | "path";
// }

// type To = string | Partial<Path>;

// interface Path {
//   pathname: string;
//   search: string;
//   hash: string;
// }

// export interface IProps1 {
//   event: React.FormEvent<HTMLFormElement>
//   massage: string, 
//   setMassage: (val: string) => void, 
//   handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
// };

// export interface IProps2 {
//   posts: IPost[], 
//   setPosts: (val: IPost[]) => void,
// };

// export interface ButtonProps {
//   handleDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
//   handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
//   handleUpdate?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
// }