'use client'

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MuiTextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { CustomTextFieldProps } from "./textfield.type";
import { Skeleton } from "@mui/material";
import styles from "./textfield.module.scss";
import clsx from "clsx";
import { Controller, FieldValues } from "react-hook-form";

const TextField = <T extends FieldValues>({
  type,
  placeholder,
  name,
  control,
  handleChange,
  pattern,
  label,
  startAdornment,
  endAdornment,
  handleBlur,
  disabled,
  maxLength,
  rules,
  loading,
  endAdornmentClassName,
  endAdornmentToolTipText,
  onEndAdornmentClick,
  inputPropsClassName = ''
}: CustomTextFieldProps<T>) => {
  return loading ? (
    <Skeleton variant="rounded" width="100%" height={48} />
  ) : (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, value, onBlur, ref, ...others },
        fieldState: { error },
      }) => (
        <MuiTextField
          fullWidth
          disabled={disabled}
          error={!!error}
          placeholder={placeholder}
          helperText={error ? error?.message : ""}
          autoComplete="off"
          label={label}
          type={type}
          inputRef={ref}
          inputProps={{
            maxLength: maxLength,
            className: startAdornment
              ? styles.inputWithStartAdornment
              : styles.input,
          }}
          value={value ?? ""}
          onBlur={handleBlur ?? onBlur}
          {...others}
          onChange={(e) => {
            if (handleChange) {
              return handleChange(e);
            }
            if (!pattern || pattern?.test(e.target.value)) {
              onChange(e);
            }
          }}
          InputProps={{
            classes:{input: error ? styles.placeholder:  ""},
            className: clsx(styles.background, inputPropsClassName),
            ...(startAdornment || endAdornment
              ? {
                  startAdornment: startAdornment ? startAdornment : null,
                  endAdornment: endAdornment && (
                    <InputAdornment
                      className={
                        endAdornmentClassName &&
                        clsx(
                          error
                            ? styles.endAdornmentError
                            : styles[endAdornmentClassName]
                        )
                      }
                      position="end"
                    >
                      <Tooltip
                        disableInteractive
                        title={endAdornmentToolTipText}
                        slotProps={{
                          popper: {
                            modifiers: [
                              {
                                name: "offset",
                                options: {
                                  offset: [0, -14],
                                },
                              },
                            ],
                          },
                        }}
                      >
                        <IconButton
                          disableTouchRipple
                          edge={"end"}
                          onClick={onEndAdornmentClick ?? onEndAdornmentClick}
                        >
                          {endAdornment}
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }
              : {}),
          }}
        />
      )}
    />
  );
};

export default TextField;
