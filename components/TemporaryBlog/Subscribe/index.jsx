import React, { PureComponent } from 'react';
// import ReactGA from 'react-ga';
import classNames from 'classnames';
import { connect } from 'react-redux';

// import {
//   createSubscriber,
// } from 'redux/actions/blog';

// import PropTypes from 'prop-types';
import styles from './styles.module.scss';

class Subscribe extends PureComponent {
  constructor() {
    super();
    this.state = {
      email: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(evt) {
    evt.preventDefault();

    // this.props.createSubscriber(this.state.email)
    //   .then(() => {
    //     ReactGA.event({
    //       category: 'Subscribe',
    //       action: 'Send',
    //       label: window.location.pathname,
    //     });
    //   });
  }

  onChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    const {
      status,
      error,
    } = this.props.subscribe;

    const subscribeClasses = classNames({
      [styles.subscriber]: true,
      [styles.transparent]: this.props.transparent,
      [styles.insideArticle]: this.props.insideArticle,
    });

    const successNotice = classNames({
      [styles.notice]: true,
      [styles.active]: status,
    });

    const failureNotice = classNames({
      [styles.notice]: true,
      [styles.active]: error,
    });
    return (
      <section className={subscribeClasses}>
        {this.props.title ? <div className={styles.heading}>{this.props.title}</div> : null}
        <p>{this.props.description ? this.props.description : 'Our monthly letter with exclusive insights'}</p>
        <form
          onSubmit={this.onSubmit}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.onChange}
            value={this.state.email}
          />
          <input
            type="submit"
            name="Subscribe"
            value="Submit"
          />
          <div className={successNotice}>
            <div className={styles.content}>
              <span>Subscribed!</span>
            </div>
          </div>
          <div className={failureNotice}>
            <div className={styles.content}>
              <span>Seems like this email is already subscribed!</span>
            </div>
          </div>
        </form>
      </section>
    );
  }
}

Subscribe.propTypes = {

};
const mapStateToProps = (state) => ({
  subscribe: state.blog.subscribe,
});

export default connect(mapStateToProps, {
  createSubscriber,
})(Subscribe);
