fs_btn=document.getElementById('font-size')
fs_btn.addEventListener('change',()=>{
  (nowPointing||document.getElementById(current_slide_id)).style.fontSize=fs_btn.value
})

//cc : color-change
cc_sel_div=document.getElementById('color-selection')
cc_sel_ipts=document.querySelectorAll('#color-selection input')
document.getElementById('change-chara-color-btn').addEventListener('click',()=>{
  cc_sel_div.style.transform="translateX(0)"
})
cc_sel_div.addEventListener('change',()=>{
  for(i=0;i<cc_sel_ipts.length;i++){
    if(cc_sel_ipts[i].checked){
      if(nowPointing){
        nowPointing.style.color=cc_sel_ipts[i].value
      }else{
        document.getElementById(current_slide_id).style.color=cc_sel_ipts[i].value
      }
      break
    }
  }
})

cbc_sel_div=document.getElementById('background-color-selection')
cbc_sel_ipts=document.querySelectorAll('#background-color-selection input')
document.getElementById('change-background-color-btn').addEventListener('click',()=>{
  isChangingBackground=true
  cbc_sel_div.style.transform="translateX(0)"
})
cbc_sel_div.addEventListener('change',()=>{
  for(i=0;i<cbc_sel_ipts.length;i++){
    if(cbc_sel_ipts[i].checked){
      if(nowPointing){
        nowPointing.style.backgroundColor=cbc_sel_ipts[i].value
      }else{
        document.getElementById(current_slide_id).style.backgroundColor=cbc_sel_ipts[i].value
      }
      break
    }
  }
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
    document.getElementById('change-chart-size').value=document.getElementById(current_slide_id).getElementsByTagName('canvas')[0].width
  }else{
    document.getElementById('vote-choices').innerHTML='<div class="input-field"> <input id="title" type="text" class="validate"> <label for="title">タイトル</label> </div><div class="input-field-div"> <div class="input-field"> <input id="choice1" type="text" class="validate" value="選択肢1"> <label for="choice1"></label> </div><i class="material-icons" onclick="DeleteThis(this.parentNode)">close</i> </div><div class="input-field-div"> <div class="input-field"> <input id="choice2" type="text" class="validate" value="選択肢2"> <label for="choice2"></label> </div><i class="material-icons" onclick="DeleteThis(this.parentNode)">close</i> </div><i id="add-vote-choice" class="material-icons tooltipped" data-position="right" data-tooltip="選択肢を追加">add</i> '
    document.getElementById('change-chart-size').value="400"
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
document.getElementById('change-chart-size').addEventListener('change',function(){
  let size=this.value
  let chart=document.getElementById(current_slide_id).getElementsByTagName('canvas')[0]
  chart.width=size
  chart.height=size
})

close_btns=document.getElementsByClassName('close')
for(i=0;i<close_btns.length;i++){
  close_btns[i].addEventListener('click',function(){
    this.parentNode.style.transform="translate(100%)"
  })
}

function InitSidebar(target){
  for(i=0;i<cc_sel_ipts.length;i++){//#chara-color-selection の input でチェックされているものをはずす
    let col=cc_sel_ipts[i]
    let nowcol=nowPointing.style.color
    col.checked=false
    if(col.value==nowcol){
      col.checked=true
    }
  }
  for(i=0;i<cbc_sel_ipts.length;i++){
    let col=cbc_sel_ipts[i]
    let nowcol=nowPointing.style.backgroundColor
    col.checked=false
    if(col.value==nowcol){
      col.checked=true
    }
  }
}
