import React from 'react';
import throttle from 'lodash/throttle';
import { getScrollPercent } from '../utils/scroll';

export default function withScroll(Component) {
  return class extends React.Component {
    static initialAction(params) {
      return Component.initialAction(params);
    }

    constructor(props) {
      super(props);

      this.state = {
        maxScrollPosition: 0,
      };

      this.saveScrollPosition = throttle(this.saveScrollPosition, 500);
      this.saveLastScrollPosition = throttle(this.saveLastScrollPosition, 500);
    }

    componentDidMount() {
      window.addEventListener('scroll', this.setMaxScroll);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.setMaxScroll);
    }

    setMaxScroll = () => {
      const {
        maxScrollPosition,
      } = this.state;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > maxScrollPosition) {
        const scrollPercent = getScrollPercent();
        if (scrollPercent > maxScrollPosition) {
          this.saveScrollPosition(scrollPercent);
        }
      }
      this.saveLastScrollPosition(scrollTop <= 0 ? 0 : scrollTop);
    }

    saveScrollPosition = (scroll) => {
      this.setState({ maxScrollPosition: scroll });
    }

    saveLastScrollPosition = (scroll) => {
      this.setState({ lastScrollTop: scroll });
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };
}
