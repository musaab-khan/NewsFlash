import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
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
  let url="https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=48bb98f2a6c0458d873f0244eac7f043&page=1&pageSize=20"
  let data = await fetch(url);
  let parsedData= await data.json();
  console.log(parsedData);
  this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
}

  handlePreviousClick=async ()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=48bb98f2a6c0458d873f0244eac7f043&page=${this.state.page-1}&pageSize=20`
  let data = await fetch(url);
  let parsedData= await data.json();
  console.log(parsedData);
    this.setState({
      page: this.state.page-1,
      articles: parsedData.articles
    })
  }
  handleNextClick=async()=>{
    console.log("next")
    if(this.state.page+1>Math.ceil(this.state.totalResults/20)){
      console.log("empty")
    }
    else{

    let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=48bb98f2a6c0458d873f0244eac7f043&page=${this.state.page+1}&pageSize=20`
  let data = await fetch(url);
  let parsedData= await data.json();
  console.log(parsedData);
    this.setState({
      page: this.state.page+1,
      articles: parsedData.articles
    })
  }
  }

  render() {
    console.log("render")
    return (
      <div className="container my-3">
        <h2>NewsFlash - Top Head Lines</h2>
        <div className="row">
          {this.state.articles.map((e)=>{
            return (
              <div className='col md-4' key={e.url}>
                <NewsItem title={e.title?e.title.slice(0,45):""} description={e.description?e.description.slice(0,88):""} imgUrl={e.urlToImage} newsUrl={e.url}></NewsItem>
              </div>
            )
          })}
        </div>
        <div class="d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-info" onClick={this.handlePreviousClick}>&larr; Previous</button>
                <button type="button" className="btn btn-info" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>

    )
    
  }
}


export default News