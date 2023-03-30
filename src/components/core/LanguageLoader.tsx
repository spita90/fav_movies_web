import { I18n } from "i18n-js";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { __DEV__ } from "../../App";
import { TRANSLATIONS_EN } from "../../locale/translations_en";
import { TRANSLATIONS_IT } from "../../locale/translations_it";
import { languageState } from "../../reducers/store";

export const i18n = new I18n({ it: TRANSLATIONS_IT, en: TRANSLATIONS_EN });

export const LanguageLoader = () => {
  const { code: langCode } = useSelector(languageState);

  /**
   * Manages moment locale change on App language change
   */
  useEffect(() => {
    if (!langCode) return;
    if (__DEV__) console.log(`Locale set to ${langCode}`);
  }, [langCode]);

  i18n.locale = useSelector(languageState).code;
  i18n.enableFallback = true;
  i18n.defaultLocale = "en-US";
  return null;
};
