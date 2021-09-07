ddb = document.getElementById('download-div-black')
req_origin = 'http://localhost:3000'//'https://vote-slide.herokuapp.com'

/*
function Export() { //room idが重複しないようサーバーに問い合わせる
  Selecting(null)
  $.getJSON(req_origin+'/get-room-id?n=4', function (data) {
    console.log(data)
    room_id = data['id']

    slides = document.querySelectorAll('.clone-div > section')

    slide_style = "html,body{overflow:hidden;margin:0;padding:0;}"
    slide_style += "section{position:absolute;width:100vw;height:100vh;padding:3vmax;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;background-color:#fff;overflow:hidden}section h1{font-size:150px}section h2{font-size:0}section h3{font-size:50px}section p{font-size:30px}.comment{position:absolute;left:100%;width:100%;overflow:hidden;animation-duration:6s;animation-timing-function:linear;font-size:6vw;color:#888;z-index:160}@keyframes shed{to{transform:translateX(-200vw)}}"
    output = ""
    output = '<!DOCTYPE html><html lang="ja"><head><title>仮のタイトル</title><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><style>' + slide_style + theme_style.innerHTML + '</style></head><body>'
    output += '<section id="top_slide"><img src="https://chart.apis.google.com/chart?chs=400x400&cht=qr&chl=' + req_origin +'/client?r=' + room_id + '"></img><p>click to start</p></section>'

    for (let i = 0; i <= slides.length; i++) {
      if (!slides[i]) {
        break
      }
      if (current_slide_id == "slide" + (i + 1)) {
        let slide=document.getElementById(current_slide_id).cloneNode(true)
        output+=GetFormatedHTMLString(slide)
      } else {
        let slide=slides[i].cloneNode(true)
        output+=GetFormatedHTMLString(slide)
      }
    }
    output += '<section id="end"><p>that\'s all</p></section>'
    output+=' <script src="https://cdn.socket.io/3.1.3/socket.io.min.js" integrity="sha384-cPwlPLvBTa3sKAgddT6krw0cJat7egBga3DJepJyrLl4Q9/5WLra3rrnMcyTyOnh" crossorigin="anonymous"></script>'
    output+='<script src="https://code.jquery.com/jquery-1.11.1.js"></script>'
    output+='<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>'
    output+='<script>question_obj='+JSON.stringify(question_obj)+'</script>'
    output+='<script>'+slide_script+'</script>'
    ddb.style.display = "block"
    HandleDownload(output)
  });
}
*/


function Export() { //room idは重複しない前提でローカルで適当に作る(room_idの作成はslide_script.jsに移行)
  Selecting(null)

  slides = document.querySelectorAll('.clone-div > section')

  slide_style = "html,body{overflow:hidden;margin:0;padding:0;}"
  slide_style += "section{position:absolute;width:100vw;height:100vh;padding:3vmax;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;background-color:#fff;overflow:hidden}section h1{font-size:150px}section h2{font-size:0}section h3{font-size:50px}section p{font-size:30px}.comment{position:absolute;left:100%;width:100%;overflow:hidden;animation-duration:6s;animation-timing-function:linear;font-size:6vw;color:#888;z-index:160}@keyframes shed{to{transform:translateX(-200vw)}}"

  output = ""
  output = '<!DOCTYPE html><html lang="ja"><head><title>仮のタイトル</title><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><style>' + slide_style + theme_style.innerHTML + '</style></head><body>'
  output += '<section id="top_slide"><img src="https://chart.apis.google.com/chart?chs=400x400&cht=qr&chl=' + req_origin +'/client?r=' + room_id + '"></img><p>click to start</p></section>'

  for (let i = 0; i <= slides.length; i++) {
    if (!slides[i]) {
      break
    }
    if (current_slide_id == "slide" + (i + 1)) {
      let slide=document.getElementById(current_slide_id).cloneNode(true)
      output+=GetFormatedHTMLString(slide)
    } else {
      let slide=slides[i].cloneNode(true)
      output+=GetFormatedHTMLString(slide)
    }
  }
  output += '<section id="end"><p>that\'s all</p></section>'
  output+=' <script src="https://cdn.socket.io/3.1.3/socket.io.min.js" integrity="sha384-cPwlPLvBTa3sKAgddT6krw0cJat7egBga3DJepJyrLl4Q9/5WLra3rrnMcyTyOnh" crossorigin="anonymous"></script>'
  //output+='<script src="https://code.jquery.com/jquery-1.11.1.js"></script>'
  output+='<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>'
  output+='<script>question_obj='+JSON.stringify(question_obj)+'</script>'
  output+='<script>'+slide_script+'</script>'
  ddb.style.display = "block"
  HandleDownload(output)
}

function HandleDownload(content) {
  var blob = new Blob([content], {
    "type": "text/html"
  });
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blob, "slide.html");
    window.navigator.msSaveOrOpenBlob(blob, "slide.html");
  } else {
    document.getElementById("download").href = window.URL.createObjectURL(blob);
  }
}

function GetFormatedHTMLString(slide){
  slide.id=slide.id.split('-')[0]
  slide.classList.remove('card-panel')
  children=slide.children
  for (i=0;i<children.length;i++){
   children[i].classList.remove(['draggable','theme-elm'])
  }
  return slide.outerHTML
}

ddb.addEventListener('click', () => {
  ddb.style.display = "none"
})
