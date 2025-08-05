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

      imgExt.forEach(ext => {
        try{
          fetch(basePath + fileName + ext)
          .then(res => {
            if(res.ok) return res.blob();
            })
          .then(blob =>{
            const imageUrl = URL.createObjectURL(blob);
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = fileName;
            img.width = 200;
            item.appendChild(img);
          })
        }
        catch{

        }
      });

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
        item.appendChild(menu);

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