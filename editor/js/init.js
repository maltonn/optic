current_slide_id='slide1'
window.onload=()=>{
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
}

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.tooltipped');
  var instances = M.Tooltip.init(elems);

  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);

  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems);
});
