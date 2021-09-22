fs_input=document.getElementById('font-size')
fs_input.addEventListener('input',()=>{
  (nowPointing||document.getElementById(current_slide_id)).style.fontSize=fs_input.value+'px'
  fs_input.nextElementSibling.nextElementSibling.innerText=fs_input.value+'px'
})


document.getElementById('change-theme-btn').addEventListener('click',()=>{
  theme_sel_div=document.getElementById('theme-selection')
  theme_sel_div.style.transform="translateX(0)"
})


question_obj={}
choice_num=2
function InitEditVote(){
  let ques=question_obj[current_slide_id]
  if(ques){
    let s='<div class="input-field"><input id="title" type="text" class="validate" value="'+ques[0]+'"><label for="title"></label></div>'
    for(i=1;i<ques.length;i++){
      s+='<div class="input-field-div"><div class="input-field"><input id="choice1" type="text" class="validate" value="'+ques[i]+'"><label for="choice1"></label></div><i class="material-icons" onclick="DeleteThis(this.parentNode)">close</i></div>'
    }
    s+='<i id="add-vote-choice" class="material-icons tooltipped" data-position="right" data-tooltip="選択肢を追加">add</i>'
    document.getElementById('vote-choices').innerHTML=s
  }else{
    document.getElementById('vote-choices').innerHTML='<div class="input-field"> <input id="title" type="text" class="validate"> <label for="title">タイトル</label> </div><div class="input-field-div"> <div class="input-field"> <input id="choice1" type="text" class="validate" value="選択肢1"> <label for="choice1"></label> </div><i class="material-icons" onclick="DeleteThis(this.parentNode)">close</i> </div><div class="input-field-div"> <div class="input-field"> <input id="choice2" type="text" class="validate" value="選択肢2"> <label for="choice2"></label> </div><i class="material-icons" onclick="DeleteThis(this.parentNode)">close</i> </div><i id="add-vote-choice" class="material-icons tooltipped" data-position="right" data-tooltip="選択肢を追加">add</i> '
  }
  document.getElementById('add-vote-choice').addEventListener('click',function(){
    choice_num++
    let elm=document.createElement('div')
    elm.classList.add('input-field-div')
    elm.innerHTML='<div class="input-field"><input id="choice'+choice_num+'" type="text" class="validate" value="選択肢'+choice_num+'"><label for="choice'+choice_num+'"></label></div><i class="material-icons" onclick="DeleteThis(this.parentNode)">close</i>'
    document.getElementById('vote-choices').insertBefore(elm,this)
  })
  document.getElementById('vote-title-and-choices').addEventListener('change',function(){
    choices=this.getElementsByTagName('input')
    let L=[]
    for(i=0;i<choices.length;i++){
      L.push(choices[i].value)
    }
    question_obj[current_slide_id]=L
  })
}

InitEditVote()


close_btns=document.getElementsByClassName('close')
for(i=0;i<close_btns.length;i++){
  close_btns[i].addEventListener('click',function(){
    this.parentNode.style.transform="translate(100%)"
  })
}


document.getElementById('change-background-color').addEventListener('input',function(){
  this.previousElementSibling.style.color=this.value;
  (nowPointing||document.getElementById(current_slide_id)).style.backgroundColor=this.value
})

document.getElementById('change-font-color').addEventListener('input',function(){
  this.previousElementSibling.style.color=this.value;
  (nowPointing||document.getElementById(current_slide_id)).style.color=this.value
})


document.getElementById('font-select').addEventListener('change',function(){
  (nowPointing||document.getElementById(current_slide_id)).style.fontFamily=this.value
})