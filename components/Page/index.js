import React from 'react';
import PropTypes from 'prop-types';
import HeadMeta from '../head';
import { Head, Footer, Icon, ErrorBoundary } from '../index';
import styles from '../../styles/index.less';

export default class Page extends React.PureComponent {
  static propType = {
    isCustom: PropTypes.bool,
    titleMap: PropTypes.object,
    menuItems: PropTypes.array,
  }

  static defaultProps = {
    isCustom: false,
    titleMap: {
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
    },
    menuItems: [{
      key: '/',
      title: 'HOME',
    }, {
      key: '/tagslist',
      title: 'TAGS',
    }, {
      key: '/about',
      title: 'ABOUT',
    }],
  }

  constructor(props) {
    super(props);
    this.state = {
      isMount: false,
    };
  }

  componentDidMount() {
    import('../Live2D').then((module) => {
      this.Live2D = module.default;
      this.setState({ isMount: true });
    });
  }

  handleError = (err, errInfo) => {
    // eslint-disable-next-line
    // const ua = navigator.appVersion;
    // this.props.dispatch({
    //   type: 'app/errorHandle',
    //   payload: {
    //     errInfo: `${err.name}：${err.message}`,
    //     stack: errInfo.componentStack,
    //     ua,
    //   },
    // });
  }

  render() {
    const {
      isCustom, titleMap, menuItems, children = () => '',
    } = this.props;

    const { Live2D } = this;
    return (
      <ErrorBoundary onError={this.handleError} >
        <HeadMeta title="Geass Blog" />
        <div id="app">
          <Head menuItems={menuItems} titleMap={titleMap} isCustom={isCustom} />
          <div className="container">
            {typeof children === 'function' ? children() : ''}
          </div>
          {Live2D && this.state.isMount && <Live2D />}
          <Footer copyright="@CopyRight 2017 Blog of Geass">
            <div className={styles.footerIcon}>
              <a href="https://github.com/nullptru"><Icon type="github" /></a>
              <a href="https://twitter.com/nullptru"><Icon type="twitter" /></a>
            </div>
          </Footer>
        </div>
      </ErrorBoundary>
    );
  }
}

