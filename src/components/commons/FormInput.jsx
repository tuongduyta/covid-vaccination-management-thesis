import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

const renderInput = (field, rest) => {
  switch (rest.type) {
    case "select":
      return (
        <Select {...field}>
          {rest.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      );
    default:
      return <Input {...field} {...rest} />;
  }
};

const FormInput = ({ field, form, label, ...rest }) => {
  const { name } = field;
  const error = form.errors[name] && form.touched[name];
  return (
    <FormControl isInvalid={error}>
      <FormLabel>{label}</FormLabel>
      {renderInput(field, rest)}
      <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
