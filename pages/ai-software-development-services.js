import React from 'react';
import NoIndexPageContainer from 'UI/views/NoIndex';
import { ROUTES } from 'utils/constants';

const Page = ({ introSection }) => (
  <NoIndexPageContainer
    introSection={introSection}
    slug={ROUTES.aiSoftwareDevelopmentServices.slug}
    title={ROUTES.aiSoftwareDevelopmentServices.title}
  />
);

export default Page;
