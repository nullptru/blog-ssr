import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'next/link';
import { Card } from '../../../components';
import styles from './index.less';

export default class LatestPostCard extends React.PureComponent {
  render() {
    const { latestPosts } = this.props;
    return (
      <Card title="Latest Posts">
        { latestPosts.map(item => (
          <div className={styles.item} key={item.id}>
            <Link href={`/article/${item.id}`}><a>{ item.title }</a></Link>
          </div>
        )) }
      </Card>
    );
  }
}

LatestPostCard.propTypes = {
  latestPosts: PropTypes.array,
};

LatestPostCard.defaultProps = {
  latestPosts: [],
};

