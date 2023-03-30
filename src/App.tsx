import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { AppRouter } from "./AppRouter";
import { ErrorFragment } from "./components";
import { AppLoader } from "./components/core/AppLoader";
import { LanguageLoader } from "./components/core/LanguageLoader";
import { persistor, store } from "./reducers/store";
import { DomainError } from "./types";

export const __DEV__ = process.env.NODE_ENV === "development";

export const TMDB_IMAGES_BASE_URL = "https://image.tmdb.org/t/p/w500";

const onError = (error: Error) => {
  if (error instanceof DomainError && error.fatal) {
    localStorage.clear();
  }
};

export function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={`items-center`}>
          <LanguageLoader />
          <ErrorBoundary
            onError={onError}
            FallbackComponent={({ error, resetErrorBoundary }) => (
              <ErrorFragment
                error={error}
                resetErrorBoundary={resetErrorBoundary}
              />
            )}
          >
            <AppLoader>
              <>
                <ToastContainer />
                <AppRouter />
              </>
            </AppLoader>
          </ErrorBoundary>
        </div>
      </PersistGate>
    </Provider>
  );
}
