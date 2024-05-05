import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col md-4">
              <NewsItem title="myTitle" description="mydesc"></NewsItem>
          </div>
          <div className="col md-4">
              <NewsItem title="myTitle" description="mydesc"></NewsItem>
          </div>
          <div className="col md-4">
              <NewsItem title="myTitle" description="mydesc"></NewsItem>
          </div>
        </div>
      </div>

    )
  }
}

export default News