import React from 'react';
import PropTypes from 'prop-types';
import { PageIntro } from 'components/CustomChatAppCommon/PageIntro';
import { ExperienceSection } from 'components/CustomChatAppCommon/ExperienceSection';
import { CardsSection } from 'components/CustomChatAppCommon/CardsSection';
import { AdvantagesSection } from 'components/CustomChatAppCommon/AdvantagesSection';
import { ChatFeaturesSection } from 'components/CustomChatAppCommon/ChatFeaturesSection';
import { TechnologiesSection } from 'components/CustomChatAppCommon/TechnologiesSection';
import { OurWorkSection } from 'components/CustomChatAppCommon/OurWorkSection';
import { FullLayout } from 'components/Layout/FullLayout';
import { getDocumentFields } from 'utils/helper';
import { BLOCKS_SLUGS } from 'utils/constants';

export const ChatAppCommon = ({ section }) => {
  const { slug } = getDocumentFields(section);

  if (!slug) {
    return null;
  }

  switch (slug) {
  case BLOCKS_SLUGS.chatAppPageIntro:
    return <PageIntro sectionData={section} />;
  case BLOCKS_SLUGS.chatAppPageExperiance:
    return <ExperienceSection sectionData={section} />;
  case BLOCKS_SLUGS.chatAppPageTypesOfChat:
    return (
      <FullLayout
        disableMaxWidth
        disableTopPadding
        disableSidePadding
        disableBottomPadding
      >
        <CardsSection
          sectionData={section}
          type="chatTypes"
          hasCTAButton
        />
      </FullLayout>
    );
  case BLOCKS_SLUGS.chatAppPageDevelopersAdvantages:
    return (
      <FullLayout
        disableMaxWidth
        disableTopPadding
        disableSidePadding
        disableBottomPadding
      >
        <CardsSection
          sectionData={section}
          type="advantages"
        />
      </FullLayout>
    );
  case BLOCKS_SLUGS.chatAppPageAdvantages:
    return <AdvantagesSection sectionData={section} />;
  case BLOCKS_SLUGS.chatAppPageFeatures:
    return (
      <FullLayout
        disableMaxWidth
        disableTopPadding
        disableSidePadding
        disableBottomPadding
      >
        <ChatFeaturesSection sectionData={section} />
      </FullLayout>
    );
  case BLOCKS_SLUGS.chatAppPageTechnologies:
    return <TechnologiesSection sectionData={section} />;
  case BLOCKS_SLUGS.chatAppPageOurWork:
    return (
      <FullLayout
        disableMaxWidth
        disableTopPadding
        disableSidePadding
        disableBottomPadding
      >
        <OurWorkSection sectionData={section} />
      </FullLayout>
    );
  default:
    return null;
  }
};

ChatAppCommon.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
};
