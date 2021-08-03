ddb = document.getElementById('download-div-black')
req_origin = 'https://vote-slide.herokuapp.com'
function Export() {
  Selecting(null)
  $.getJSON(req_origin+'/get-room-id?n=4', function (data) {
    console.log(data)
    room_id = data['id']

    slides = document.querySelectorAll('.clone-div > section')

    slide_style = "html,body{overflow:hidden;margin:0;padding:0;}"
    slide_style += "section{position:absolute;width:100vw;height:100vh;padding:3vmax;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;background-color:#fff;overflow:hidden}section h1{font-size:150px}section h2{font-size:0}section h3{font-size:50px}section p{font-size:30px}.comment{position:absolute;left:100%;width:100%;overflow:hidden;animation-duration:6s;animation-timing-function:linear;font-size:6vw;color:#888;z-index:160}@keyframes shed{to{transform:translateX(-200vw)}}"
    slide_script= 'socket=io("'+req_origin+'/d?r='+room_id+'");socket.emit("room","'+room_id+'");var current_slide=top_slide;for(top_slide.style.display="flex",(start=(()=>{for(actions_lists=document.getElementsByClassName("actions-list"),i=0;i<actions_lists.length;i++)for(j=0;j<actions_lists[i].children.length;j++)actions_lists[i].children[j].classList.add("action");setTimeout(()=>{top_slide.style.zIndex="150"})}))(),slides_list=document.getElementsByTagName("section"),i=0;i<slides_list.length;i++)slides_list[i].style.zIndex=100-i;function Drow(e,t,n,s,c){return chart_class=new Chart(e,{type:c,data:{labels:n,datasets:[{label:t,data:s,backgroundColor:["rgba(244, 67, 54,.5)","rgba(139, 195, 74,.5)","rgba(103, 58, 183,.5)","rgba(33, 150, 243,.5)","rgba(255, 193, 7,1.5)","rgba(121, 85, 72,.5)","rgba(233, 30, 99,.5)"]}]},options:{responsive:!0,maintainAspectRatio:!1}}),chart_class}charts=document.getElementsByClassName("chart"),chart_count=0,chart=null,main_func=(()=>{action=document.querySelector("#"+current_slide.id+" .action"),action?action.classList.remove("action"):(current_slide.nextElementSibling.classList.contains("vote")?(chart=charts[chart_count],chart_count+=1,q=question_obj[current_slide.nextElementSibling.id],socket.emit("question",q),chc_list=[],ans_list=[],resulting_div=document.createElement("div")):socket.emit("end_voting"),switch_slide())}),switch_slides=document.querySelectorAll("#switch_slides_div > div"),back_slide=(()=>{current_slide.style.zIndex="110",(current_slide=current_slide.previousElementSibling).style.transform="rotate(0)"}),switch_slide=(()=>{current_slide.style.display="none",current_slide=current_slide.nextElementSibling}),flag=!0,chart_class=null,socket.on("answer",function(e){index=chc_list.indexOf(e),index<0?(chc_list.push(e),ans_list.push(1)):ans_list[index]+=1,flag?chart_class=Drow(chart.getContext("2d"),"sample",chc_list,ans_list,"pie"):chart_class.update(),flag=!1}),socket.on("redo",function(e){index=chc_list.indexOf(e),ans_list[index]-=1,chart_class.update()}),socket.on("comment",function(e){console.log(e),e.length>32&&(e=e.slice(0,33)),elm=document.createElement("p"),elm.innerHTML=e,elm.classList.add("comment"),elm.style.top=90*Math.random()+"%",elm.style.animationName="shed",document.body.appendChild(elm)}),document.addEventListener("click",function(){main_func()});'

    output = ""
    output = '<!DOCTYPE html><html lang="ja"><head><title>仮のタイトル</title><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><style>' + slide_style + theme_style.innerHTML + '</style></head><body>'
    output += '<section id="top_slide"><img src="https://chart.apis.google.com/chart?chs=400x400&cht=qr&chl=' + req_origin +'/client?r=' + room_id + '"></img><p>click to start</p></section>'

    for (let i = 0; i <= slides.length; i++) {
      if (!slides[i]) {
        break
      }
      if (current_slide_id == "slide" + (i + 1)) {
        let slide=document.getElementById(current_slide_id).cloneNode(true)
        output+=GetFormatedHTMLString(slide)
      } else {
        let slide=slides[i].cloneNode(true)
        output+=GetFormatedHTMLString(slide)
      }
    }
    output += '<section id="end"><p>that\'s all</p></section>'
    output+='  <script src="https://cdn.socket.io/socket.io-1.2.0.js"></script><script src="https://code.jquery.com/jquery-1.11.1.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>'
    output+='<script>question_obj='+JSON.stringify(question_obj)+'</script>'
    output+='<script>'+slide_script+'</script>'
    ddb.style.display = "block"
    HandleDownload(output)
  });
}

function HandleDownload(content) {
  var blob = new Blob([content], {
    "type": "text/html"
  });
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blob, "slide.html");
    window.navigator.msSaveOrOpenBlob(blob, "slide.html");
  } else {
    document.getElementById("download").href = window.URL.createObjectURL(blob);
  }
}

function GetFormatedHTMLString(slide){
  slide.id=slide.id.split('-')[0]
  slide.classList.remove('card-panel')
  children=slide.children
  for (i=0;i<children.length;i++){
   children[i].classList.remove(['draggable','theme-elm'])
  }
  return slide.outerHTML
}

ddb.addEventListener('click', () => {
  ddb.style.display = "none"
})
