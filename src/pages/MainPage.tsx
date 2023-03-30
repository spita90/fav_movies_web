import { config } from "../config";

export function MainPage() {
  return (
    <div>
      <p>info</p>
      <p>{config.version}</p>
      <p>{config.environment}</p>
      <p>{config.tmdbApiKey}</p>
    </div>
  );
}
