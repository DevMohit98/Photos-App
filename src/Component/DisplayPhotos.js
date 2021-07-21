import React from "react"
import "../App.css"
 const DisplayPhotos =({
     urls:
     {regular},
     alt_description,
     likes,
     user:{
         name,
         portfolio_url,
         profile_image:{medium},
     }
 })=>{
     return(
         <article className="photo">
             <img src={regular} alt={alt_description}/>
             <div className="photo-info">
                 <div>
                     <h4>{name}</h4>
                     <p>{likes} likes</p>
                 </div>
                 <a href={portfolio_url} alt="" className="user-img">
                     <img src={medium} alt=""/>
                 </a>
             </div>
     
         </article>
     )
 }
 export default DisplayPhotos;