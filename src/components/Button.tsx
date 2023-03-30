import React from "react";

import { ColorsType } from "../theme";

export interface ButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  style?: string;
  children?: string | React.ReactNode;
  color?: ColorsType;
}

/**
 * An highly customizable Button component that replaces
 * the default one
 * @param onPress function that executes on button press
 * @param disabled disables the button
 * @param style the button style
 * @param children the button content
 * @param color the button color
 */
export const Button: React.FC<ButtonProps> = ({
  onPress,
  disabled,
  style,
  children,
  color,
}: ButtonProps) => {
  return (
    <button
      onClick={() => {
        if (!disabled && onPress) {
          onPress();
        }
      }}
    >
      <div
        className={`py-md px-lg rounded-5 items-center justify-center bg-${
          color ?? "white"
        } opacity-${!disabled ? "100" : "60"} ${style}`}
      >
        {children}
      </div>
    </button>
  );
};
