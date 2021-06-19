import React, { useState } from 'react';
import { validateEmail } from 'utils/helper';

export const withValidateEmail = (Component) => (props) => {
  const [email, setEmail] = useState({ value: '', isValidate: true });

  const handleOnEmailChange = ({ target: { value } }) => {
    setEmail({ value, isValidate: true });
  };

  const handleOnBlurEmail = (value) => {
    setEmail({ value, isValidate: validateEmail(value) });
  };

  return (
    <Component
      email={email}
      handleOnEmailChange={handleOnEmailChange}
      handleOnBlurEmail={handleOnBlurEmail}
      {...props}
    />
  );
};
