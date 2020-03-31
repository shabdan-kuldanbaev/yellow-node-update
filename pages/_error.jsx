const Error = ({ statusCode }) => (
  statusCode
    ? statusCode === 404 && <div>404</div>
    : 'An error occurred on client'
);

Error.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
