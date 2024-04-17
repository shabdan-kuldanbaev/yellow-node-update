import dotenv from 'dotenv';
import axios from 'axios';
import { leadSourceCookieName, userLocation } from 'utils/constants/cookieNames';
import { cookies } from 'next/headers';
import { handleError } from '../error';

dotenv.config('./env');

const getPipedriveFields = async () => {
  try {
    const { data: pipedriveFields } = await axios.get(
      `${process.env.PIPEDRIVE_API_URL}/personFields?api_token=${process.env.PIPEDRIVE_AUTH_TOKEN}`,
    );

    const countryField = pipedriveFields.data.find((field) => field.name === 'Person Country' && field.id === 9094);
    const cityRegionField = pipedriveFields.data.find((field) => field.name === 'Person City/State' && field.id === 9093);
    const clientIdField = pipedriveFields.data.find((field) => field.name.trim() === 'Client ID' && field.id === 9086);
    const leadSourceField = pipedriveFields.data.find((field) => field.name === 'Lead source' && field.id === 9087);
    const leadTypeField = pipedriveFields.data.find((field) => field.name === 'Lead type' && field.id === 9089);
    const campaignField = pipedriveFields.data.find((field) => field.name === 'Web page / UTM' && field.id === 9107);
    const phoneField = pipedriveFields.data.find((field) => field.name === 'Phone' && field.id === 9041);
    const attachmentsField = pipedriveFields.data.find((field) => field.name === 'Attachments' && field.id === 9108);

    return {
      countryField,
      cityRegionField,
      clientIdField,
      leadSourceField,
      phoneField,
      leadTypeField,
      campaignField,
      attachmentsField,
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
      cityRegionFieldKey,
      clientCityRegion,
      email,
      name,
      phoneFieldKey,
      phone,
      clientId,
      leadSourceOptionId,
      leadTypeFieldKey,
      leadTypeOptionId,
      campaignFieldKey,
      clientCampaign,
      attachmentsFieldKey,
      attachments,
    } = data;

    const { data: newPersonPipedrive } = await axios.post(
      `${process.env.PIPEDRIVE_API_URL}/persons?api_token=${process.env.PIPEDRIVE_AUTH_TOKEN}`,
      {
        name,
        email: [{ value: email, primary: 'true', label: 'main' }],
        [clientIdFieldKey]: clientId,
        [leadSourceFieldKey]: leadSourceOptionId || '',
        [countryFieldKey]: clientCountry || '',
        [cityRegionFieldKey]: clientCityRegion || '',
        [phoneFieldKey]: phone || '',
        [leadTypeFieldKey]: leadTypeOptionId || '',
        [campaignFieldKey]: clientCampaign,
        [attachmentsFieldKey]: attachments,
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

export async function sendDataPipedrive(fields) {
  try {
    const {
      name,
      email,
      phone,
      description,
      clientId,
      attachments: reqAttachments,
    } = fields;
    const attachments = Array.isArray(reqAttachments) ? reqAttachments : [reqAttachments || ''];

    const cookieStore = cookies();

    const leadSource = cookieStore.get(leadSourceCookieName);
    const clientLocation = cookieStore.get(userLocation);

    const {
      countryField,
      cityRegionField,
      clientIdField,
      leadSourceField,
      leadTypeField,
      phoneField,
      campaignField,
      attachmentsField,
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
      clientCountry: clientLocation.countryName,
      cityRegionFieldKey: cityRegionField.key,
      clientCityRegion: `${clientLocation.city}, ${clientLocation.region}`,
      phoneFieldKey: phoneField.key,
      phone,
      leadSourceFieldKey: leadSourceField.key,
      leadSourceOptionId: leadSourceOptions?.id,
      leadTypeFieldKey: leadTypeField.key,
      leadTypeOptionId: leadTypeOption?.id,
      campaignFieldKey: campaignField.key,
      clientCampaign: leadSource.campaign,
      attachmentsFieldKey: attachmentsField.key,
      attachments: attachments.join('; '),
    });

    if (newPersonPipedrive) {
      await createDescriptionPerson({
        personId: newPersonPipedrive.id,
        description,
        ownerId: newPersonPipedrive.owner_id.id,
      });
    }

    return newPersonPipedrive;
  } catch (error) {
    console.error('PD error: ', error);
    handleError({
      error,
      message: 'Error in the sendDataPipedrive function',
    });
    throw new Error('Error in sendDataPipedrive');
  }
}
