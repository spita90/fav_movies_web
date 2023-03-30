import { useEffect, useState } from "react";
import { LoadingFragment } from "..";
import { config } from "../../config";

/**
 * Manages App initialization before displaying it
 */
export function AppLoader({ children }: { children: JSX.Element }) {
  const [appInitialized, setappInitialized] = useState(false);

  // const fadeOutAnim = useRef(new Animated.Value(1)).current;

  const initializeApp = async () => {
    // Eventual initialization code
    setTimeout(() => {
      setappInitialized(true);
    }, 2500);
  };

  useEffect(() => {
    // App entry point
    if (config.environment !== "prod") {
      config.environment && console.log(config.environment);
      config.version && console.log(config.version);
    }

    initializeApp();
  }, []);

  // /**
  //  * Handles the fade-out animation when loading is finished
  //  */
  // useEffect(() => {
  //   if (!appInitialized || !fontsLoaded) return;
  //   Animated.timing(fadeOutAnim, {
  //     toValue: 0,
  //     duration: 400,
  //     useNativeDriver: Platform.OS !== "web",
  //   }).start(() => {
  //     setCanRenderChildren(true);
  //   });
  // }, [appInitialized, fontsLoaded]);

  if (!appInitialized) {
    return (
      <div className={`absolute top-0 w-full h-full`}>
        <LoadingFragment />
      </div>
    );
  }

  return children;
}
