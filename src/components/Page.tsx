import React from "react";
import { SCREEN_AVAILABLE_WIDTH } from "../App";

export interface PageProps {
  children: React.ReactNode;
  padded?: boolean;
}

/**
 * A configurable page wrapper
 * @param children the page content
 * @param padded reduces the children available space
 */
export function Page({ children, padded }: PageProps) {
  return (
    <div
      className={`w-[${SCREEN_AVAILABLE_WIDTH}px] flex-1 ${
        padded ? "px-xs" : ""
      }`}
    >
      {children}
    </div>
  );
}
