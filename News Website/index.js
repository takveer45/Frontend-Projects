console.log("This is my index js file");

//date script
let a;
let date;
let time;
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
setInterval(() => {
  a = new Date();
  date = a.toLocaleDateString(undefined, options);
  time = a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
  document.getElementById('time').innerHTML = time + "<br>on " + date;
}, 1000);


// Initialize the news api parameters
// place your api key from gnews in token below 
let token = ''

// Grab the news container
let newsAccordion = document.getElementById('newsAccordion');

// Create an ajax get request
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://gnews.io/api/v4/top-headlines?token=${token}&country=in&lang=hi`, true);

// What to do when response is ready
xhr.onload = function () {
  if (this.status === 200) {
    let json = JSON.parse(this.responseText);
    let articles = json.articles;
    console.log(articles);
    let newsHtml = "";
    articles.forEach(function (element, index) {
      console.log(element, index)

      let news = `
 <div class="card mx-3" style="width: 18rem;">
 <h5>Breaking News ${index + 1}</h5>
  <img src="${element['image']}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${element["title"]}</h5>
    <p class="card-text">${element.description}</p>
    <div class="card-footer">
    <small class="text-muted">${element["publishedAt"]}</small>
  </div>
    <a href="${element['url']}" class="btn btn-primary">Read more</a>
  </div>
</div>
`
      newsHtml += news;
    });
    newsAccordion.innerHTML = newsHtml;
  }
  else {
    console.log("Some error occured")
  }
}

xhr.send()


