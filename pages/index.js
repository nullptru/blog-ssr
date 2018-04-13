import React from 'react';
import Router from 'next/router';
import queryString from 'query-string';
import axios from 'axios';
import { decrypt, encrypt } from '../utils/crypto';
import { LatestPostCard, TagsCard, styles } from '../pagesComponents/index';
import Page from '../components/Page';
import { Search, Pagination, ArticleItem as Article } from '../components';

export default class HomePage extends React.PureComponent {
  static getInitialProps = async ({
    pathname, query, asPath,
  }) => {
    console.log(pathname, query, asPath);
    const params = decrypt(query.params);
    const articlesRes = await axios.get('http://localhost:3001/articles/page', { params });
    const latestRes = await axios.get('http://localhost:3001/articles/latest');
    const tagListRes = await axios.get('http://localhost:3001/tags/page');

    return {
      pathname,
      query,
      articles: articlesRes.data.data,
      pagination: {
        total: articlesRes.data.total,
        pageSize: articlesRes.data.pageSize,
        current: articlesRes.data.current,
      },
      tagList: tagListRes.data.data,
      latestPosts: latestRes.data.data,
    };
  }

  onArticleClick = (id) => {
    Router.push({
      pathname: `/article/${id}`,
    });
  }

  onSearch = (query) => {
    const searchData = {};
    if (query) {
      searchData.search = query;
    }
    Router.push({
      pathname: '/',
      search: `params=${encrypt(searchData)}`,
    });
  }

  handlePaginationChange = ({ current }) => {
    const searchData = { current };
    const queryParams = decrypt(queryString.parse(Router.search).params) || {};
    if (queryParams.search) {
      searchData.search = queryParams.search;
    }
    Router.push({
      pathname: '/',
      search: `params=${encrypt(searchData)}`,
    });
  }

  render() {
    const {
      articles = [], tagList, latestPosts, pagination, query,
    } = this.props;
    const queryParams = decrypt(query.params) || {};

    return (
      <Page isCustom={false}>
        {() => {
          return (
            <div>
              <div className="row" style={{ marginTop: '4px' }} >
                <div className="col-md-8 col-sm-12">
                  <div style={{ position: 'relative', minHeight: '300px' }}>
                    {articles.length === 0 ? (
                      <div className={styles.vacantContainer}>
                        这个区域暂时没有内容呢QAQ，请去其它地方看看吧～
                      </div>
                    ) : articles.map(article =>
                      <Article article={article} key={article.id} onClick={this.onArticleClick.bind(null, article.id)} />)
                    }
                  </div>
                  <Pagination pagination={pagination} onSelect={this.handlePaginationChange} />
                </div>
                <div className="col-md-4 col-sm-12">
                  <Search withBox onSearch={this.onSearch} query={queryParams.search} />
                  <LatestPostCard latestPosts={latestPosts} />
                  <TagsCard tags={tagList} />
                </div>
              </div>
            </div>
          );
        }}
      </Page>
    );
  }
}
