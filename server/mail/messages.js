const getFeedBackMessage = (req) => {
  const {
    files,
    body: {
      fullName,
      email,
      projectDescription,
      isSendNDAChecked,
      projectBudget,
    },
  } = req;
  let attachments;

  if (files) {
    attachments = files.map((file) => ({
      filename: `${file.originalname}`,
      content: file.buffer,
    }));
  }

  return {
    subject: 'New Message',
    text: `${fullName ? `Contact name: ${fullName} \n` : ''}`
    + `${email ? `Contact email: ${email}\n` : ''}`
    + `${projectDescription ? `Project description: ${projectDescription} \n` : ''}`
    + `${isSendNDAChecked ? 'Send NDA \n' : ''}`
    + `${projectBudget ? `Project budget: ${projectBudget} \n` : ''}`,
    attachments,
  };
};

const getSubscribeMessage = (req) => ({
  subject: 'Subscribe',
  text: `\nThis contact ${req.body.email} wants to subscribe to the blog!`,
});

module.exports = {
  getFeedBackMessage,
  getSubscribeMessage,
};
