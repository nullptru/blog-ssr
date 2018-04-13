import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import Router from 'next/router'
import Menu from '../Menu';
import styles from './index.less';

export default class Head extends React.PureComponent {
  constructor(props) {
    super(props);
    this.clientRouter = { pathname: '/' };
  }

  componentDidMount() {
    this.clientRouter = Router;
  }

  onMenuClick = (key) => {
    Router.push(key);
  };

  getDefaultActiveKey = (path) => {
    switch (path) {
      case '/':
      case '/tagslist':
      case '/about': return path;
      default: return undefined;
    }
  };

  render() {
    const {
      menuItems, isCustom, customBgImage, titleMap,
    } = this.props;
    const currentTitle = titleMap[this.clientRouter.pathname] || { bg: '/static/bg.jpg' };
    const defaultActiveKey = this.getDefaultActiveKey(this.clientRouter.pathname);
    return (
      <header className={styles.header} style={{ backgroundImage: `url(${isCustom ? customBgImage : currentTitle.bg })` }}>
        <nav>
          <section className={styles.left}>
            <Link href="/"><a className={styles.logo} >废宅的小窝</a></Link>
          </section>
          <section className={styles.right}>
            <Menu items={menuItems} onClick={this.onMenuClick.bind(this)} defaultActiveKey={defaultActiveKey || menuItems[0].key} hasBackground={false} />
          </section>
        </nav>
        <div className={styles.headTitle}>
          { !isCustom &&
          <div>
            <span className={styles.title}>{currentTitle.title || ''}</span>
            <span className={styles.subtitle}>{currentTitle.subtitle || ''}</span>
          </div>}
        </div>
      </header>
    );
  }
}
