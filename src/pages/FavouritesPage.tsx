import { useCallback } from "react";
import { AppTitle, TopBarNavigator } from "../components";

export function FavouritesPage() {
  const Header = useCallback(
    () => (
      <div
        className={`flex flex-row w-full my-[30px] items-baseline justify-between`}
      >
        <AppTitle />
        <TopBarNavigator />
      </div>
    ),
    []
  );

  return (
    <div className="flex flex-col items-center mx-[50px]">
      <Header />
    </div>
  );
}
