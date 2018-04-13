import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Icon, TypeButton } from '../components';
import Page from '../components/Page';
import { styles } from '../pagesComponents/tagslist';

export default class extends React.PureComponent {
  static propTypes = {
    tags: PropTypes.object,
    tagsArticles: PropTypes.object,
  }

  static defaultProps = {
    tags: {},
    tagsArticles: {},
  }

  handleArticleClick = (id) => {
    Router.push({
      pathname: `/article/${id}`,
    });
  }

  render() {
    const { tags: { list: taglist = [] }, tagsArticles: { tags2Articles = [] } } = this.props;
    return (
      <Page>
        {() => {
          return (
            <div className="row">
              <div className="col-md-8 col-sm-12 col-md-push-2">
                <section className={styles.tagsPanel}>
                  { taglist.map(item => (
                    <TypeButton key={item.value} item={item} to={`#${item.value}`} type="tag" commonLink />
                  ))}
                </section>
                { taglist.map((item) => {
                  const articles = tags2Articles[item.value] || [];
                  return (
                    <div id={item.value} key={item.value} className={styles.articlesPanel}>
                      <span className={styles.tag}>
                        <Icon type="tag" />
                        <span>{item.name}</span>
                      </span>
                      {articles.map((article) => {
                        return (
                          <div onClick={this.handleArticleClick.bind(this, article.id)} key={article.id} className={styles.article} >
                            <div className={styles.title}>{article.title}</div>
                            <div>{article.abstraction}</div>
                          </div>
                        );
                      })}
                    </div>
                  );
              })}
              </div>
            </div>
          );
        }}
      </Page>
    );
  }
}
