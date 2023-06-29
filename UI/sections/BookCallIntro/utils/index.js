import { useCalendlyEventListener } from 'react-calendly';
import { getDocumentFields } from 'utils/helper';

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

  const { url: calendlyEventUrl } = getDocumentFields(contentModules[1], ['url']);

  useCalendlyEventListener({
    onEventScheduled: (e) => {
      window.gtag('event', 'book_call_from_videoask');
    },
  });

  return {
    title,
    subtitle,
    contentModules,
    calendlyEventUrl,
    ...restProps,
  };
}
