import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Icon } from '../components';
import Page from '../components/Page';
import { Comment as CommentComponent, styles } from '../pagesComponents/articleDetail';
import config from '../utils/config';

export default class extends React.PureComponent {
  static getInitialProps = async ({
    pathname, query, asPath,
  }) => {
    const { api } = config;
    const articlesRes = await axios.get(api.articles.querySingle.replace(':id', query.id));
    const commentsRes = await axios.get(api.comments.query.replace(':id', query.id));

    return {
      pathname,
      query,
      asPath,
      article: articlesRes.data.data,
      comments: commentsRes.data.data,
    };
  }

  static propTypes = {
    article: PropTypes.object,
  }

  static defaultProps = {
    article: { type: {}, tags: [] },
  }

  state = {
    isMount: false,
    comments: undefined,
  }

  componentDidMount() {
    import('../components/HighLight').then((module) => {
      this.HighLight = module.default;
      this.setState({ isMount: true });
    });
  }

  async handleCreateComment(data) {
    const createCommentRes = await axios.post(config.api.comments.create.replace(':id', this.props.query.id), data);

    if (createCommentRes.data.success) {
      Router.reload(this.props.asPath);
      const commentRes = await axios.get(config.api.comments.query.replace(':id', this.props.query.id));
      this.setState({
        comments: commentRes.data.data,
      });
    }
    return Promise.resolve(createCommentRes.data.success);
  }

  render() {
    const { article, pathname, comments } = this.props;
    const { isMount } = this.state;
    const { HighLight } = this;
    const tags = article.tags || [];
    const commentList = this.state.comments || comments;
    return (
      <Page customBgImage="" currentPath={pathname}>
        {() => {
          return (
            <React.Fragment>
              <div className={styles.detailContainer}>
                <article className={styles.detail}>
                  <header>
                    <div className={styles.title}>{ article.title }</div>
                    <div className={styles.meta}>
                      <span className={styles.time}>Posted by { article.author } on { article.createdTime }</span>
                    </div>
                  </header>
                  {isMount ? <HighLight className={styles.content}>
                    <ReactMarkdown source={article.content} escapeHtml={false} />
                  </HighLight> : <ReactMarkdown source={article.content} escapeHtml={false} />}
                  {tags && tags.length > 0 && <section className={styles.tags}>
                    <Icon type="tags" />
                    { tags.map(tag =>
                      <Link key={tag.id} href={`/tags/${tag.value}`}><a className={styles.tag}>{ tag.name }</a></Link>) }
                  </section>}
                </article>
                <div className={styles.btnGroup}>
                  {article.pre ? <Link href={`/article/${article.pre.id}` || '/'} prefetch><a className={styles.pre}><span>Previous</span><span className={styles.title}>{article.pre.title}</span></a></Link> : <span className={styles.noMore}>没有更多</span>}
                  {article.next ? <Link href={`/article/${article.next.id}` || '/'} prefetch><a className={styles.next}><span>Next</span><span className={styles.title}>{article.next.title}</span></a></Link> : <span className={styles.noMore}>没有更多</span>}
                </div>
              </div>
              {article.id && <CommentComponent key={article.id} comments={commentList} onCreateComment={this.handleCreateComment.bind(this)} />}
            </React.Fragment>
          );
        }}
      </Page>
    );
  }
}
