///var next_slide_id = null
var nowPointing = null


document.getElementById('add-p').addEventListener('click', () => {
  let elm = document.createElement('p')
  ///
  /*
  isNowTyping=true
  let text = window.prompt('テキストの追加')
  isNowTyping=false
  if (!text) {
    return;
  }
  */

  elm.innerText = 'new text'
  elm.classList.add('draggable')
  elm.setAttribute('contenteditable', 'true')
  AddClickEvent(elm)
  document.getElementById(current_slide_id).appendChild(elm)
  Selecting(elm)
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
    document.getElementById('image-edit').style.transform = "translateX(0)"
  }
  // ファイル読み込みを実行
  reader.readAsDataURL(fileData);
})



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
  nowPointing = target
  if (!target) {
    document.getElementById('color-selection').style.transform = "translateX(100%)"
    document.getElementById('background-color-selection').style.transform = "translateX(100%)"
    document.getElementById('vote-edit').style.transform = "translateX(100%)"
    document.getElementById('image-edit').style.transform = "translateX(100%)"
    return;
  }
  nowPointing.style.outline = "2px dotted black"
  InitSidebar(target)
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
  } else if (elm.tagName == "IMG") {
    elm.addEventListener('click', function () {
      Selecting(elm)
      document.getElementById('image-edit').style.transform = "translateX(0)"
      image_size_range=document.getElementById('change-image-size')
      image_size_range.value=this.style.height
      image_size_range.nextSibling.nextSibling.innerText=this.style.height+'px'
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
