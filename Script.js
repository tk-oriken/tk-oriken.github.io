//jsonファイルのあるディレクトリのパスとファイル情報(index.json)のパス
//いじるな
const basePath = 'https://tk-oriken.github.io/data/Products/';
const indexURL = 'https://tk-oriken.github.io/data/index.json';
const imgExt = [".png", ".jpeg"];

fetch(indexURL)
  .then(res => res.json())
  .then(fileList => {
    const imageList = document.querySelector('imageList');
    fileList.forEach(fileName => {
      const item = document.createElement('li');

      if(ItemExist(basePath + fileName))
      {
        const img = document.createElement('img');
        img.src = basePath + fileName + ".png";
        img.alt = fileName;
        img.width = 200;
        document.getElementById('list').appendChild(img);
      }
    });
  })
  .catch(err => {
    console.error('index.json の取得に失敗しました', err);
  });

function ItemExist(url){
  var i = ImageExist(url);
  var t = TextExist(url)
  return (i && t);
}

function TextExist(url){
  fetch(url + ".json")
  .then(Response =>{
    if(Response.status == 200) return true;
    else return false;
  }
  )
}

function ImageExist(url){
  imgExt.forEach(ext => {
    fetch(url + ext)
    .then(Response => {
      if(Response.status == 200) return true;
      else return;
    })
  });
  return false;
}