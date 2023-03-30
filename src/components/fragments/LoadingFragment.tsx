import Lottie from "lottie-react";
import { useCallback } from "react";
import { AppTitle } from "..";

import animationJson from "../../animations/fav_movies.json";
/**
 * Shows a cool random animation with the app logo.
 * Uses Lottie for the animation
 */
export const LoadingFragment = () => {
  const LottieAnimation = useCallback(
    () => (
      <div className={`flex rounded-[40px] overflow-hidden`}>
        <Lottie
          className={`w-[400px] rounded-lg`}
          animationData={animationJson}
          loop={false}
          autoPlay
        />
      </div>
    ),
    []
  );

  return (
    <div className={`flex h-full justify-center items-center`}>
      <LottieAnimation />
      <div className={`mt-sm`}>
        <AppTitle />
      </div>
    </div>
  );
};
