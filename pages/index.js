import React from 'react';
import Router from 'next/router';
import axios from 'axios';
import { decrypt, encrypt } from '../utils/crypto';
import { LatestPostCard, TagsCard, styles } from '../pagesComponents/index';
import Page from '../components/Page';
import { Search, Pagination, Loading, ArticleItem as Article } from '../components';
import config from '../utils/config';

export default class HomePage extends React.PureComponent {
  static getInitialProps = async ({
    pathname, query, asPath,
  }) => {
    const { api } = config;
    const params = decrypt(query.params);
    if (query.tagId) {
      articlesRes = await axios.get(api.articles.queryByTag.replace(':tag', query.tagId), { params });
    } else {
      articlesRes = await axios.get(api.articles.query, { params });
    }
    let articlesRes;
    const latestRes = await axios.get(api.articles.queryLatest);
    const tagListRes = await axios.get(api.tags.query);

    return {
      pathname,
      query,
      asPath,
      articlesProps: articlesRes.data.data,
      paginationProps: {
        total: articlesRes.data.total,
        pageSize: articlesRes.data.pageSize,
        current: articlesRes.data.current,
      },
      tagList: tagListRes.data.data,
      latestPosts: latestRes.data.data,
    };
  }

  state = {
    articles: undefined,
    pagination: undefined,
    isLoading: false,
  }

  onArticleClick = (id) => {
    Router.push({
      pathname: `/article/${id}`,
    });
  }

  async onSearch(query) {
    this.setState({ isLoading: true });
    const { api } = config;
    const searchData = {};
    if (query) {
      searchData.search = query;
    }
    let articlesRes;
    if (this.props.query.tagId) {
      articlesRes = await axios.get(api.articles.queryByTag.replace(':tag', this.props.query.tagId), { params: searchData });
    } else {
      articlesRes = await axios.get(api.articles.query, { params: searchData });
    }
    this.setState({ isLoading: false });
    if (articlesRes.data.success) {
      Router.push(this.props.pathname, `${this.props.asPath.split('?')[0]}?params=${encrypt(searchData)}`, { shallow: true });
      this.setState({
        articles: articlesRes.data.data,
        pagination: {
          total: articlesRes.data.total,
          pageSize: articlesRes.data.pageSize,
          current: Number(articlesRes.data.current),
        },
      });
    }
  }

  async handlePaginationChange({ current }) {
    this.setState({ isLoading: true });
    const searchData = { current };
    const { api } = config;
    const queryParams = decrypt(this.props.query.params) || {};
    if (queryParams.search) {
      searchData.search = queryParams.search;
    }
    let articlesRes;
    if (this.props.query.tagId) {
      articlesRes = await axios.get(api.articles.queryByTag.replace(':tag', this.props.query.tagId), { params: searchData });
    } else {
      articlesRes = await axios.get(api.articles.query, { params: searchData });
    }
    this.setState({ isLoading: false });
    if (articlesRes.data.success) {
      Router.push(this.props.pathname, `${this.props.asPath.split('?')[0]}?params=${encrypt(searchData)}`, { shallow: true });
      this.setState({
        articles: articlesRes.data.data,
        pagination: {
          total: articlesRes.data.total,
          pageSize: articlesRes.data.pageSize,
          current: Number(articlesRes.data.current),
        },
      });
    }
  }

  render() {
    const {
      articlesProps = [], paginationProps, tagList, latestPosts, query, asPath,
    } = this.props;
    const queryParams = decrypt(query.params) || {};
    const articles = this.state.articles || articlesProps;
    const pagination = this.state.pagination || paginationProps;


    const titleMap = {
      '/': {
        title: 'Stay Hungry, Stay Foolish',
        subtitle: 'Geass Blog',
        bg: '/static/bg.jpg',
      },
      '/tagslist': {
        title: 'All Tags',
        subtitle: '',
        bg: '/static/bg.jpg',
      },
      '/about': {
        title: 'About Me',
        subtitle: '',
        bg: '/static/bg_about.jpg',
      },
    };
    const currentPath = asPath.split('?')[0];
    const match = currentPath.match(/\/tags\/(.*)/);
    let selectedTag = '';
    if (match) {
      [, selectedTag] = match;

      if (/^\/tags\/(.*)/.test(currentPath)) {
        titleMap[currentPath] = {
          title: 'Tag',
          subtitle: (tagList.filter(item => item.value === selectedTag)[0] || {}).name,
          bg: '/static/bg.jpg',
        };
      }
    }
    return (
      <Page isCustom={false} currentPath={currentPath} titleMap={titleMap}>
        {() => {
          return (
            <div>
              <div className="row" style={{ marginTop: '4px' }} >
                <div className="col-md-8 col-sm-12">
                  <div style={{ position: 'relative', minHeight: '300px' }}>
                    <Loading spinning={this.state.isLoading} />
                    {articles.length === 0 ? (
                      <div className={styles.vacantContainer}>
                        这个区域暂时没有内容呢QAQ，请去其它地方看看吧～
                      </div>
                    ) : articles.map(article =>
                      <Article article={article} key={article.id} onClick={this.onArticleClick.bind(null, article.id)} />)
                    }
                  </div>
                  <Pagination pagination={pagination} onSelect={this.handlePaginationChange.bind(this)} />
                </div>
                <div className="col-md-4 col-sm-12">
                  <Search withBox onSearch={this.onSearch.bind(this)} query={queryParams.search} />
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
