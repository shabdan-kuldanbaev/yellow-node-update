import React, { useState } from 'react';
import { validateEmail } from 'utils/helper';

export const withValidateEmail = (Cpmponent) => (props) => {
  const [email, setEmail] = useState({ value: '', isValidate: true });
  const handleOnEmailChange = ({ target: { value } }) => {
    setEmail({ value, isValidate: validateEmail(value) });
  };
  const handleOnBlurEmail = (value) => {
    setEmail({ value, isValidate: validateEmail(value) });
  };

  return (
    <Cpmponent
      email={email}
      handleOnEmailChange={handleOnEmailChange}
      handleOnBlurEmail={handleOnBlurEmail}
      {...props}
    />
  );
};
