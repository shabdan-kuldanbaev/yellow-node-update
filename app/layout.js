import Script from 'next/script';
import App from 'containers/App';

import 'animate.css/animate.min.css';
import 'swiper/css/bundle';
import 'swiper/scss/scrollbar';
import 'swiper/scss/pagination';
import 'styles/index.scss';

export const metadata = {
  title: 'Software Development for Startups | Yellow',
  description: '✔ We provide software development services for startups and businesses. ✔ Reach out for a free consultation!',
  manifest: '/manifest.json',
  icons: {
    icon: '/yellow_logo.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/yellow_logo.ico',
    other: {
      rel: 'mask-icon',
      url: '/safari-pinned-tab.svg',
    },
  },
  other: {
    'google-site-verification': 'Ou5rI476W6QK1BYTyVkJaDjTwbCFy7jdbEO5etMIi0k',
  },
};

const RootLayout = (props) => {
  const { children } = props;
  const { GTM_ID, CRISP_WEBSITE_ID } = process.env;

  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=Roboto:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>

      <Script
        id="gtm-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />

      <Script
        id="gtag-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GTM_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <Script
        id="crisp-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="${CRISP_WEBSITE_ID}";
            (function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;
            d.getElementsByTagName("head")[0].appendChild(s);})();`,
        }}
      />

      <body>
        <noscript dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
        />
        <App>{children}</App>
      </body>
    </html>
  );
};

export default RootLayout;
