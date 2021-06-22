import React from 'react';
import { FullLayout } from 'components/Layout/FullLayout';
import { PageHeader } from 'components/Common/PageHeader';
import { PageIntro } from 'components/CustomChatAppCommon/PageIntro';
import { ExperienceSection } from 'components/CustomChatAppCommon/ExperienceSection';
import { TypesOfChatSection } from 'components/CustomChatAppCommon/TypesOfChatSection';
import { AdvantagesSection } from 'components/CustomChatAppCommon/AdvantagesSection';
import { ChatFeaturesSection } from 'components/CustomChatAppCommon/ChatFeaturesSection';
import { TechnologiesSection } from 'components/CustomChatAppCommon/TechnologiesSection';
import { OurWorkSection } from 'components/CustomChatAppCommon/OurWorkSection';
import { CallToAction } from 'components/Common/CallToAction';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';

export const CustomChatAppContainer = ({ introSection }) => {
  const breadcrumbs = pagesBreadcrumbs.customChatApp();

  return (
    <FullLayout>
      <PageHeader breadcrumbs={breadcrumbs} />
      <PageIntro />
      <ExperienceSection />
      <FullLayout
        disableMaxWidth
        disableTopPadding
        disableSidePadding
        disableBottomPadding
      >
        <TypesOfChatSection />
      </FullLayout>
      <AdvantagesSection />
      <FullLayout
        disableMaxWidth
        disableTopPadding
        disableSidePadding
        disableBottomPadding
      >
        <ChatFeaturesSection />
      </FullLayout>
      <TechnologiesSection />
      <CallToAction
        type="card"
        title={`Want to start chat app development?
                Ask Yelow’s consultants now.`}
        buttonTitle="Contact us"
      />
      <FullLayout
        disableMaxWidth
        disableTopPadding
        disableSidePadding
        disableBottomPadding
      >
        <OurWorkSection />
      </FullLayout>
    </FullLayout>
  );
};
