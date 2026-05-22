/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypographyProps } from "@mui/material/Typography";
import { Control, FieldValues, Path } from "react-hook-form";

export type CustomRadioProps<T extends FieldValues> = {
  name: Path<T>;
  isLoading?: boolean;
  isBoolean?: boolean;
  options?: Array<{ value: boolean | string; label: string, balance: number }>;
  control: Control<T>;
  setValue?: any;
  typographyProps?: TypographyProps;
  row?: boolean;
  optionGap?: string | number;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
