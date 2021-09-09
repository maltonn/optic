
document.getElementById('add-p').addEventListener('click', () => {
    let elm = document.createElement('p')
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
    }
    // ファイル読み込みを実行
    reader.readAsDataURL(fileData);
  })