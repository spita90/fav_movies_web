import { useLocation, useNavigate } from "react-router-dom";
import { Button } from ".";
import { i18n } from "./core/LanguageLoader";

export function TopBarNavigator() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const BUTTONS: { title: string; path: string }[] = [
    { title: i18n.t("l.topRated"), path: "/" },
    { title: i18n.t("l.favourites"), path: "/favourites" },
    { title: i18n.t("l.settings"), path: "/settings" },
  ];

  return (
    <div>
      {BUTTONS.map((button, index) => {
        const isCurrentPath = currentPath === button.path;
        return (
          <Button
            style={`mx-[20px]`}
            key={index}
            onPress={() => {
              if (!isCurrentPath) {
                navigate(button.path);
              }
            }}
          >
            <p
              className={`font-bold text-2xl ${
                isCurrentPath ? "text-yellow" : ""
              }`}
            >
              {button.title}
            </p>
          </Button>
        );
      })}
    </div>
  );
}
