export function getScrollPercent() {
  const h = document.documentElement;
  const b = document.body;
  const st = 'scrollTop';
  const sh = 'scrollHeight';
  const scrollPercent = (((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100).toFixed(2);

  switch (true) {
  case scrollPercent >= 0 && scrollPercent < 25:
    return 25;
  case scrollPercent >= 25 && scrollPercent < 50:
    return 50;
  case scrollPercent >= 50 && scrollPercent < 75:
    return 75;
  case scrollPercent >= 75 && scrollPercent <= 100:
    return 100;
  default: return 25;
  }
}
