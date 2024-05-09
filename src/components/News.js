import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // document.title=`${this.capitalizeFirstLetter(props.category)} - NewsFlash`;

  const capitalizeFirstLetter=(word)=> {
    if (word && typeof word === 'string') {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return '';
    }
  }


const newsUpdate = async()=>{
  props.setProgress(10);
  let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
  setLoading(true)
  let data = await fetch(url);
  props.setProgress(50);
  let parsedData= await data.json();
  props.setProgress(70);
  setArticles(parsedData.articles);
  setTotalResults(parsedData.totalResults);
  setLoading(false);
  props.setProgress(100);
    
}

useEffect(() => { //componentDidMount replacement runs after component mounted
  newsUpdate();
}, [])


  const handlePreviousClick= ()=>{
    setPage(prevPage => prevPage-1);
    newsUpdate();
    }
  
  const handleNextClick= ()=>{
    setPage(prevPage => prevPage+1);
    newsUpdate();
    }
  
  const fetchData = async () => {
    setLoading(true);
    // Fetch data with the updated page number
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
  
    let data = await fetch(url);
    let parsedData = await data.json();
  
    // Update state using the callback function
    setArticles(prevArticles => [...prevArticles, ...parsedData.articles]); //adding to (concating) current data in articles
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setPage(prevPage => prevPage + 1);
  };
  
    return (
      <>
        <h1 className='text-center'>NewsFlash - Top {capitalizeFirstLetter(props.category)} Head Lines</h1>
        {loading&&<Loader/>}

        <InfiniteScroll
          dataLength={articles.length} //This is important field to render the next data
          next={fetchData}
          hasMore={articles.length!=totalResults}
          loader={<Loader/>}
          endMessage={
            articles.length == totalResults ? (
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            ) : null
          }
          
        >
          <div className="container">
          <div className="row">
            {articles.map((e)=>{
               return (
                <div className='col md-4 mx-auto' key={e.url}>
                <NewsItem title={e.title?e.title:""} description={e.description?e.description:""} imgUrl={e.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt} source={e.source.name}> </NewsItem>
            </div>
            )
          })}
        </div>
        

        </div>
        </InfiniteScroll>
        
        {/* <div class="d-flex justify-content-between"> //added infinite scrolling
                <button disabled={page<=1} type="button" className="btn btn-info" onClick={this.handlePreviousClick}>&larr; Previous</button>
                <button disabled={page+1>Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-info" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>

    )
}

News.defaultProps ={
  country: "in",
  pageSize: "9",
  category: "general"
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News