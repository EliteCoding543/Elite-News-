const APIKey = "ff5a9d99fec4444fb123172c3c5ff1ba";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => fetchNews("India"));
function reload() {
  window.location.reload();
}
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${APIKey}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);
}
  function bindData(articles){
    const CardContainer = document.getElementById("cards-container");
    const NewsTemp = document.getElementById("template-news-card");

     CardContainer.innerHTML = "";


     articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone =  NewsTemp.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        CardContainer.appendChild(cardClone);
     });
    }

    function fillDataInCard(cardClone, article){
        const newsImg = cardClone.querySelector(`#news-img`);
        const newstitle = cardClone.querySelector(`#news-title`);
        const newsSource = cardClone.querySelector(`#news-source`);
        const newsDesc = cardClone.querySelector(`#news-desc`);

        newsImg.src = article.urlToImage;
        newstitle.innerHTML = article.title;
        newsDesc.innerHTML = article.description;

        const date =  new Date(article.publishedAt).toLocaleString("en-US",{
            timeZone: "Asia/Jakarta"
        });
        newsSource.innerHTML = `${article.source.name} • ${date}`;
        // new window open //
        cardClone.firstElementChild.addEventListener("click", ()=> {
          window.open(article.url, "_blank");
        });
    }
    // nav sected //
    let curSelectdNav = null;
    // nav item search query and id //
    function onNavItemClick(id) {
      fetchNews(id);
      const navItem  = document.getElementById(id);
         curSelectdNav?.classList.remove(`active`);
         curSelectdNav = navItem;
         curSelectdNav.classList.add(`active`);
    }
    // search bar haeding class//

    const searchBtn = document.getElementById(`Search-btn`);
    const searchtext = document.getElementById(`Search-text`);
    searchBtn.addEventListener("click", () => {
      const query = searchtext.value;
      if(!query) return;
      fetchNews(query);
      curSelectdNav?.classList.remove("active");
      curSelectdNav = null;

    });