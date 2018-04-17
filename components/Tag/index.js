import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './index.less';

export default class Tag extends React.PureComponent {
  render() {
    const { tag, type } = this.props;
    return (
      <div className={`${styles.tag} ${styles[type]}`}>
        <Link to={tag.to}>{tag.name}</Link>
      </div>
    );
  }
}

Tag.propTypes = {
  tag: PropTypes.object.isRequired,
  type: PropTypes.string,
};

Tag.defaultProps = {
  type: 'primary',
};

