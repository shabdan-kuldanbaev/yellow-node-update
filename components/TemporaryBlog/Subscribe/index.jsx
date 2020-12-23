import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import cn from 'classnames';
import { connect } from 'react-redux';
import { subscribe } from 'redux/actions/subscribe';
import { selectSuscribeStatus, selectSubscribeError } from 'redux/selectors/subscribe';
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
    this.props.subscribe(this.state.email);
    ReactGA.event({
      category: 'Subscribe',
      action: 'Send',
      label: window.location.pathname,
    });
  }

  onChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { error, status } = this.props;

    return (
      <section className={cn({
        [styles.subscriber]: true,
        [styles.transparent]: this.props.transparent,
        [styles.insideArticle]: this.props.insideArticle,
      })}
      >
        {this.props.title ? <div className={styles.heading}>{this.props.title}</div> : null}
        <p>{this.props.description ? this.props.description : 'Our monthly letter with exclusive insights'}</p>
        <form onSubmit={this.onSubmit}>
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
          <div className={cn({
            [styles.notice]: true,
            [styles.active]: status,
          })}
          >
            <div className={styles.content}>
              <span>Subscribed!</span>
            </div>
          </div>
          <div className={cn({
            [styles.notice]: true,
            [styles.active]: error,
          })}
          >
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
  status: PropTypes.bool,
  error: PropTypes.bool,
  subscribe: PropTypes.func,
};

const mapStateToProps = (state) => ({
  status: selectSuscribeStatus(state),
  error: selectSubscribeError(state),
});

export default connect(mapStateToProps, {
  subscribe,
})(Subscribe);
