import React from 'react';
import { createForm } from 'rc-form';
import { Input, ThrottleButton } from '../../components';
import styles from './styles.less';

class Comment extends React.PureComponent {
  state = {
    inputErr: false,
    createErr: false,
  }
  checkEmpty = (rule, value, callback) => {
    if (!value || value.trim() === '') {
      callback('请不要让我空着哦～');
    }
    callback();
  }

  handleCommentCreate = () => {
    const { form: { validateFields, getFieldsValue, setFieldsValue } } = this.props;

    validateFields((errors) => {
      if (errors) {
        this.setState({
          inputErr: true,
          createErr: true,
        });
        return;
      }
      this.props.onCreateComment({
        ...getFieldsValue(),
      }).then((result) => {
        if (result) {
          setFieldsValue({
            author: '',
            message: '',
          });

          this.setState({
            inputErr: false,
            createErr: false,
          });
        }
      });
    });
  };

  render() {
    const { comments, form: { getFieldDecorator } } = this.props;
    const { createErr, inputErr } = this.state;

    return (
      <div className={styles.commentContainer}>
        {comments.length > 0 && (
          <React.Fragment>
            <div className={styles.header}>评论区：</div>
            <div className={styles.list}>
              {comments.map(comment => (
                <section key={comment.id} className={styles.commentItem}>
                  <header>
                    <span className={styles.name}>{comment.author}</span>
                    {comment.createdTime && <span className={styles.time}>{comment.createdTime.substr(0, 10)}</span>}
                  </header>
                  <div className={styles.commentMessage}><span>{comment.message}</span></div>
                </section>
                ))}
            </div>
          </React.Fragment>
        )}
        <div>
          <div className={styles.subHeader}>发表评论：</div>
          {getFieldDecorator('author', {
             rules: [{
               required: true,
               type: 'string',
               message: '请不要让我空着哦～',
              }, {
                validator: this.checkEmpty,
              }],
          })(<Input className={styles.editAuthor} placeholder="你的评论昵称～" />)}
          {getFieldDecorator('message', {
             rules: [{
               required: true,
               type: 'string',
               message: '请不要让我空着哦～',
              }, {
                  validator: this.checkEmpty,
              }],
          })(<Input multiple className={styles.editComment} />)}
          {inputErr && <span className="error">请不要留空评论内容和昵称哦～</span>}
          <ThrottleButton
            text="发表"
            throttleTime={1000 * 60}
            onClick={this.handleCommentCreate}
            clear={createErr}
          />
        </div>
      </div>
    );
  }
}

export default createForm()(Comment);
