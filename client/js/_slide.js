//これ使わないのでは？
var socket = io('/d');
var current_slide = top_slide
top_slide.style.display = "flex";

(start = () => {
  actions_lists = document.getElementsByClassName('actions-list')
  for (i = 0; i < actions_lists.length; i++) {
    for (j = 0; j < actions_lists[i].children.length; j++) {
      actions_lists[i].children[j].classList.add('action')
    }
  }
  setTimeout(() => {
    top_slide.style.zIndex = "150"
  })
  
})();

slides_list = document.getElementsByTagName('section')
for (i = 0; i < slides_list.length; i++) {
  slides_list[i].style.zIndex = 100 - i
}

chart_count=0
main_func = () => {
  action = document.querySelector("#" + current_slide.id + ' .action')
  if (action) {
    action.classList.remove('action')
    return;
  }
  rdiv=current_slide.getElementsByClassName('rdiv')[0]
  if (rdiv && rdiv.style.display!="none"){
    rdiv.style.display="none"
    chart=document.getElementById("chart" + chart_count)
    socket.emit('end_voting')
    if (chart) {//投票終了・円グラフ描画
      chart.style.display="block"
      Drow(chart.getContext('2d'), 'sample', chc_list, ans_list, 'pie')
      return;
    }
  }

  if (current_slide.nextElementSibling.classList.contains('vote')) {
    chart_count += 1
    q=question_obj[current_slide.nextElementSibling.id]
    socket.emit('question', q)
    chc_list = []
    ans_list = []
    resulting_div=document.createElement('div')
    resulting_div.classList.add('rdiv')//rdiv:resulting_divs
    for(i=1;i<q.length;i++){
      elm=document.createElement('div')
      elm.innerText=q[i]+" : 0"
      while(q[i].includes(' ')){q[i]=q[i].replace(' ','_')}
      elm.classList.add('chc_'+q[i])
      resulting_div.appendChild(elm)
    }
    resulting_div.style.fontSize=Math.min(8,45/(q.length-1))+"vh"
    current_slide.nextElementSibling.appendChild(resulting_div)
  }
  if (current_slide.nextElementSibling.classList.contains('simple')) {//なんかバグがあるのでスキップ
    //simple_switch_slide()
    //return;
  }
  switch_slide()
  TimerStart()
}


switch_slides = document.querySelectorAll('#switch_slides_div > div')
switch_slide = () => {
  current_slide.style.zIndex = "150"
  current_slide.style.transform = "rotate(-120deg)"
  for (i = 0; i < switch_slides.length; i++) {
    switch_slides[i].classList.add('active')
  }
  current_slide = current_slide.nextElementSibling
  current_slide.style.zIndex = "110"
  setTimeout(() => {
    for (i = 0; i < switch_slides.length; i++) {
      switch_slides[i].classList.remove('active')
    }
    current_slide.style.zIndex = "150"
  }, 500)
}
back_slide=()=>{
  current_slide.style.zIndex="110"
  current_slide=current_slide.previousElementSibling
  current_slide.style.transform="rotate(0)"
}

simple_switch_slide = () => {
  current_slide = current_slide.nextElementSibling
  current_slide.style.zIndex = "150"
  setTimeout(()=>{
    current_slide.previousElementSibling.style.transform="rotate(-120deg)"
  },500)
}



socket.on('answer', function (ans) {
  index = chc_list.indexOf(ans)
  if (index < 0) {
    chc_list.push(ans)
    ans_list.push(1)
  } else {
    ans_list[index] += 1
  }
  while(ans.includes(' ')){ans=ans.replace(' ','_')}//クラス名に合わせる
  rdiv_chc=current_slide.getElementsByClassName('chc_'+ans)[0]
  if (!rdiv_chc){
    return;
  }
  now_voting_num=Number(rdiv_chc.innerText.slice(rdiv_chc.innerText.indexOf(':')+1))
  rdiv_chc.innerText=ans+" : "+(now_voting_num+1)
});


socket.on('redo', function (ans) {
  index = chc_list.indexOf(ans)
  ans_list[index] -= 1
  while(ans.includes(' ')){ans=ans.replace(' ','_')}//クラス名に合わせる
  rdiv_chc=current_slide.getElementsByClassName('chc_'+ans)[0]
  if (!rdiv_chc){
    return;
  }
  now_voting_num=Number(rdiv_chc.innerText.slice(rdiv_chc.innerText.indexOf(':')+1))
  rdiv_chc.innerText=ans+" : "+(now_voting_num-1)
});


function Drow(ctx, title, labels, data, type) {
  ctx.canvas.width = 500;
  ctx.canvas.height = 500;
  new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: title,
        data: data,
        backgroundColor: [
          'rgba(244, 67, 54,.5)',
          'rgba(139, 195, 74,.5)',
          'rgba(103, 58, 183,.5)',
          'rgba(33, 150, 243,.5)',
          'rgba(255, 193, 7,1.5)',
          'rgba(121, 85, 72,.5)',
          'rgba(233, 30, 99,.5)',
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  })
}

socket.on('comment', function (comment) {
  if(comment.length>32){
    comment=comment.slice(0,33)
  }
  elm = document.createElement('p')
  elm.innerHTML = comment
  elm.classList.add('comment')
  elm.style.top=Math.random()*90+"%"
  elm.style.animationName="shed"
  document.body.appendChild(elm)
});



document.addEventListener('click', function () {
  main_func()
})

isAbove=false
isAbove2=false
isAbove3=false
isTimer=false
document.addEventListener('keydown', function (e) {
  if (e.key == "Enter") {
    main_func()
  } else if (e.key == "n") {//actionとかを飛ばして強制スライド遷移
    switch_slide()
  }else if(e.key=="b"){
    back_slide()
  }else if (e.key=="a"){
    above1.style.transform=isAbove?"translateY(-110%)":"translateY(0)"
    isAbove=isAbove?false:true
  }else if (e.key=="s"){
    above2.style.transform=isAbove2?"translateY(-110%)":"translateY(0)"
    isAbove2=isAbove2?false:true
  }else if (e.key=="d"){
    above3.style.transform=isAbove3?"translateY(-110%)":"translateY(0)"
    isAbove3=isAbove3?false:true
  }
  

})
now=0
TimerStart=()=>{
  if(now==0){
    setInterval(()=>{
      now+=1
      timer.innerText=Math.floor(now/60)+":"+("0"+now%60).slice(-2)
    },1000)
  }
}
