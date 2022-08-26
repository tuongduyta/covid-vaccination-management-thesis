import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Alert,
  Box,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  FormErrorMessage,
  Icon,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { FaShieldVirus } from "react-icons/fa";

import { useAuth } from "../../../contexts/AuthContext";
import {
  PRIMARY_PATTERN_COLOR,
  PRIMARY_COLOR,
  TITLE_INFO_COLOR,
} from "../../../configs";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const { login } = useAuth();

  const renderField = ({ field, form, label, ...props }) => {
    const { name } = field;
    const error = form.errors[name] && form.touched[name];
    return (
      <FormControl isInvalid={error} w="400px">
        <FormLabel>{label}</FormLabel>
        <Input {...field} {...props} />
        <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
      </FormControl>
    );
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setLoginError(false);
    try {
      await login(values.email, values.password);
    } catch {
      setLoginError(true);
    }
    setIsLoading(false);
  };

  const validate = (values) => {
    const error = {};
    if (!values.email) {
      error.email = "You must enter your email";
    }
    if (!values.password) {
      error.password = "You must enter your password";
    }
    return error;
  };

  return (
    <Box>
      <Flex
        justify="center"
        aligns="center"
        w="600px"
        m={10}
        p={10}
        borderWidth={1}
        borderRadius="xl"
        shadow="md"
      >
        <Stack direction="column" align="center" spacing={3}>
          <Icon as={FaShieldVirus} boxSize={20} color={PRIMARY_PATTERN_COLOR} />
          <Heading textAlign="center" mb="20px" color={TITLE_INFO_COLOR}>
            Covid Management
          </Heading>
          {loginError && (
            <Alert status="error">
              <WarningIcon mr="10px" color="red.500" />
              <Box>Wrong email or password</Box>
            </Alert>
          )}
          <Formik
            validate={validate}
            onSubmit={handleSubmit}
            initialValues={{ email: "", password: "" }}
          >
            <Form>
              <Stack spacing={5}>
                <Field label="Email" name="email" component={renderField} />
                <Field
                  type="password"
                  label="Password"
                  name="password"
                  component={renderField}
                />
                <Button
                  type="submit"
                  isLoading={isLoading}
                  colorScheme={PRIMARY_COLOR}
                >
                  Login
                </Button>
              </Stack>
            </Form>
          </Formik>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Login;
