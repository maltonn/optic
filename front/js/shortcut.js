document.addEventListener('keydown', (e) => {
  if (e.ctrlKey) {
    if(e.key=="Enter"){
        SwitchSlide(null)
    }
  }else {
    if (e.key == "Backspace") {
      if (nowPointing && ['P','H1','H2'].includes(nowPointing.tagName)) {
        return;
      }
      if (nowPointing) {
        DeleteThis(nowPointing)
      } else {
        if(!window.confirm('今のスライドを削除しますか')){
          return;
        }
        let cscd = document.getElementById(current_slide_id + "-clone-div")
        let ncscd = (cscd.nextElementSibling || cscd.previousElementSibling)
        log(ncscd)
        if (!ncscd) {
          return;
        }
        SwitchSlide(ncscd.id.split('-')[0]+"-clone")//slide1-clone-div →　slide1-clone
        DeleteThis(cscd) //SwitchSlideで document.getElementById(current_slide_id+"-clone") の値が変わる
      }
    }
  }
})
