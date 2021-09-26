params={}
try{

    location.href.split('?')[1].split('&').forEach((e)=>{params[e.split('=')[0]]=e.split('=')[1]})
}catch{
    params['r']=window.prompt('コードを入力')
}
req_origin='https://optic-malton.herokuapp.com'
socket = io(`${req_origin}/c?r='${params['r']}'`);
if (params['r']){
    socket.emit('room',params['r'])
}else{
    alert('アクセスできません。')
}


var myChart;
col_lst=["f0a108", "4c9520", "3b90d3", "f59275","A90813","EEA6A2"]
col_num=0
answer=""
choices_for_redo=null
socket.on('question', function (choices) {
    if (!choices){
        ShowWaiting("ここに選択肢が表示されます。")
        redo.style.display="none"
        return;
    }
    choices_for_redo=choices
    ShowChoice(choices)
    if(col_lst.length>=col_num){
        col_num=0
    }
    document.body.style.backgroundColor="#"+col_lst[0]
    col_num++
});
function ShowChoice(choices){
    vote.classList.add('active')
    chc.innerHTML=""
    title.innerText = choices[0]
    for (i = 1; i < choices.length; i++) {
        elm = document.createElement('a')
        elm.innerText = choices[i]
        elm.id=choices[i]
        elm.classList.add('uk-button','uk-button-default','uk-button-large')
        elm.addEventListener('click', (e) => {
            answer=e.target.id
            socket.emit('answer', answer)
            if (window.innerWidth>750){
                ShowWaiting("解答は送信されました。<br><a id='redo-pc'>選択をやり直す")
                document.getElementById('redo-pc').addEventListener('click',()=>{
                    socket.emit('redo',answer)
                    ShowChoice(choices)
                })
            }else{
                redo.style.display="block"
                vote.classList.remove('active')
                ShowWaiting("解答は送信されました。")
            }

        })
        chc.appendChild(elm)
    }
}

send.addEventListener('click', function () {
    if(comment.value!=""){
        socket.emit('comment', {'comment':comment.value,'username':'anonymous'/*username.value*/})
    }
    comment.value = ""
});
document.addEventListener('keydown',(e)=>{
    if(comment.value=="" || e.key!="Enter"){
        return;
    }
    socket.emit('comment', {'comment':comment.value,'username':username.value})
    comment.value = ""
})

function ShowWaiting(msg_html){
    title.innerText="待機中"
    chc.innerHTML="<p class='center'>"+msg_html+"</a></p>"
}

document.getElementById('redo').addEventListener('click',()=>{
    socket.emit('redo',answer)
    ShowChoice(choices_for_redo)
})

/*
document.addEventListener('click',()=>{
    document.body.style.backgroundColor="#"+col_lst[col_num]
    col_num++
})
*/