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

      for(let ext of imgExt)
      {
        try{
          const img = document.createElement('img');
          img.src = baseUrl + ext;
          img.alt = `画像(${ext})`;

          img.onload = () => {
            if (!loaded) {
              loaded = true;
              item.appendChild(img);
            }
          };

          img.onerror = () => {
            console.log(`読み込み失敗: ${img.src}`);
          };
        }
        catch{

        }
      }

      fetch(basePath + fileName + ".json")
      .then(res => res.json())
      .then(data => {
        const pro = document.createElement('p');
        pro.textContent = data.productName;
        item.appendChild(pro);

        const inv = document.createElement('p');
        inv.textContent = data.inventor;
        item.appendChild(inv);

        const manu = document.createElement('p');
        manu.textContent = data.manufacturer;
        item.appendChild(manu);

        const paper = document.createElement('p');
        paper.textContent = data.paperSize;
        item.appendChild(paper);
      })
    });
  })
  .catch(err => {
    console.error('index.json の取得に失敗しました', err);
  }
);