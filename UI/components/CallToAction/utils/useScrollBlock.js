import { useEffect, useState } from 'react';
import downloadFile from 'utils/downloadFile';
import useToggle from 'hooks/useToggle';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'redux/apis/dataSending';
import usePageClusters from 'hooks/usePageClusters';

export default (props) => {
  const {
    sectionRef,
    downloadLink,
    show,
    setShow,
    slug,
    ...rest
  } = props;
  const [scroll, setScroll] = useState(true);
  const [buttonShow, setButtonShow] = useState(false);

  const pageClusters = usePageClusters();

  const [
    subscribe,
    { data: { subscriptionEmail } = {} },
  ] = useSubscribeMutation({ fixedCacheKey: SUBSCRIPTION_CASH_KEY });

  const [isGetBookShown, toggleGetBookModalShown] = useToggle(false);

  const handleOnClick = () => {
    if (subscriptionEmail) {
      Promise.resolve(subscribe({ email: subscriptionEmail, pageClusters }));

      return downloadFile(downloadLink);
    }

    toggleGetBookModalShown(true);
  };

  const handleClose = () => {
    setScroll(false);
    setShow(false);
  };

  useEffect(() => {
    let buttonTimer;
    let showTimer;

    const handleOnScroll = () => {
      clearTimeout(showTimer);

      const positionY = window.scrollY;

      if (sectionRef.current) {
        const section = sectionRef.current.getBoundingClientRect();

        if ((section.height / 2) < positionY) {
          setShow(true);
        }
      }
    };

    if (scroll && !show) {
      showTimer = setTimeout(() => {
        setShow(true);
      }, 5000);
    }

    if (show) {
      buttonTimer = setTimeout(() => {
        setButtonShow(true);
      }, 3000);
    }

    window.addEventListener('scroll', handleOnScroll);

    if (!scroll) {
      window.removeEventListener('scroll', handleOnScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleOnScroll);

      clearTimeout(showTimer);
      clearTimeout(buttonTimer);
    };
  }, [
    show,
    setShow,
    scroll,
    sectionRef,
  ]);

  return {
    show,
    buttonShow,
    handleClose,
    handleOnClick,
    isGetBookShown,
    toggleGetBookModalShown,
    downloadLink,
    slug,
    ...rest,
  };
};
