import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

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

  capitalizeFirstLetter=(word)=> {
    if (word && typeof word === 'string') {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return '';
    }
  }

constructor(props){ //using props bcz using category from props in constructor
  super(props); //parent's constructor (has to be called)
  this.state={
    articles:this.articles,
    loading : false,
    page: 1,
    totalResults: 0
  }
  document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsFlash`;
}

async newsUpdate(){
  this.props.setProgress(10);
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
  this.setState({loading: true})
  let data = await fetch(url);
  this.props.setProgress(50);
  let parsedData= await data.json();
  this.props.setProgress(70);
  console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
      page: this.state.page
    })
    this.props.setProgress(100);
    
}

async componentDidMount(){
  this.newsUpdate();
}

  // handlePreviousClick= ()=>{
  //   this.setState(prevState => ({page: prevState.page-1}), () => {
  //     this.newsUpdate();
  //   });
  // }
  // handleNextClick=()=>{
  //   this.setState(prevState => ({page: prevState.page+1}), () => {  //here callback function prevState is used bcz Since setState is asynchronous, without a callback function, there is no guarantee that the state has been updated when you try to access it immediately after calling setState.
  //     this.newsUpdate();
  //   });
  // }
  
  fetchData = async () => {
    this.setState({ loading: true });
  
    // Fetch data with the updated page number
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  
    let data = await fetch(url);
    let parsedData = await data.json();
  
    // Update state using the callback function
    this.setState(prevState => ({
      articles: [...prevState.articles, ...parsedData.articles],
      totalResults: parsedData.totalResults,
      loading: false,
      page: prevState.page + 1
    }));
  };
  


  render() {
    return (
      <>
        <h1 className='text-center'>NewsFlash - Top {this.capitalizeFirstLetter(this.props.category)} Head Lines</h1>
        {this.state.loading&&<Loader/>}

        <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.articles.length!=this.state.totalResults}
          loader={<Loader/>}
          endMessage={
            this.state.articles.length == this.state.totalResults ? (
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            ) : null
          }
          
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((e)=>{
               return (
                <div className='col md-4 mx-auto' key={e.url}>
                <NewsItem title={e.title?e.title:""} description={e.description?e.description:""} imgUrl={e.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt} source={e.source.name}> </NewsItem>
            </div>
            )
          })}
        </div>
        

        </div>
        </InfiniteScroll>
        
        {/* <div class="d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-info" onClick={this.handlePreviousClick}>&larr; Previous</button>
                <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-info" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>

    )
    
  }
}


export default News