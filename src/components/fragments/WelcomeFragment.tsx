import { useCallback, useState } from "react";
import { Button } from "../";
import { setFirstUse } from "../../reducers/userReducer";
import { i18n } from "../core/LanguageLoader";

export function WelcomeFragment() {
  // state
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  // const [finishing, setFinishing] = useState<boolean>(false);

  // // animations refs
  // const fadeAnim = useRef(new Animated.Value(0)).current;
  // const hiSlideAnim = useRef(
  //   new Animated.Value(2 * SCREEN_AVAILABLE_WIDTH)
  // ).current;
  // const slideAnim = useRef(
  //   new Animated.Value(2 * SCREEN_AVAILABLE_WIDTH)
  // ).current;

  // page navigation management
  const goPrev = (page: number) => setCurrentPageNumber(page - 1);

  const goNext = (page: number) => {
    if (page < 1) return setCurrentPageNumber(page + 1);
    // setFinishing(true);
    finish();
  };

  const finish = () => setFirstUse(false);

  // pages
  const Page0 = useCallback(() => {
    return (
      <div className={`items-center justify-center`}>
        {/* <Animated.View style={[{ transform: [{ translateX: hiSlideAnim }] }]}> */}
        <p className={`text-7xl mb-[60px]`}>{i18n.t("l.hi")}</p>
        {/* </Animated.View> */}
        <p className={`mb-xl px-lg text-xl`}>{i18n.t("l.welcome")}</p>
        <p className={`px-[10%] text-center`}>{i18n.t("l.welcomeCaption")}</p>
        <img
          className={`mt-xl h-[25%] `}
          // style={[tw, { resizeMode: "contain" }]}
          src={"../../../assets/favicon.png"}
          alt="App icon"
        />
      </div>
    );
  }, []);

  const Page1 = useCallback(() => {
    return (
      <div className={`items-center justify-center`}>
        <p className={`text-lg px-lg leading-10 text-center`}>
          {i18n.t("l.insertName")}
        </p>
      </div>
    );
  }, []);

  const Navigation = useCallback(
    () => (
      <div className={`flex-row flex-1 py-md px-xl justify-between items-end`}>
        {currentPageNumber > 0 ? (
          <Button onPress={() => goPrev(currentPageNumber)}>
            <p>{"<-"}</p>
          </Button>
        ) : (
          <div className={`flex-1`} />
        )}
        <Button onPress={() => goNext(currentPageNumber)}>
          <p>{"->"}</p>
        </Button>
      </div>
    ),
    [currentPageNumber]
  );

  // /**
  //  * Manages the initial "Hi!" animation and the pages slide
  //  * effect when navigating prev/next
  //  */
  // useEffect(() => {
  //   Animated.timing(hiSlideAnim, {
  //     toValue: 0,
  //     duration: 850,
  //     easing: Easing.elastic(0.9),
  //     useNativeDriver: Platform.OS !== "web",
  //   }).start();

  //   Animated.timing(slideAnim, {
  //     toValue: -(currentPageNumber - 0.5) * SCREEN_AVAILABLE_WIDTH,
  //     duration: 500,
  //     easing: Easing.bezier(0.4, 0, 0.2, 1),
  //     useNativeDriver: Platform.OS !== "web",
  //   }).start();
  // }, [currentPageNumber]);

  // /**
  //  * Manages the initial fade in and the closure fade out
  //  */
  // useEffect(() => {
  //   if (currentPageNumber === 0) {
  //     return Animated.timing(fadeAnim, {
  //       toValue: 1,
  //       duration: 600,
  //       useNativeDriver: Platform.OS !== "web",
  //     }).start();
  //   }
  //   if (finishing)
  //     return Animated.timing(fadeAnim, {
  //       toValue: 0,
  //       duration: 600,
  //       useNativeDriver: Platform.OS !== "web",
  //     }).start(() => finish());
  // }, [currentPageNumber, finishing]);

  return (
    // <Animated.View
    <div className={`flex-1 overflow-hidden`}>
      <div className={`flex-row flex-8 justify-center`}>
        <Page0 />
        <Page1 />
      </div>
      <Navigation />
    </div>
  );
}
