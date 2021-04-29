function trackEvent(
  category,
  action,
  label,
  nonInteraction,
) {
  // TODO remove duplicate code
  if (typeof window !== 'undefined' && window.ga) {
    window.ga(
      'send',
      'event',
      category,
      action,
      label,
      { nonInteraction },
    );
  }
}

function pageview(path) {
  if (typeof window !== 'undefined' && window.ga) {
    window.ga('send', 'pageview', path);
  }
}

function getClientId() {
  if (typeof window !== 'undefined' && window.ga) {
    let clientId = null;

    window.ga((tracker) => {
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
