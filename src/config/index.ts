interface Config {
  environment?: string;
  version?: string;
  tmdbApiKey?: string;
}

export const config: Config = {
  environment: process.env.REACT_APP_STAGE,
  version: process.env.REACT_APP_VERSION,
  tmdbApiKey: process.env.REACT_APP_TMDB_API_KEY,
};
