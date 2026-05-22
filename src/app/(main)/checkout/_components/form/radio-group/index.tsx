import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import RadioButtonIcon from "@mui/icons-material/RadioButtonUnchecked";
import MuiRadio from "@mui/material/Radio";
import { Controller, FieldValues } from "react-hook-form";
import { CustomRadioProps } from "./radio-group.type";
import { FormHelperText, Skeleton, Stack, Typography } from "@mui/material";

const Radio = <T extends FieldValues>({
  isBoolean,
  name,
  options,
  control,
  setValue,
  typographyProps,
  isLoading,
  row,
  optionGap,
  handleChange,
}: CustomRadioProps<T>) => {
  return (
    <FormControl>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
          <>
            <RadioGroup
              row={row ?? undefined}
              name={name}
              value={value ?? null}
              onChange={
                isBoolean
                  ? (_, value) => setValue(name, value === "true")
                  : handleChange || onChange
              }
              sx={{ gap: optionGap }}
            >
              {options &&
                options.length > 0 &&
                options?.map((option) => {
                  return (
                    <FormControlLabel
                      onChange={onChange}
                      key={option.label}
                      onBlur={onBlur}
                      value={option.value}
                      className="text-secondary ml-0 mr-4"
                      control={
                        <MuiRadio
                          inputRef={ref}
                          size="small"
                          disabled={option?.balance === 0}
                          icon={
                            isLoading ? (
                              <Skeleton variant="circular" width={20} />
                            ) : (
                              <RadioButtonIcon />
                            )
                          }
                        />
                      }
                      label={
                        isLoading ? (
                          <Skeleton width={78} />
                        ) : (
                          <Stack gap="3px" className="flex flex-col">
                            <Typography variant="paragraphSm">Card number: {option.label}</Typography>
                            <Typography variant="paragraphSm">Balance: {option.balance}</Typography>
                          </Stack>
                        )
                      }
                      slotProps={{ typography: { ...typographyProps } }}
                    />
                  );
                })}
            </RadioGroup>
            {error && <FormHelperText className="mt-1 errorText">{error?.message}</FormHelperText>}
          </>
        )}
      />
    </FormControl>
  );
};

export default Radio;
