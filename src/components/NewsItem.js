import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imgUrl,newsUrl,author,date, source}=this.props;
    const gmtDateString = new Date(date).toGMTString();
    return (
      <div className='d-flex justify-content-center'>
        <div className="card my-3" style={{width: "18rem"}}>
        <img
            src={imgUrl} className="card-img-top"alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title} <span class="badge text-bg-danger rounded-pill"style={{position: 'absolute', top: '-2%', right: '-15px'}}>{source}</span></h5>
                <p className="card-text">{description}</p>
                <p><small className='text-muted'>By {!author?"Unknown":author} at {gmtDateString}</small></p>
                <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Expand</a>
            </div>
            </div>
            <img src="" alt="" />
      </div>
    )
  }
}

export default NewsItem