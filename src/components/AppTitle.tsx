export interface AppTitleProps {
  ignoreFontFamily?: boolean;
}

export function AppTitle({ ignoreFontFamily }: AppTitleProps) {
  return (
    <div className={`flex flex-row items-baseline`}>
      <p className="text-3xl">Fav</p>
      <p className="text-3xl font-bold">Movies</p>
    </div>
  );
}
