export function setRawPayload(fieldName, defaultValue) {
  return (state, { payload = defaultValue }) => {
    state[fieldName] = payload;
  };
}
