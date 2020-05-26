const Error = ({ statusCode }) => (
  statusCode
    ? statusCode === 404 && (
      <div
        style={{
          height: '65vh',
          paddingTop: '300px',
          textAlign: 'center',
          backgroundColor: 'white',
        }}
      >
        404
      </div>
    )
    : 'An error occurred on client'
);

Error.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
