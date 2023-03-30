import { AppTitle, TopBarNavigator } from ".";

export function Header() {
  return (
    <div
      className={`flex flex-row w-full my-[30px] items-baseline justify-between`}
    >
      <AppTitle />
      <TopBarNavigator />
    </div>
  );
}
