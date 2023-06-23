import { useRouter } from 'next/router';
import { useCalendlyEventListener } from 'react-calendly';
import { getDocumentFields } from 'utils/helper';
import gaHelper from 'utils/ga';

export default function useProps({
  section,
  ...restProps
}) {
  const {
    title,
    subtitle,
    contentModules,
  } = getDocumentFields(
    section,
    [
      'title',
      'subtitle',
      'contentModules',
    ],
  );

  const { query: { utm_source: utmSource = null } } = useRouter();

  const { url: calendlyEventUrl } = getDocumentFields(contentModules[1], ['url']);

  const handleOnCTAClick = () => {
    window.gtag(
      {
        event: 'book_call_from_videoask',
      },
    );

    window.gtag('event', 'book_call_from_videoask');
    console.log(window.dataLayer);
  };

  useCalendlyEventListener({
    onEventScheduled: (e) => {
      gaHelper.trackEvent(
        'Call',
        'Call Scheduled',
        { campaignSource: utmSource },
      );
    },
  });

  return {
    title,
    subtitle,
    contentModules,
    calendlyEventUrl,
    utmSource,
    ...restProps,
    handleOnCTAClick,
  };
}
