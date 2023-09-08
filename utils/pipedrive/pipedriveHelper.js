import dotenv from 'dotenv';
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { leadSourceCookieName, userCountry } from 'utils/constants/cookieNames';
import { handleError } from '../error';

dotenv.config('./env');

const getPipedriveFields = async () => {
  try {
    const { data: pipedriveFields } = await axios.get(
      `${process.env.PIPEDRIVE_API_URL}/personFields?api_token=${process.env.PIPEDRIVE_AUTH_TOKEN}`,
    );

    const countryField = pipedriveFields.data.find((field) => field.name === 'Person Country' && field.id === 9094);
    const clientIdField = pipedriveFields.data.find((field) => field.name.trim() === 'Client ID' && field.id === 9086);
    const leadSourceField = pipedriveFields.data.find((field) => field.name === 'Lead source' && field.id === 9087);
    const leadTypeField = pipedriveFields.data.find((field) => field.name === 'Lead type' && field.id === 9089);
    const phoneField = pipedriveFields.data.find((field) => field.name === 'Phone' && field.id === 9041);

    return {
      countryField,
      clientIdField,
      leadSourceField,
      phoneField,
      leadTypeField,
    };
  } catch (error) {
    handleError({
      error,
      message: 'Error in the getPipedriveFields function',
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
      phoneFieldKey,
      phone,
      clientId,
      leadSourceOptionId,
      leadTypeFieldKey,
      leadTypeOptionId,
    } = data;

    const { data: newPersonPipedrive } = await axios.post(
      `${process.env.PIPEDRIVE_API_URL}/persons?api_token=${process.env.PIPEDRIVE_AUTH_TOKEN}`,
      {
        name,
        email: [{ value: email, primary: 'true', label: 'main' }],
        [clientIdFieldKey]: clientId,
        [leadSourceFieldKey]: leadSourceOptionId || '',
        [countryFieldKey]: clientCountry || '',
        [phoneFieldKey]: phone || '',
        [leadTypeFieldKey]: leadTypeOptionId || '',
      },
    );

    return newPersonPipedrive.data;
  } catch (error) {
    handleError({
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
    handleError({
      error,
      message: 'Error in the createDescriptionPerson function',
    });
  }
};

const findCurrentOption = (
  options,
  currentSource,
) => options.find((field) => currentSource?.trim().toLowerCase() === field.label.trim().toLowerCase());

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
    handleError({
      error,
      message: 'Error in the getCurrentLeadSourceOption function',
    });
  }
};

export async function sendDataPipedrive(req, res) {
  try {
    const {
      name,
      email,
      phone,
      description,
      clientId,
    } = req.body;

    const leadSource = JSON.parse(getCookie(leadSourceCookieName, { req, res }));
    const clientCountry = getCookie(userCountry, { req, res });

    const {
      countryField,
      clientIdField,
      leadSourceField,
      leadTypeField,
      phoneField,
    } = await getPipedriveFields();

    const leadSourceOptions = await getCurrentLeadSourceOption({
      leadSourceFieldsOptions: leadSourceField.options,
      currentSource: `${leadSource.source}/${leadSource.medium}`,
      leadSourceField,
    });

    const leadTypeOption = findCurrentOption(leadTypeField.options, 'Inbound');

    const newPersonPipedrive = await createPersonPipedrive({
      email,
      name,
      clientIdFieldKey: clientIdField.key,
      clientId,
      countryFieldKey: countryField.key,
      clientCountry,
      phoneFieldKey: phoneField.key,
      phone,
      leadSourceFieldKey: leadSourceField.key,
      leadSourceOptionId: leadSourceOptions?.id,
      leadTypeFieldKey: leadTypeField.key,
      leadTypeOptionId: leadTypeOption?.id,
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
    handleError({
      error,
      message: 'Error in the sendDataPipedrive function',
    });
    res.status(500).json({ error: error.message });
  }
}
