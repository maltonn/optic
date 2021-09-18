///var next_slide_id = null
var nowPointing = null


document.getElementById('editor').addEventListener('click', (e) => {
  if (e.target.tagName == "SECTION") {
    Selecting(null)
  }
})


var isWaitingDouble = false

function Selecting(target) {
  if (nowPointing) {
    nowPointing.style.outline = ""
  }
  if(!target){
    nowPointing = null
    document.getElementById('change-background-color').previousElementSibling.style.color=document.getElementById(current_slide_id).style.backgroundColor||'black'
    document.getElementById('change-font-color').previousElementSibling.style.color=document.getElementById(current_slide_id).style.color||'black'
    document.getElementById('vote-edit').style.transform='translateX(100%)'
    document.getElementById('font-size-div').style.display='none'
    return
  }
  nowPointing = target
  nowPointing.style.outline = "2px dotted black"

  document.getElementById('change-background-color').previousElementSibling.style.color=target.style.backgroundColor||'black'

  document.getElementById('change-font-color').previousElementSibling.style.color=target.style.color||'black'

  if(target.tagName=='P'){
    document.getElementById('font-size-div').style.display='block'
    fs_input=document.getElementById('font-size')
    fsize=target.style.fontSize?target.style.fontSize.slice(0,target.style.fontSize.length-2):'40'
    fs_input.value=fsize
    fs_input.nextElementSibling.nextElementSibling.innerText=fsize+'px'
  }else{
    document.getElementById('font-size-div').style.display='none'
  }

}



var slide_count = 1
document.getElementById('new-slide-btn').addEventListener('click', () => {
  SwitchSlide(null)
})

function SwitchSlide(slide_id) {
  Selecting(null)
  let preview = document.getElementById(current_slide_id).cloneNode(true)
  preview.id = current_slide_id + "-clone"
  let preview_div = document.getElementById(current_slide_id + "-clone-div")
  DeleteAllChild(preview_div)
  preview_div.appendChild(preview)
  DeleteAllChild(editor)
  mask = AddMask(preview_div, current_slide_id)
  mask.innerHTML = ""
  //mask.style.backgroundColor = "rgba(25,25,25,0.3)"

  if (slide_id) {
    let new_slide = document.getElementById(slide_id).cloneNode(true)
    new_slide.id = slide_id.split('-')[0]
    editor.appendChild(new_slide)
    current_slide_id = new_slide.id
    let children = new_slide.children
    for (let i = 0; i < children.length; i++) {
      AddClickEvent(children[i])
    }
  } else {
    slide_count++
    let new_slide = document.createElement('section')
    new_slide.id = "slide" + slide_count
    new_slide.classList.add('card-panel')
    for (i = 0; i < theme_elms.length; i++) {
      let elm = theme_elms[i].cloneNode(true)
      elm.classList.add('draggable', 'theme-elm')
      AddClickEvent(elm)
      new_slide.appendChild(elm)
    }
    editor.appendChild(new_slide)
    current_slide_id = "slide" + slide_count
    let new_preview_div = document.createElement('div')
    new_preview_div.id = current_slide_id + "-clone-div"
    new_preview_div.classList.add('clone-div')
    summary.appendChild(new_preview_div)
    AddMask(new_preview_div, current_slide_id)
  }
  let new_mask = document.getElementById(current_slide_id + "-clone-mask")
  new_mask.innerHTML = "<p>Now Editing..</p>"
  new_mask.style.backgroundColor = "rgba(191, 54, 12,.8)"
  InitEditVote()
}



function DeleteAllChild(element) { //別にわざわざ関数にしなくてもいいけど、わかりやすいから
  element.innerHTML = ""
}
function DeleteThis(element) {
  element.parentNode.removeChild(element);
}


function AddMask(parent, current_slide_id) {
  let mask = document.createElement('div')
  mask.classList.add('mask')
  mask.id = current_slide_id + "-clone-mask"
  mask.addEventListener('click', function () {
    SwitchSlide(this.id.split('-')[0] + "-clone")
  })
  parent.appendChild(mask)
  return mask
}


function AddClickEvent(elm) {
  if (elm.tagName == "CANVAS") {
    elm.addEventListener('click', function () {
      Selecting(elm)
      document.getElementById('vote-edit').style.transform = "translateX(0)"
    })
  }
  else {
    elm.addEventListener('click', function () {

      if (isWaitingDouble) {
        //ここにダブルクリック処理

        isWaitingDouble = false
      } else {
        isWaitingDouble = true
        setTimeout(() => {
          isWaitingDouble = false
        }, 300) //ダブルクリックまでの待ち時間


        Selecting(this)


      }
    })
  }
}


document.getElementById('export').addEventListener('click', () => {
  Export()
})
