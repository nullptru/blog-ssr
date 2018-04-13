import React from 'react';
import Router from 'next/router';
import queryString from 'query-string';
import { LatestPostCard, TagsCard, styles } from '../pagesComponents/index';
import Page from '../components/Page';
import { Search, Pagination, Loading, ArticleItem as Article } from '../components';

export default class HomePage extends React.PureComponent {
  state = {
    isLoading: false,
    isMount: false,
  }
  componentDidMount() {
    import('../utils/crypto').then((module) => {
      this.decrypt = module.decrypt;
      this.encrypt = module.encrypt;
      this.setState({ isMount: true });
    });
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
      search: `params=${this.encrypt(searchData)}`,
    });
  }

  handlePaginationChange = ({ current }) => {
    const searchData = { current };
    const queryParams = this.decrypt(queryString.parse(Router.search).params) || {};
    if (queryParams.search) {
      searchData.search = queryParams.search;
    }
    Router.push({
      pathname: '/',
      search: `params=${this.encrypt(searchData)}`,
    });
  }

  render() {
    const { isLoading, isMount } = this.state;
    const tagList = [];
    const articles = { list: [], latestPosts: [], pagination: {} };
    const { list, latestPosts, pagination } = articles;
    const queryParams = isMount ? this.decrypt(queryString.parse(Router.search).params) || {} : {};

    return (
      <Page isCustom={false}>
        {() => {
          return (
            <div>
              <div className="row" style={{ marginTop: '4px' }} >
                <div className="col-md-8 col-sm-12">
                  <div style={{ position: 'relative', minHeight: '300px' }}>
                    <Loading spinning={isLoading} />
                    {list.length === 0 && !isLoading ? (
                      <div className={styles.vacantContainer}>
                        这个区域暂时没有内容呢QAQ，请去其它地方看看吧～
                      </div>
                    ) : list.map(article =>
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
