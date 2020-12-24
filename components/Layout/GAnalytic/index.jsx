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
    const { pathname } = window.location;
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);
    ym('hit', pathname);
  }

  render() {
    return <YMInitializer accounts={[process.env.YANDEX_TRACK_ID]} />;
  }
}

export default withRouter(GAnalytic);
