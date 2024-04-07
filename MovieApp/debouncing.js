

  let movie_div = document.getElementById('movies')
  movie_div.style.visibility='hidden'

let timerId;
  async function searchMovies(movie_name) {
    try {
      let res = await fetch(`https://www.omdbapi.com/?s=${movie_name}&apikey=68bfdedf`)
      let data = await res.json()
      return data;
    }
    catch (e) {
      console.log(e)
    }
  }

function appendMovies(movies){

  if(movies==undefined){
    return false
  }
 
  movie_div.innerHTML=null;
  let movie=document.getElementById('movie')
  console.log(movie.style.focus)
  movie_div.style.visibility='visible'
  let bodyclick=document.querySelector("body");
  bodyclick.addEventListener("click",hide)
  function hide(){
    movie.value=null;
    movie_div.style.visibility='hidden'
  }
  movies.forEach(function(mov){
    let p=document.createElement('p')
    p.innerText=mov.Title;
    movie_div.append(p)
    p.onclick=function(){
      movieee(mov)
    }

  })
}


async function movieee(dd) {

console.log(dd.imdbID)
let res = await fetch(`https://www.omdbapi.com/?i=${dd.imdbID}&apikey=68bfdedf`)
let data = await res.json()
console.log(data)

localStorage.setItem('moviedetails11', JSON.stringify(data))

window.location.href = 'movieDetail.html';


}

async function main(){
  let name= document.getElementById('movie').value;
  if(name.length<3)
  {
    return false;
  }

  let res=await searchMovies(name)
  let movies=res.Search
  appendMovies(movies)
  console.log(movies)

}

function debounce(func,time){
if(timerId)
  clearTimeout(timerId)
  timerId=setTimeout(function(){
    func()
  },time)

}

  
