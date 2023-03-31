import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Header } from "../components";
import { i18n } from "../components/core/LanguageLoader";
import { config } from "../config";
import { setLanguage } from "../reducers/languageReducer";
import { wipeUser } from "../reducers/userReducer";

const LANGUAGES = ["it-IT", "en-US"];

export function SettingsPage() {
  const navigate = useNavigate();

  const LanguageChanger = useCallback(
    () => (
      <Button
        style={`mt-[50px] border-darkBlue bg-blue border-[2px] px-[20px] py-[10px] rounded-full`}
        onPress={() => {
          const currentLanguageIndex = LANGUAGES.indexOf(i18n.locale);
          i18n.locale =
            LANGUAGES[(currentLanguageIndex + 1) % LANGUAGES.length];
          setLanguage(i18n.locale);
        }}
      >
        <p className="font-bold text-white">{i18n.t("l.changeLanguage")}</p>
      </Button>
    ),
    []
  );

  const DangerZone = useCallback(
    () => (
      <div className={`mt-[100px] mb-[50px]`}>
        <Button
          style={`mt-[30px] border-[2px] border-black bg-red px-[20px] py-[10px] rounded-full`}
          onPress={() => {
            wipeUser();
            navigate("/");
            alert(i18n.t("l.resetDataDone"));
          }}
        >
          <p className="font-bold text-white">{i18n.t("l.resetData")}</p>
        </Button>
      </div>
    ),
    // eslint-disable-next-line
    []
  );

  const AppVersion = useCallback(
    () =>
      config.version ? (
        <p className={`absolute right-3 top-[6px] text-sm text-grey`}>
          v{config.version}
        </p>
      ) : null,
    []
  );

  const ScreenContent = () => (
    <>
      <LanguageChanger />
      <DangerZone />
    </>
  );

  return (
    <div className="flex flex-col items-center mx-[50px] mb-[50px]">
      <AppVersion />
      <Header />
      <ScreenContent />
    </div>
  );
}
