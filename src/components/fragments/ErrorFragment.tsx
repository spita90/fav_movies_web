import axios from "axios";
import { useEffect } from "react";
import { Text } from "..";
import { config } from "../../config";
import { DomainError } from "../../types";
import { showToast } from "../../utils";
import { i18n } from "../core/LanguageLoader";

export interface ErrorPageProps {
  error: Error;
  resetErrorBoundary?: (...args: Array<unknown>) => void;
}

/**
 * An error page that displays in case of blocking errors
 */
export function ErrorFragment({ error }: ErrorPageProps) {
  useEffect(() => {
    if (
      axios.isAxiosError(error) &&
      error.code &&
      error.config &&
      error.config.url
    ) {
      error.message = `${error.message} (${error.code} in ${error.config.url}).`;
    }
    if (error && error.hasOwnProperty("message")) {
      const message =
        error instanceof DomainError
          ? i18n.t((error as DomainError).message)
          : error.message;
      showToast(message);
    }
  }, []);

  return (
    <div className="flex-1 flex-col content-stretch justify-center">
      <Text style={`self-center p-[10px] mb-[20px]`} size={"lg"}>
        {i18n.t("l.error")}
      </Text>
      <div className="absolute right-6 bottom-6 w-[50%] h-[50px] justify-end items-end">
        {config.version && <Text size={"sm"}>v{config.version}</Text>}
      </div>
    </div>
  );
}
