import React, { PureComponent } from 'react';
import ReactGA from 'react-ga';
import { withRouter } from 'next/router';
import ym, { YMInitializer } from 'react-yandex-metrika';

class GAnalytic extends PureComponent {
  constructor(props) {
    super(props);
    this.logPage = this.logPage;
  }

  componentDidMount() {
    this.logPage();
    ym('hit', window.location.pathname);
  }

  componentDidUpdate(prevProps) {
    if (this.props.router.route !== prevProps.router.route) {
      this.logPage();
    }
  }

  logPage() {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
    ym('hit', window.location.pathname);
  }

  render() {
    return <YMInitializer accounts={[0]} />;
  }
}

export default withRouter(GAnalytic);
