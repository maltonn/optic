
document.getElementById('add-p').addEventListener('click', () => {
    let p = document.createElement('p')
    p.innerText = 'new text'
    p.classList.add('draggable')
    p.setAttribute('contenteditable', 'true')
    AddClickEvent(p)
    document.getElementById(current_slide_id).appendChild(p)
    Selecting(p)
  })
  
  document.getElementById('add-vote').addEventListener('click', () => {
    if (question_obj[current_slide_id]) {
      alert('投票は一つのページにつき1つです。')
      return;
    }
    question_obj[current_slide_id] = ['', '選択肢1', '選択肢2']
    let current_slide = document.getElementById(current_slide_id)
    current_slide.classList.add('vote')
    let elm = document.createElement('canvas')
    elm.width = "400"
    elm.height = "400"
    elm.classList.add('chart', 'draggable','resizable')
    current_slide.appendChild(elm)
    AddClickEvent(elm)
    Selecting(elm)
    document.getElementById('vote-edit').style.transform = "translateX(0)"
  })
  
  document.getElementById('add-image').addEventListener('change', (e) => {
    var fileData = e.target.files[0];
  
    var reader = new FileReader();
    reader.onload = function () {
      var img = document.createElement('img');
      img.src = reader.result;
      img.classList.add('draggable','resizable')
      document.getElementById(current_slide_id).appendChild(img)
      AddClickEvent(img)
    }
    // ファイル読み込みを実行
    reader.readAsDataURL(fileData);
  })

  document.getElementById('add-iframe').addEventListener('click',()=>{
    document.getElementById('add-iframe-setting').style.transform='translateX(0)'
    document.getElementById('iframe-width').value=window.innerWidth
    document.getElementById('iframe-height').value=window.innerHeight
  })

  document.getElementById('cretate-iframe').addEventListener('click',()=>{
    iframe=document.createElement('iframe')
    url=document.getElementById('iframe-url').value
    if(!url){
      return
    }
    iframe.src=url
    iframe.width=document.getElementById('iframe-width').value
    iframe.height=document.getElementById('iframe-height').value

    document.getElementById(current_slide_id).appendChild(iframe)
    Selecting(iframe)

    document.getElementById('add-iframe-setting').style.transform='translateX(100%)'
  })

  document.getElementById('add-html').addEventListener('click',()=>{
    document.getElementById('add-html-setting').style.transform='translateX(0)'
  })

  document.getElementById('create-html').addEventListener('click',()=>{
    let div=document.createElement('div')
    div.classList.add('custom-tag','draggable')
    input_str=document.getElementById('html_textarea').value
    if(!input_str){
      return
    }
    div.innerHTML=input_str
    document.getElementById(current_slide_id).appendChild(div.childNodes)
    Selecting(div.childNodes[0])
    document.getElementById('add-html-setting').style.transform='translateX(100%)'
  })