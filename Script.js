//jsonファイルのあるディレクトリのパスとファイル情報(index.json)のパス
//いじるな
const basePath = 'https://tk-oriken.github.io/data/Products/';
const indexURL = 'https://tk-oriken.github.io/data/index.json';

fetch(indexURL)
  .then(res => res.json())
  .then(fileList => {
    fileList.forEach(fileName => {
        const img = document.createElement('img');
        img.src = basePath + fileName + ".png";
        img.alt = fileName;
        img.width = 200;
        document.getElementById('list').appendChild(img);
    });
  })
  .catch(err => {
    console.error('index.json の取得に失敗しました', err);
  });