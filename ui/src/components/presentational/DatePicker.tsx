import {
  LocalizationProvider,
  DatePicker,
  DatePickerProps,
} from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

import { FC } from "react";
import { TextField } from "./TextField";

const StyledDatePicker: FC<DatePickerProps<any>> = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker {...props} slots={{ textField: TextField }} />
    </LocalizationProvider>
  );
};

export { StyledDatePicker as DatePicker };
