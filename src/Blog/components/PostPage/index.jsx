import React, { Component } from 'react';
import GeneralPreloader from './../../../components/GeneralPreloader';
import styles from './PostPage.scss';

class PostPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getPostById(this.props.postId)
      .then(json => this.setState(json));
  }

  componentWillUnmount() {
    this.props.updatePostById(
        this.props.postId,
        Object.assign(this.state, {'views': this.state.views + 1})
      )
      .then(() => this.props.updateViewsNumber(this.props.postId));
  }

  render() {
    this.date = new Date(this.state.date);
    if (!this.state.title) {
      return <GeneralPreloader />
    }
    
    return (
      <div className={styles.postPage}>
        <div>
          <p className={styles.title}>
            {this.state.title}
          </p>
          <div>
            <div className={styles.bgWrap} />
            <img src={this.state.image} alt="news" />
            <p className={styles.stats}>
              <span className={styles.views}>
                <i className="fa fa-eye" />
                <span className={styles.nViews}>
                  {this.state.views}
                </span>
              </span>
              <time dateTime={this.state.date}>
                {('0' + this.date.getDate()).slice(-2) + '/' + ('0'+(this.date.getMonth() + 1)).slice(-2) + '/' +
                this.date.getFullYear() + ' '}
              </time>
            </p>
          </div>
          <pre className={styles.newsDesc}>
            {this.state.describe}
          </pre>
        </div>
      </div>
    );
  }
}

export default PostPage;
