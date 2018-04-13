import React from 'react';

class ScrollToTop extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      // eslint-disable-next-line
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default ScrollToTop;
