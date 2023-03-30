import React from "react";
import { Button } from ".";
import {
  ColorsType,
  fontSizes,
  FontSizeType,
  Sizes,
  SpacingType,
} from "../theme";

export interface Props {
  children: React.ReactNode | string;
  size?: FontSizeType | number;
  color?: ColorsType | string;
  textWhite?: boolean;
  bold?: boolean;
  center?: boolean;
  onPress?: () => void;
  style?: string;
  textStyle?: string;
  numberOfLines?: number;
  mtop?: SpacingType | boolean;
  padding?: number;
  allowFontScaling?: boolean;
  ignoreFontFamily?: boolean;
  testID?: string;
}

/**
 * A practical and highly configurable text component
 * that replaces the default one
 * @param children the content of the text field (can also be another Text)
  @param size the font size
  @param bold thickens the font
  @param color the font color
  @param textWhite shorthand for white color text
  @param center centers the text
  @param onPress a function executen on text press
  @param style the style of the text container
  @param textStyle the style of the text itself
  @param numberOfLines if the text rows exceed this number, 3 dots will be shown
  @param mtop the top margin
  @param padding the text padding from the container
  @param allowFontScaling enables font scaling
  @param ignoreFontFamily uses the default system font
 */
export function Text({
  children,
  size,
  bold,
  color,
  textWhite,
  center,
  onPress,
  style,
  numberOfLines,
  textStyle,
  mtop,
  padding,
  allowFontScaling,
  ignoreFontFamily,
  testID,
}: Props) {
  let bg = "transparent";

  const getSize = () => {
    if (!size) return fontSizes.md;
    if (typeof size === typeof Number) return size as number;
    return fontSizes[size as FontSizeType];
  };

  const fontSize = `text-[${getSize()}px]`;
  // const fontFamily = !ignoreFontFamily
  //   ? { fontFamily: "Circular-Std-Medium" }
  //   : undefined;
  const fontStyle: string = `${center ? "text-center" : ""}`;

  let marginTop;
  if (mtop)
    marginTop =
      typeof mtop === "boolean" ? Sizes.spacing.md : Sizes.spacing[mtop];

  const wrapperStyle: string = `m-0 bg-${bg} p-${padding} ${
    marginTop && `mt-${marginTop}`
  }`;

  const TextComponent = () => (
    <p
      className={`${fontSize} ${fontStyle} ${textStyle} ${
        bold && "font-bold"
      } text-${textWhite ? "white" : color ?? "black"} ${
        numberOfLines && `line-clamp-${numberOfLines}`
      }`}
    >
      {children}
    </p>
  );

  if (onPress) {
    return (
      <Button style={`${wrapperStyle} ${style}`} onPress={onPress}>
        <TextComponent />
      </Button>
    );
  }

  return (
    <div className={`${wrapperStyle} ${style}`}>
      <TextComponent />
    </div>
  );
}
