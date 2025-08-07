//jsonファイルのあるディレクトリのパスとファイル情報(index.json)のパス
//いじるな
const basePath = 'https://tk-oriken.github.io/data/Products/';
const indexURL = 'https://tk-oriken.github.io/data/index.json';
const imgExt = [".png", ".jpeg"];

async function Awake() {

  //Load Our Products
  await fetch(indexURL)
  .then(res => res.json())
  .then(fileList => {
    let imageList = document.getElementById('image-list'); //コンテンツの親オブジェクト

    fileList.forEach(fileName => {
      let item = document.createElement('li'); //子オブジェクトを作成

      //#region : Set Image
      let created = false;
      for(let i = 0; i < imgExt.length; i++)
      {
        if(created) break;
        let check = checkFileExists(basePath + fileName + imgExt[i]);
        check.then(res =>{
          if(res == true)
          {
            let img = document.createElement('img');
            img.src = basePath + fileName + imgExt[i];
            img.alt = `(${imgExt[i]})`;
            img.width = 200;
            img.height = 200;
            item.appendChild(img);
            created = true;
          }
        })
      }
      //#endregion

      //#region : Set Texts
      fetch(basePath + fileName + ".json")
      .then(res => res.json())
      .then(data => {
        var pro = document.createElement('p');
        pro.textContent = data.productName;
        item.appendChild(pro);

        var inv = document.createElement('p');
        inv.textContent = data.inventor;
        item.appendChild(inv);

        var manu = document.createElement('p');
        manu.textContent = data.manufacturer;
        item.appendChild(manu);

        var paper = document.createElement('p');
        paper.textContent = data.paperSize;
        item.appendChild(paper);
      })
      //#endregion

      console.log(item);
      imageList.appendChild(item);
    });
  })
  .catch(err => {
    console.error('index.json の取得に失敗しました', err);
    return;
  });


}

/*
fetch(indexURL)
  .then(res => res.json())
  .then(fileList => {
    let imageList = document.getElementById('image-list');

    fileList.forEach(fileName => {
      let item = document.createElement('li');

      let created = false;
      for(let i = 0; i < imgExt.length; i++)
      {
        if(created) break;

        let check = checkFileExists(basePath + fileName + imgExt[i]);
        check.then(res =>{
          if(res == true)
          {
            let img = document.createElement('img');
            img.src = basePath + fileName + imgExt[i];
            img.alt = `(${imgExt[i]})`;
            img.width = 200;
            img.height = 200;
            item.appendChild(img);
            created = true;
          }
        })
      }

      fetch(basePath + fileName + ".json")
      .then(res => res.json())
      .then(data => {
        var pro = document.createElement('p');
        pro.textContent = data.productName;
        item.appendChild(pro);

        var inv = document.createElement('p');
        inv.textContent = data.inventor;
        item.appendChild(inv);

        var manu = document.createElement('p');
        manu.textContent = data.manufacturer;
        item.appendChild(manu);

        var paper = document.createElement('p');
        paper.textContent = data.paperSize;
        item.appendChild(paper);
      })

      console.log(item);
      imageList.appendChild(item);
    });
  })
  .catch(err => {
    console.error('index.json の取得に失敗しました', err);
  }
);

async function checkFileExists(url) {

  console.log(url);

  try {
    const response = await fetch(url);

    if (response.ok) {
      console.log("OK file exist :" + url);
      return true;
    } 
    else if (response.status === 404) {
      console.log("NG file not exist : " + url);
      return false;
    } 
    else {
      console.log(`⚠️ エラー：${response.status}`);
      return false;
    }
  } 
  catch (error) {
    console.error("⚡ ネットワークエラーまたは例外:", error);
    return false;
  }
}
*/