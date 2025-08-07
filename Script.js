document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOMの読み込みが完了しました");

  await Awake();
});

async function Awake() {
  const basePath = 'https://tk-oriken.github.io';
  const imgExt = [".png", ".jpeg"];

  document.documentElement.classList.add('no-scroll'); // html
  document.body.classList.add('no-scroll');   

  //Make Overlay Appear
  let over = document.getElementById('overlay');
  over.classList.remove("hidden");

  //Set Title Panel
  let loading = document.getElementById('loadPanel');
  loading.classList.remove("hide");

  //Load and Create Our Products
  await fetch(basePath + "/data/index.json")
  .then(res => res.json())
  .then(async fileList => {
    let imageList = document.getElementById('image-list'); //コンテンツの親オブジェクト

    for(let num = 0; num < fileList.length; num++)
    {
      let item = document.createElement('li'); //子オブジェクトを作成
      let fileName = fileList[num];

      //#region : Set Image
      for(let i = 0; i < imgExt.length; i++)
      {
        if(await checkFileExists(basePath + "/data/Products/" + fileName + imgExt[i]) == true)
        {
          let img = document.createElement('img');
          img.src = basePath + fileName + imgExt[i];
          img.alt = `(${imgExt[i]})`;
          img.width = 200;
          img.height = 200;
          item.appendChild(img);
          created = true;
          break;
        }
      }
      //#endregion

      //#region : Set Texts
      fetch(basePath + "/data/Products/" + fileName + ".json")
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
    }
  })
  .catch(err => {
    console.error('Some Error Happened during Generating the Images', err);
    return;
  });

  await delay(2000);

  //Make Overlay 
  document.documentElement.classList.remove('no-scroll');
  document.body.classList.remove('no-scroll');
  over.classList.add("hidden")

  loading.classList.add("hide");
}

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

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}