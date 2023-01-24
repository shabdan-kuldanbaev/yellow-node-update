const dotenv = require('dotenv');
const axios = require('axios');
const errorHelper = require('../error');

dotenv.config('./env');

const getPipedriveFields = async () => {
  try {
    const { data: pipedriveFields } = await axios.get(
      `${process.env.PIPEDRIVE_API_URL}/personFields?api_token=${process.env.PIPEDRIVE_AUTH_TOKEN}`,
    );

    const countryField = pipedriveFields.data.find((field) => field.name === 'Country' && field.id === 9080);
    const clientIdField = pipedriveFields.data.find((field) => field.name.trim() === 'Client ID' && field.id === 9086);
    const leadSourceField = pipedriveFields.data.find((field) => field.name === 'Lead source' && field.id === 9087);

    return {
      countryField,
      clientIdField,
      leadSourceField,
    };
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the getPipedriveFields function',
    });
  }
};

const getPersonCountry = async () => {
  try {
    const { data } = await axios.get('http://ip.jsontest.com/');
    const { data: clientCountry } = await axios.get(`https://ip-api.io/api/json/${data.ip}`);

    return clientCountry.country_name;
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the getPersonCountry function',
    });
  }
};

const createPersonPipedrive = async (data) => {
  try {
    const {
      clientIdFieldKey,
      leadSourceFieldKey,
      countryFieldKey,
      clientCountry,
      email,
      name,
      clientId,
      leadSourceOptionId,
    } = data;

    const { data: newPersonPipedrive } = await axios.post(
      `${process.env.PIPEDRIVE_API_URL}/persons?api_token=${process.env.PIPEDRIVE_AUTH_TOKEN}`,
      {
        name,
        email: [{ value: email, primary: 'true', label: 'main' }],
        [clientIdFieldKey]: clientId,
        [leadSourceFieldKey]: leadSourceOptionId || '',
        [countryFieldKey]: clientCountry || '',
      },
    );

    return newPersonPipedrive.data;
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the createPersonPipedrive function',
    });
  }
};

const createDescriptionPerson = async (data) => {
  try {
    const {
      personId,
      description,
      ownerId,
    } = data;

    return await axios.post(
      `${process.env.PIPEDRIVE_API_URL}/notes?api_token=${process.env.PIPEDRIVE_AUTH_TOKEN}`,
      {
        person_id: personId,
        content: description,
        user_id: ownerId,
      },
    );
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the createDescriptionPerson function',
    });
  }
};

const findCurrentOption = (
  options,
  currentSource,
) => options.find((field) => currentSource?.trim().toLowerCase().includes(field.label.trim().toLowerCase()));

const getCurrentLeadSourceOption = async ({
  leadSourceFieldsOptions,
  currentSource,
  leadSourceField,
}) => {
  try {
    let leadSourceOptions = findCurrentOption(leadSourceFieldsOptions, currentSource);

    if (!leadSourceOptions && currentSource) {
      const { data } = await axios.put(
        `${process.env.PIPEDRIVE_API_URL}/personFields/${leadSourceField.id}?api_token=${process.env.PIPEDRIVE_AUTH_TOKEN}`,
        {
          options: [...leadSourceFieldsOptions, { label: currentSource }],
        },
      );

      leadSourceOptions = findCurrentOption(data.data.options, currentSource);
    }

    return leadSourceOptions;
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the getCurrentLeadSourceOption function',
    });
  }
};

module.exports.sendDataPipedrive = async (req, res) => {
  try {
    const {
      name,
      email,
      description,
      clientId,
    } = req.body;

    const search = req.headers.referer.split(`${req.headers.origin}/?`).join('');
    const params = new URLSearchParams(search);
    const source = params.get('utm_source');

    const {
      countryField,
      clientIdField,
      leadSourceField,
    } = await getPipedriveFields();

    const clientCountry = await getPersonCountry();

    const leadSourceOptions = await getCurrentLeadSourceOption({
      leadSourceFieldsOptions: leadSourceField.options,
      currentSource: source,
      leadSourceField,
    });

    const newPersonPipedrive = await createPersonPipedrive({
      clientIdFieldKey: clientIdField.key,
      leadSourceFieldKey: leadSourceField.key,
      countryFieldKey: countryField.key,
      clientCountry,
      email,
      name,
      clientId,
      leadSourceOptionId: leadSourceOptions?.id,
    });

    if (newPersonPipedrive) {
      await createDescriptionPerson({
        personId: newPersonPipedrive.id,
        description,
        ownerId: newPersonPipedrive.owner_id.id,
      });
    }

    res.status(200).send(JSON.stringify({ newPersonPipedrive }));
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the sendDataPipedrive function',
    });
    res.status(500).json({ error: error.message });
  }
};
