import { SvgIconProps } from "@mui/material";
import { ChangeEvent, FocusEvent } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

export type CustomTextFieldProps<T extends FieldValues> = {
  type: string;
  placeholder?: string;
  pattern?: RegExp;
  handleChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleBlur?: (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  name: Path<T>;
  control: Control<T>;
  endAdornment?: React.ReactElement<SvgIconProps>;
  startAdornment?: React.ReactElement<SvgIconProps>;
  label?: string;
  disabled?: boolean;
  maxLength?: number;
  rules?: Record<string, string[]>;
  loading?: boolean;
  endAdornmentClassName?: string;
  endAdornmentToolTipText?: string;
  onEndAdornmentClick?: () => void;
  inputPropsClassName?: string
};
