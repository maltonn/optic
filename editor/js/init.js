current_slide_id='slide1'

document.addEventListener('DOMContentLoaded', function() {
  let new_slide = document.createElement('section')
  new_slide.id = "slide" + slide_count
  new_slide.classList.add('card-panel')
  editor.appendChild(new_slide)
  current_slide_id = "slide" + slide_count
  let new_preview_div = document.createElement('div')
  new_preview_div.id = current_slide_id + "-clone-div"
  new_preview_div.classList.add('clone-div')
  summary.appendChild(new_preview_div)
  AddMask(new_preview_div, current_slide_id)
  let new_mask=document.getElementById("slide1-clone-mask")
  new_mask.innerHTML="<p>Now Editing..</p>"
  new_mask.style.backgroundColor="rgba(191, 54, 12,.8)"

  
  font_dic={
    'Kaisei - 春の海':'Kaisei HarunoUmi',
    'さわらび明朝':'Sawarabi Mincho',
    'train one':'Train One',
    'ハチ 丸pop':'Hachi Maru Pop',
    'New テゴミン':'New Tegomin',
  }
  font_select=document.getElementById('font-select')
  Object.keys(font_dic).forEach(function (key) {
    option=document.createElement('option')
    option.value=font_dic[key]
    option.innerText=key
    font_select.appendChild(option)
  });
  
  var elems = document.querySelectorAll('.tooltipped');
  var instances = M.Tooltip.init(elems);

  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);

  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems);


  spans=document.querySelectorAll('#font-select-div span')
  for(span of spans){
    font_jp=span.innerText
    span.style.fontFamily=`'${font_dic[font_jp]}', sans-serif`
  }
  
});
