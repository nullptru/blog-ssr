import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Icon } from '../index';
import styles from './index.less';

export default class ArticleItem extends React.PureComponent {
  onClick(articleId) {
    this.props.onClick(articleId);
  }

  render() {
    const { article } = this.props;
    return (
      <section className={`${styles.article}`}>
        <header className={styles.headerContainer} onClick={this.onClick.bind(this, article.id)}>
          <img className={styles.image} src={article.imageUrl ? article.imageUrl : '/static/bg_about.jpg'} alt="article" />
          <div className={styles.header}>
            <div>
              <span className={styles.title}>{ article.title }</span>
              <span className={styles.time}>{ article.createdTime }</span>
            </div>
          </div>
        </header>
        <div className={styles.abstraction}>{ article.abstraction }</div>
        {article.tags && article.tags.length > 0 && <div className={styles.tags}>
          <Icon type="tags" />
          { article.tags.map(tag =>
            <Link key={tag.id} href={`/tags/${tag.value}`}><a className={styles.tag}>{ tag.name }</a></Link>) }
        </div>}
      </section>
    );
  }
}

ArticleItem.propTypes = {
  article: PropTypes.object,
  onClick: PropTypes.func,
};

ArticleItem.defaultProps = {
  article: {},
  onClick: () => {},
};

