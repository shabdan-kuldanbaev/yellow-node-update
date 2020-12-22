import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';
import styles from './styles.module.scss';

export default class Navigation extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      isRendered: false,
      subtitles: [],
    };
  }

  componentDidMount() {
    const subtitleRefs = document.getElementsByTagName('h2');
    const subtitles = [];
    for (const subtitleRef of subtitleRefs) {
      const subtitle = subtitleRef.textContent;
      const slug = slugify(subtitleRef.textContent);
      subtitleRef.setAttribute('id', slug);
      subtitles.push({
        id: slug,
        name: subtitle,
        element: subtitleRef,
      });
    }

    this.setState({
      isRendered: true,
      subtitles,
    });
  }

  get exists() {
    const { isRendered, subtitles } = this.state;
    return isRendered && subtitles.length;
  }

  onClick = (event) => {
    const index = event.target.getAttribute('data-index');
    const { subtitles } = this.state;
    window.scrollBy({
      // height of header is 85px
      top: subtitles[index].element.getBoundingClientRect().top,
      behavior: 'smooth',
    });

    event.preventDefault();
  }

  render() {
    const { subtitles } = this.state;
    const { className } = this.props;

    return this.exists
      ? (
        <div className={`${styles.Navigation} ${className}`}>
          <div className={styles.Title}>Sections</div>
          {subtitles.map(({ id, name }, index) => (
            <Fragment>
              <a
                data-index={index}
                key={id}
                href={`#${id}`}
                onClick={this.onClick}
              >
                {name}
              </a>
              <br />
            </Fragment>
          ))}
        </div>
      )
      : null;
  }
}
