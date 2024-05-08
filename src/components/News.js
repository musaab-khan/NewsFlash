import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps ={
    country: "in",
    pageSize: "9",
    category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  articles = []
constructor(){
  super(); //parent's constructor (has to be called)
  this.state={
    articles:this.articles,
    loading : false,
    page: 1
  }
}
async componentDidMount(){
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=48bb98f2a6c0458d873f0244eac7f043&page=1&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  let parsedData= await data.json();
  console.log(parsedData);
  this.setState({
    articles: parsedData.articles,
    totalResults: parsedData.totalResults,
    loading: false
  })
}

  handlePreviousClick=async ()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=48bb98f2a6c0458d873f0244eac7f043&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
  let data = await fetch(url);
  let parsedData= await data.json();
  console.log(parsedData);
    this.setState({
      page: this.state.page-1,
      articles: parsedData.articles,
      loading: false
    })
  }
  handleNextClick=async()=>{
    console.log("next")
    if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=48bb98f2a6c0458d873f0244eac7f043&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page+1,
      articles: parsedData.articles,
      loading: false
    })
  }
  }

  render() {
    console.log("render")
    return (
      <div className="container my-3">
        <h2 className='text-center'>NewsFlash - Top Head Lines</h2>
        {this.state.loading&&<Loader/>}
        {!(this.state.loading) && <div className="row">
          {this.state.articles.map((e)=>{
            return (
              <div className='col md-4' key={e.url}>
                <NewsItem title={e.title?e.title.slice(0,45):""} description={e.description?e.description.slice(0,88):""} imgUrl={e.urlToImage} newsUrl={e.url}></NewsItem>
              </div>
            )
          })}
        </div>}
        <div class="d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-info" onClick={this.handlePreviousClick}>&larr; Previous</button>
                <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-info" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>

    )
    
  }
}


export default News