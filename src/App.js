import React, { useEffect, useState } from "react"
import "./App.css"
import DisplayPhotos from "./Component/DisplayPhotos";
import {FaSearch} from "react-icons/fa"
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`
const clientID = `?client_id=${process.env.REACT_APP_PHOTOS_KEY}`
 const App=()=>{
   const [loading,setloading]=useState(false);
   const [photos,setPhotos]=useState([]);
   const [query,setQuery]=useState("");
   const [page,setPage]=useState(0)
 const fetchImage=async()=>{
setloading(true);
let url
const urlPage=`&page=${page}`
const urlQuery=`&query=${query}`
if(query)
{
  url=`${searchUrl}${clientID}${urlPage}${urlQuery}`
}
else
{
  url=`${mainUrl}${clientID}${urlPage}`
  }
try{
const response =await fetch(url);
const data=await response.json();
console.log(data);
setPhotos((oldPhotos)=>{
  if(query && page=== 1)
  {
    return data.results
  }
else if(query)
 {
   return[...oldPhotos,...data.results]
 }
 else
 {
   return[...oldPhotos,...data]
 }
});
setloading(false);
}
catch(error)
{
  console.log(error); 
  setloading(false);  
}
}
const HandleSubmit =(e)=>{
e.preventDefault();
setPage(1);
}
useEffect(()=>{
fetchImage()
// eslint-disable-next-line
},[page])
useEffect (()=>{
  const event=window.addEventListener("scroll",()=>{
    if((!loading && window.innerHeight+window.scrollY)>=document.body.scrollHeight-2)
    {
      setPage((oldPage)=>{
        return oldPage+1;
      })
    }
  });
  return ()=> window.removeEventListener('scroll',event);
  // eslint-disable-next-line
},[])
   return(
     <main>
     <section className='search'>
       <form className="search-form">
         <input type="text"
         placeholder="search"
         className="form-input"
         value={query}
         onChange={((e)=>{setQuery(e.target.value)})}/>
         <button className="submit-btn" type="submit" onClick={HandleSubmit}><FaSearch/></button>
       </form>
  </section>
  <section className="photos">
    <div className="photos-center">
      {photos.map((items)=>{
        return <DisplayPhotos key={items.id} {...items}/>
      })}
    </div>
{loading && <h2 className="loading">Loading...</h2>}
  </section>
     </main>
   )
 }
 export default App;