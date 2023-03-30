import { Text } from "./";

export interface AppTitleProps {
  ignoreFontFamily?: boolean;
}

export function AppTitle({ ignoreFontFamily }: AppTitleProps) {
  return (
    <div className={`flex-row items-baseline`}>
      <Text ignoreFontFamily={ignoreFontFamily} size="tt">
        Fav
      </Text>
      <Text ignoreFontFamily={ignoreFontFamily} size="tt" bold>
        Movies
      </Text>
    </div>
  );
}
