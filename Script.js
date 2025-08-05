//jsonファイルのあるディレクトリのパスとファイル情報(index.json)のパス
//いじるな
const basePath = 'https://tk-oriken.github.io/data/Products/';
const indexURL = 'https://tk-oriken.github.io/data/index.json';
const imgExt = [".png", ".jpeg"];

fetch(indexURL)
  .then(res => res.json())
  .then(fileList => {
    let imageList = document.getElementById('image-list');

    fileList.forEach(fileName => {
      var item = document.createElement('li');

      var loaded = false;
      for(let ext of imgExt)
      {
        if(checkFileExists(basePath + fileName + ext))
        {
          var img = document.createElement('img');
          img.src = basePath + fileName + ext;
          img.alt = `(${ext})`;
          img.width = 200;
          img.height = 200;

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

      console.log(imageList);
      console.log(item);
      imageList.appendChild(item);
    });
  })
  .catch(err => {
    console.error('index.json の取得に失敗しました', err);
  }
);

async function checkFileExists(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (response.ok) {
      console.log("✅ ファイルは存在します！");
      return true;
    } else if (response.status === 404) {
      console.log("❌ ファイルは存在しません！");
      return false;
    } else {
      console.log(`⚠️ エラー：${response.status}`);
      return false;
    }
  } catch (error) {
    console.error("⚡ ネットワークエラーまたは例外:", error);
    return false;
  }
}

// 使い方例：
checkFileExists('octocat', 'Hello-World', 'README.md');