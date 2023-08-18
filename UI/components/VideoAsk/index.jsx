import Script from 'next/script';

export default function VideoAsk() {
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <>
      <Script
        id="videoask-widget"
        dangerouslySetInnerHTML={{
          __html:
            `window.VIDEOASK_EMBED_CONFIG = {
              "kind": "widget",
              "url": "https://www.videoask.com/fngx9kj94",
              "options": {
                "widgetType": "VideoThumbnailExtraLarge",
                "text": "",
                "backgroundColor": "#000000",
                "position": "bottom-right",
                "dismissible": false,
                "widgetZIndex": "50"
              }
            }`,
        }}
      />
      <Script src="https://www.videoask.com/embed/embed.js" />
    </>
  );
}
