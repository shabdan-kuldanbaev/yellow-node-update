export function setRawPayload(fieldName) {
  return (state, { payload }) => {
    state[fieldName] = payload;
  };
}
