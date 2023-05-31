import {
  LocalizationProvider,
  DatePicker,
  DatePickerProps,
} from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

import { FC } from "react";
import { TextField } from "./TextField";
import { Popper } from "./Popper";

const StyledDatePicker: FC<DatePickerProps<any>> = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker slots={{ textField: TextField, popper: Popper }} {...props} />
    </LocalizationProvider>
  );
};

export { StyledDatePicker as DatePicker };
