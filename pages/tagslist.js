import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import axios from 'axios';
import { Icon, TypeButton } from '../components';
import Page from '../components/Page';
import { styles } from '../pagesComponents/tagslist';
import config from '../utils/config';

export default class extends React.PureComponent {
  static propTypes = {
    tags2Articles: PropTypes.object,
    tagList: PropTypes.array,
  }

  static defaultProps = {
    tags2Articles: {},
    tagList: [],
  }

  static getInitialProps = async ({
    pathname, query,
  }) => {
    const { api } = config;
    const tagListRes = await axios.get(api.tags.query);
    const tagsArticlestRes = await axios.get(api.articles.queryTagsArticles);

    return {
      pathname,
      query,
      tags2Articles: tagsArticlestRes.data.data,
      tagList: tagListRes.data.data,
    };
  }

  handleArticleClick = (id) => {
    Router.push({
      pathname: `/article/${id}`,
    });
  }

  render() {
    const { tags2Articles = {}, tagList = [], pathname } = this.props;
    return (
      <Page isCustom={false} currentPath={pathname}>
        {() => {
          return (
            <div className="row">
              <div className="col-md-8 col-sm-12 col-md-push-2">
                <section className={styles.tagsPanel}>
                  { tagList.map(item => (
                    <TypeButton key={item.value} item={item} to={`#${item.value}`} type="tag" commonLink />
                  ))}
                </section>
                { tagList.map((item) => {
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
