const ga = typeof window !== 'undefined' && window.ga;

function trackEvent(
  category,
  action,
  label,
  nonInteraction,
) {
  if (ga) {
    window.ga('send',
      'event',
      category,
      action,
      label,
      {
        nonInteraction,
      });
  }
}

function pageview(path) {
  if (ga) {
    window.ga('send', 'pageview', path);
  }
}

function getClientId() {
  if (ga) {
    let clientId;

    ga((tracker) => {
      clientId = tracker.get('clientId');
    });

    return clientId;
  }
}

export default {
  trackEvent,
  pageview,
  getClientId,
};
