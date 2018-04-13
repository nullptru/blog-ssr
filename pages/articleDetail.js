import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Icon, Loading } from '../components';
import Page from '../components/Page';
import { Comment as CommentComponent, styles } from '../pagesComponents/articleDetail';

export default class extends React.PureComponent {
  static propTypes = {
    article: PropTypes.object,
  }

  static defaultProps = {
    article: { type: {}, tags: [] },
  }

  state = {
    isLoading: false,
    isMount: false,
  }

  componentDidMount() {
    // this.props.dispatch({
    //   type: 'articles/updateState',
    //   payload: {
    //     article: {},
    //   },
    // });
    import('../components/HighLight').then((module) => {
      this.HighLight = module.default;
      this.setState({ isMount: true });
    });
  }

  render() {
    const { article } = this.props;
    const { isLoading, isMount } = this.state;
    const { HighLight } = this;
    const tags = article.tags || [];
    return (
      <Page customBgImage="" >
        {() => {
          return (
            <React.Fragment>
              <div className={styles.detailContainer}>
                <article className={styles.detail}>
                  <Loading spinning={isLoading} />
                  <header>
                    <div className={styles.title}>{ article.title }</div>
                    <div className={styles.meta}>
                      {isLoading ? <span />
                        : <span className={styles.time}>Posted by { article.author } on { article.createdTime }</span>}
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
                  {article.pre ? <Link href={`/article/${article.pre.id}` || '/'}><a className={styles.pre}><span>Previous</span><span className={styles.title}>{article.pre.title}</span></a></Link> : <span className={styles.noMore}>没有更多</span>}
                  {article.next ? <Link href={`/article/${article.next.id}` || '/'}><a className={styles.next}><span>Next</span><span className={styles.title}>{article.next.title}</span></a></Link> : <span className={styles.noMore}>没有更多</span>}
                </div>
              </div>
              {article.id && <CommentComponent articleId={article.id} key={article.id} />}
            </React.Fragment>
          );
        }}
      </Page>
    );
  }
}
