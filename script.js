let imagePath = "https://picsum.photos/1536/1024/?random"
let quotePath = "https://favqs.com/api/qotd";

document.querySelector('#preloader').addEventListener('transitionend', function (e) {
    e.target.parentNode.removeChild(e.target);
});

async function fetchAs(resType, reqUrl, callback) {
    "use strict";
    let res = await fetch(reqUrl);
    res = await res[resType]();
    callback(res);
}

fetchAs('json', quotePath, function (json) {
    document.querySelector('#quote').innerHTML = json.quote.body;
    document.querySelector('#author').innerHTML = `- ${json.quote.author}`;    
});

fetchAs('blob', imagePath, function (imgBlob) {
    let imgUrl = URL.createObjectURL(imgBlob);
    document.querySelector('body').style.backgroundImage = `url('${imgUrl}')`;
    document.querySelector('#preloader').style.backgroundColor = 'rgba(0,0,0,0)'; 
});