var theme_elms=[];
theme_obj={
  'default-theme':{
    'html':'',
    'css':'section.card-panel{background-color:white;}',//editorとsummary 用
  },
  'theme1':{
    'html':'<div class="line1"></div><div class="line2"></div><h1 class="title">Title</h1><p>insert some sentences to express your opinion</p>',
    'css':'section.card-panel {background-color:#4C4C4C;color:#80B3E6;} section .line1{position:absolute;left:0;top:90%;width:100%;height:10px;background-color:#80B3E6;} section .line2{position:absolute;left:10%;top:0;width:10px;height:100%;background-color:#80B3E6;}.title{position:absolute;top:0;left:10%;margin:8px;}',
  },
  'theme2':{
    'html':'<h1>Genius</h1><p>is 1 percent inspiration,</p><p>99 percent perspiration.</p><div class="outer_point" id="p1"> <div class="point"> <div class="inner_point"> </div></div></div><div class="outer_point" id="p2"> <div class="point"> <div class="inner_point"> </div></div></div>',
    'css':'section.card-panel{background-color:#f2cf01;color:#6d1782;--rd:10vh}section h1{margin:0}section p{margin:0}section div{position:absolute}section .outer_point{position:absolute;width:calc(var(--rd) * 1.2);height:calc(var(--rd) * 1.2);border-radius:50%;border:5px solid #6d1782}section #p1{top:calc(50% - var(--rd)/ 2);left:5%}section #p2{top:calc(50% - var(--rd)/ 2);right:5%}section .outer_point::before{content:"";position:absolute;top:25%;left:-10%;width:120%;height:50%;background-color:#f2cf01;transform:rotate(40deg);animation:rotate 2s ease-in-out 0s infinite}@keyframes rotate{to{transform:rotate(400deg)}}section .point{top:0;bottom:0;left:0;right:0;margin:auto;width:var(--rd);height:var(--rd);border-radius:50%;background-color:#6d1782;cursor:pointer;z-index:10}section .point::after{--border:3px;content:"";position:absolute;top:calc(var(--border)/ -2);left:calc(var(--border)/ -2);width:calc(100% - var(--border));height:calc(100% - var(--border));border-radius:50%;border:var(--border) solid #6d1782;animation:scale 2s ease 0s infinite;transition-duration:.3s;z-index:9}@keyframes scale{to{transform:scale(2);opacity:0}}section .inner_point{top:0;bottom:0;left:0;right:0;margin:auto;width:calc(var(--rd) * .6);height:calc(var(--rd) * .6);border-radius:50%;border:3px solid #f2cf01}c section .inner_point::before{content:"";position:absolute;top:35%;left:-20%;width:140%;height:30%;transform-origin:center center;background-color:#6d1782;animation:rotate2 5s steps(7) 0s infinite;transition-duration:.3s}@keyframes rotate2{to{transform:rotate(-240deg)}}'
  }
}
theme_sel_lists=document.querySelectorAll('#theme-selection>div')
for(i=0;i<theme_sel_lists.length;i++){
  let target=theme_sel_lists[i]
  target.addEventListener('click',function(){
    document.getElementById('theme-selection').style.transform="translateX(100%)"//とりあえず引っ込める

    //今まで起用されていたテーマのDOMを削除
    theme_elms=[]
    current_themes=document.getElementsByClassName('theme-elm')
    let len=Number(""+current_themes.length)
    for(j=0;j<len;j++){
      DeleteThis(current_themes[0])//１個ずつ消えてくれる
    }

    theme_style.innerText=theme_obj[this.id]['css']
    let slides=document.getElementsByTagName('section')
    let tmp=document.createElement('div')
    tmp.innerHTML=theme_obj[this.id]['html']
    theme_elms=tmp.childNodes
    for(j=0;j<slides.length;j++){
      for(k=theme_elms.length-1;k+1;k--){
        let elm=theme_elms[k].cloneNode(true)
        AddClickEvent(elm)
        elm.classList.add('draggable','theme-elm')
        slides[j].insertBefore(elm,slides[j].firstChild)
      }
    }
  })
}
