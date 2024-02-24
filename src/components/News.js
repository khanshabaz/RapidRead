import React, { useState,useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

 const News = (props)=> {
  let [articles,setArticles]=useState([])
  let [loading,SetLoading]=useState(true)
  let [page,setPage]=useState(1)
  let [totalResults,setTotalResults]=useState(0)
  const cap = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
    document.title = `${cap(props.category)} - iNews`;
  
  const updateNews= async () =>{
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${
      props.category
    }&apiKey=edf6e81d24e7416581def30d6d2866b7&page=${
      setPage(page+1)
    }&pageSize=${props.pageSize}`;
    SetLoading(true );
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    SetLoading(false)
    props.setProgress(100);

  }
  useEffect(()=>{
    updateNews();
    // eslint-disable-next-line
  },[])
 const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${
      props.category
    }&apiKey=${props.apiKey}&page=${
      page+1
    }&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults)
  };
 
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px" ,marginTop:'90px'}}>
          iNews - Top {cap(props.category)} Headlines
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {
                articles.map((element) => {
                  return <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title : ""}
                        description={
                          element.description ? element.description : ""
                        }
                        imageUrl={element.urlToImage}
                        url={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
}

export default News
News.defaultProps={
  country:'in',
  pageSize:8,
  category:"Generanl"
}
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}