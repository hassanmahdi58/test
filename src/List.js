

import React from 'react';

function List({ data,toggles,onToggle }) {
  if (!onToggle) return (
    <ul className="nav nav-sidebar">            
      {data.map( (r, key) => (
        toggles[key]?<li key={key}>{`${r.artistName} - ${r.trackName||r.collectionName||r.wrapperType}`}</li>:void 0
      ))}
      <li></li>            
    </ul>         
  );
  return(
    <ul className="media-list">
      {data.map( (r, key) => (
        <li key={key} className="media">
          <div className="media-left">
            <img className="media-object" src={r.artworkUrl60} alt="No Artwork" width="60" height="60" />
          </div>
          <div className="media-body">
            <h5 className="media-heading">{`${r.artistName}${r.collectionName?' - ' + r.collectionName:''}`}</h5>
            <span className="tag tag-pill tag-info">{r.wrapperType}</span>{ " " }            
            <span className="tag tag-pill tag-info">{r.collectionType}</span>{ " " }            
            <span className="tag tag-pill tag-info">{r.kind}</span>{ " " }
            {r.trackName}
          </div>
          <div className="media-right">
                  
          </div>
        </li>
      ))}
    </ul>   
  );
}



export default List;