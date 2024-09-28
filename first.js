let API_KEY = "a8f7f2d5ba294e538061ec661cc2de31";
let url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load' , () => fetchNews("Stock Market")); 

function reload() {
   window.location.reload();
}

async function fetchNews (query) {
    let res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    let data = await res.json();
    bindData(data.articles);
    console.log(data);
}

function bindData(articles) {
   let newsContainer = document.getElementById('news-container');
   let newsTemplate = document.getElementById('template-news');

   newsContainer.innerHTML = "";

   articles.forEach(article => {
      if(!article.urlToImage) return;
      let newsClone = newsTemplate.content.cloneNode(true);
      fillDataInNews(newsClone , article);
      newsContainer.appendChild(newsClone);
   });
}

function fillDataInNews(newsClone , article) {
   let newsImg = newsClone.querySelector(`#news-img`);
   let newsTitle = newsClone.querySelector(`#news-title`);
   let newsSource = newsClone.querySelector(`#news-source`);
   let newsDesc = newsClone.querySelector(`#news-desc`);

   newsImg.src = article.urlToImage;
   newsTitle.innerHTML = article.title;
   newsDesc.innerHTML = article.description;

   let date = new Date(article.publishedAt).toLocaleString("en-US" , {
      timeZone: "Asia/Jakarta"
   });

   newsSource.innerHTML = `${article.source.name} @ ${date}`;

   newsClone.firstElementChild.addEventListener('click', () => {
      window.open(article.url, "_blank");
   });
}

let curSelectedNav = null;
function onNavItemClick(id) {
   fetchNews(id);
   let navItem = document.getElementById(id);
   curSelectedNav?.classList.remove("active");
   curSelectedNav = navItem;
   curSelectedNav.classList.add("active");
}

let searchButton = document.getElementById("sec-button");
let searchText = document.getElementById("sec-text");

searchButton.addEventListener("click" , () => {
   let query = searchText.value;
   if (!query) return;
   fetchNews(query);
});