import React from "react";

const NewsItem =(props)=> {
    let { title, description,imageUrl,url,author,date,source} = props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{
            display:"flex",
            justifyContent:"flex-end",
            position:"absolute",
            right:0

          }}>
        <span className=" badge rounded-pill bg-danger">{source}</span> 

          </div>
          <img src={!imageUrl?"https://images.hindustantimes.com/tech/img/2023/08/06/1600x900/HT_1691283414898_1691283415117.jpg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {date}</small></p>
            <a rel="noreferrer" href={url} target="_blank" className="btn btn-sm btn-dark">
              Read More..
            </a>
          </div>
        </div>
      </div>
    );
  }


export default NewsItem;
