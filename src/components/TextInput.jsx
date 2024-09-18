import React from "react";
import { IconButton, InputAdornment, FormHelperText } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FieldWrapper,
  LabelText,
  Fieldstyle,
  errorColor,
} from "../styles/index.jsx";
import { OutlinedInput, Typography } from "@mui/material";

export const TextInput = ({ label, fieldName, field, errors }) => {
  return (
    <div style={FieldWrapper}>
      <Typography sx={LabelText(errors[fieldName])}>
        {label} <span style={errorColor}>*</span>
      </Typography>
      <OutlinedInput
        {...field(fieldName)}
        sx={Fieldstyle}
        placeholder={label}
      ></OutlinedInput>
      {errors[fieldName]?.message && (
        <FormHelperText sx={errorColor}>
          {errors[fieldName].message}
        </FormHelperText>
      )}
    </div>
  );
};

export const PasswordInput = ({ label, fieldName, field, errors }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div style={FieldWrapper}>
      <Typography sx={LabelText(errors[fieldName])}>
        {label}
        <span style={errorColor}>*</span>
      </Typography>
      <OutlinedInput
        {...field(fieldName)}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        placeholder={label}
        sx={Fieldstyle}
      />
      {errors[fieldName]?.message && (
        <FormHelperText sx={errorColor}>
          {errors[fieldName].message}
        </FormHelperText>
      )}
    </div>
  );
};
