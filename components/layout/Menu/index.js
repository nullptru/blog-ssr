import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

export default class Menu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      activeKey: this.props.defaultActiveKey,
    };
  }

  onClick(item) {
    this.props.onClick(item.key, item);
    this.setState({ activeKey: item.key });
  }

  render() {
    const { items, mode } = this.props;
    const menuItemClassList = [styles.menuItem];
    const menuClassList = [styles.menu];
    menuClassList.push(styles[mode]);
    return (
      <ul className={menuClassList.join(' ')}>
        { items.map((item) => {
          const itemClass = menuItemClassList.slice(0);
          itemClass.push(this.state.activeKey === item.key ? styles.active : '');
          itemClass.push(this.props.hasBackground ? '' : styles.noBackground);

          return (
            <li
              key={item.key}
              className={itemClass.join(' ')}
              onClick={this.onClick.bind(this, item)}
            >
              {item.title}
            </li>
          );
        })}
      </ul>
    );
  }
}

Menu.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func,
  mode: PropTypes.string,
  hasBackground: PropTypes.bool,
};

Menu.defaultProps = {
  items: [],
  onClick: () => {},
  mode: 'horizontal',
  hasBackground: true,
};
