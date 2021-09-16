ddb = document.getElementById('download-div-black')
req_origin = 'https://maltonn.github.io/optic'
socket_origin = 'https://websocket-maltonn8.an.r.appspot.com'
function Export() { //room idは重複しない前提でローカルで適当に作る(room_idの作成はslide_script.jsに移行)
    Selecting(null)
    //編集中のスライドをclone-divに落とす
    let preview = document.getElementById(current_slide_id).cloneNode(true)
    preview.id = current_slide_id + "-clone"
    let preview_div = document.getElementById(current_slide_id + "-clone-div")
    DeleteAllChild(preview_div)
    preview_div.appendChild(preview)
    mask = AddMask(preview_div, current_slide_id)
    mask.innerHTML = "<p>Now Editing..</p>"
    mask.style.backgroundColor = "rgba(191, 54, 12,.8)"

    //clone-divのスライドを取得
    slides = document.querySelectorAll('.clone-div > section')
    slide_str = ""
    for (let i = 0; i <= slides.length; i++) {
        if (!slides[i]) {
            break
        }
        let slide = slides[i].cloneNode(true)
        slide_str += GetFormatedHTMLString(slide)
    }

    //重複しない前提でランダム文字列を生成
    var N = 4
    var S = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    room_id = Array.from(Array(N)).map(() => S[Math.floor(Math.random() * S.length)]).join('')

    question_obj_str = JSON.stringify(question_obj)

    output_html =
        `
        <html lang="ja">

        <head>
            <title>OPTICスライド</title>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <style>
                html,
                body {
                    overflow: hidden;
                    margin: 0;
                    padding: 0;
                    height: 100%;
                }
        
                section {
                    position: absolute;
                    width: 100vw;
                    height: 100vh;
                    padding: 3vmax;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    box-sizing: border-box;
                    background-color: #fff;
                    overflow: hidden
                }
        
                section h1 {
                    font-size: 150px
                }
        
                section h2 {
                    font-size: 0
                }
        
                section h3 {
                    font-size: 50px
                }
        
                section p {
                    font-size: 30px
                }
        
                .comment {
                    position: absolute;
                    left: 100%;
                    width: 100%;
                    overflow: hidden;
                    animation-duration: 6s;
                    animation-timing-function: linear;
                    font-size: 6vw;
                    color: #888;
                    z-index: 160;
                }
        
                @keyframes shed {
                    to {
                        transform: translateX(-200vw)
                    }
                }
        
                /*以下設定部分のスタイル*/
                #settings_btn {
                    position: absolute;
                    top: 0;
                    right: -32px;
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background-color: red;
                    z-index: 200;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    color: white;
                    transition-duration: 300ms;
                }
        
                #settings_btn_input {
                    display: none;
                }
        
                #settings_btn_input:checked+#settings_btn {
                    transform: translateX(-320px) rotate(180deg);
                }
        
                #settings_btn_input:checked+#settings_btn+#settings {
                    transform: translateX(0);
                }
        
                #settings {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 288px;
                    height: 100%;
                    background-color: #f2e6b8;
                    z-index: 210;
                    transform: translateX(100%);
                    transition-duration: 300ms;
                    padding: 16px;
                }
        
                @keyframes radio-select {
                    0% {
                        transform: scale(0, 0);
                    }
        
                    65% {
                        transform: scale(1.1, 1.1);
                    }
        
                    100% {
                        transform: scale(1, 1);
                    }
                }
        
                .radio-form label {
                    margin: 2em;
                    display: block;
                    position: relative;
                    padding-left: 40px;
                    cursor: pointer;
                }
        
                .outside {
                    display: inline-block;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    margin-top: -15px;
                    width: 30px;
                    height: 30px;
                    border: 2px solid #CCCCCC;
                    border-radius: 50%;
                    box-sizing: border-box;
                    background: #F3F3F3;
                }
        
                .inside {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: inline-block;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    background: #444;
                    left: 3px;
                    top: 3px;
                    transform: scale(0, 0);
                }
        
                input[type='radio']:checked+.outside .inside {
                    -webkit-animation: radio-select 0.1s linear;
                    animation: radio-select 0.1s linear;
                    transform: scale(1, 1);
                }
        
                input[type='radio'] {
                    display: none;
                }
        
                #vtuber_like_comment_div {
                    position: absolute;
                    width: 300px;
                    height: 500px;
                    z-index: 200;
                    opacity: 0.5;
                    background-color: #DAD2D8;
                    padding: 16px;
                    box-sizing: border-box;
                    touch-action: none;
                    overflow-y: scroll;
                }
        
                #vtuber_like_comment_div::-webkit-scrollbar {
                    display: none;
                }
            </style>
        </head>
        
        <body>
            <input id="settings_btn_input" type="checkbox">
            <label id="settings_btn" for="settings_btn_input">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
                        fill="currentColor"></path>
                </svg>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
                        fill="currentColor"></path>
                </svg>
            </label>
            <div id="settings">
                <h2>コメント</h2>
                <form id="comment_setting_form" class="radio-form">
                    <label>
                        <input type="radio" name="radios1" value="1" checked="">
                        <span class="outside">
                            <span class="inside"></span>
                        </span>
                        ニコニコ風
                    </label>
                    <label>
                        <input type="radio" name="radios1" value="2">
                        <span class="outside">
                            <span class="inside"></span>
                        </span>
                        VTuber風
                    </label>
                </form>
            </div>
            <div id="vtuber_like_comment_div" class="draggable resizable" style="display: none;">
            </div>
        
            <section id="top_slide" style="z-index: 100;"><img
                    src="https://chart.apis.google.com/chart?chs=400x400&cht=qr&chl=${req_origin}/client?r=${room_id}">
                <p>[→] to start</p>
            </section>
            ${slide_str}
            <section id="end" style="z-index: 97;">
                <p>that's all</p>
            </section>
            <script src="https://cdn.socket.io/3.1.3/socket.io.min.js"
                integrity="sha384-cPwlPLvBTa3sKAgddT6krw0cJat7egBga3DJepJyrLl4Q9/5WLra3rrnMcyTyOnh"
                crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/interactjs@next/dist/interact.min.js"></script>
            <script>question_obj = ${ question_obj_str }</script>
            <script>
                socket = io("${socket_origin}/d?r=${room_id}");
                socket.emit("room", "${room_id}");
                var current_slide = top_slide;
        
                (start = () => {
                    top_slide.style.zIndex = "150"
                })();
        
                slides_list = document.getElementsByTagName('section')
        
                chc_data = [] //2d array
                ans_data = []
                chart_class_lst = []
                for (i = 0; i < slides_list.length; i++) {
                    slides_list[i].style.zIndex = 100 - i
        
                    chc_data.push([])
                    ans_data.push([])
        
                    if (slides_list[i].classList.contains("vote")) {
                        chart = slides_list[i].getElementsByClassName('chart')[0]
                        chart_class = Drow(chart.getContext("2d"), "vote", chc_data[i], ans_data[i], "pie")
                        chart_class_lst.push(chart_class)
                    } else {
                        chart_class_lst.push(null)
                    }
                }
        
                function Drow(ctx, title, labels, data, type) {
                    return chart_class = new Chart(ctx, {
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
                            responsive: false,
                            maintainAspectRatio: false,
                        }
                    }),
                        chart_class
                }
        
                now_slide_no = 0
                function next_slide() {
                    now_slide_no += 1
        
                    if (current_slide.nextElementSibling.classList.contains("vote")) {
                        console.log(chc_data[now_slide_no])
                        console.log(ans_data[now_slide_no])
                        for (; chc_data[now_slide_no].length;) {
                            chc_data[now_slide_no].pop()
                            ans_data[now_slide_no].pop()
                        }
                        console.log(chc_data)
                        console.log(ans_data)
                        chart_class_lst[now_slide_no].update()
        
                        q = question_obj[current_slide.nextElementSibling.id]
                        socket.emit("question", q)
                    }
                    else {
                        socket.emit("end_voting")
                    }
                    current_slide.style.display = "none"
                    current_slide = current_slide.nextElementSibling
                }
        
                function previous_slide() {
                    now_slide_no -= 1
        
                    /* 戻ったときは締め切り
                    if (current_slide.previousElementSibling.classList.contains("vote")) {
                        q = question_obj[current_slide.previousElementSibling.id]
                        socket.emit("question", q)
                    }
                    */
                    socket.emit("end_voting")
                    current_slide.previousElementSibling.style.display = "flex"
                    current_slide = current_slide.previousElementSibling
                }
        
        
                socket.on("answer", function (e) {
                    index = chc_data[now_slide_no].indexOf(e)
                    if (index < 0) {
                        chc_data[now_slide_no].push(e)
                        ans_data[now_slide_no].push(1)
                    } else {
                        ans_data[now_slide_no][index] += 1
                    }
                    chart_class_lst[now_slide_no].update()
        
                })
        
                socket.on("redo", function (e) {
                    index = chc_data[now_slide_no].indexOf(e)
                    ans_data[now_slide_no][index] -= 1
                    chart_class_lst[now_slide_no].update()
                })
                socket.on("comment", function (e) {
                    if (comment_mode == 1) {//ニコニコ
                        if (e.length > 32) {
                            e = e.slice(0, 33)
                        }
                        p = document.createElement("p")
                        p.innerHTML = e
                        p.classList.add("comment")
                        p.style.top = 90 * Math.random() + "%"
                        p.style.animationName = "shed"
                        document.body.appendChild(p)
                    }
        
                    //Vtuber風のdivにも（仮にdisplay:noneでも）追加
                    p = document.createElement("p")
                    p.innerHTML = e
                    vtuber_like_comment_div = document.getElementById('vtuber_like_comment_div')
                    vtuber_like_comment_div.appendChild(p)
                    vtuber_like_comment_div.scrollTop = 9999;
        
                })
        
                document.addEventListener('keydown', (e) => {
                    if (e.key == 'ArrowRight') {
                        e.preventDefault()
                        next_slide()
                    } else if (e.key == 'ArrowLeft') {
                        e.preventDefault()
                        previous_slide()
                    }
                }, { passive: false })
        
        
                comment_mode = 1
                document.getElementById('vtuber_like_comment_div').style.display = 'none'
                document.getElementById('comment_setting_form').addEventListener('change', function () {
                    val = this.radios1.value
                    if (val == 1) {//ニコニコ
                        document.getElementById('vtuber_like_comment_div').style.display = 'none'
                        comment_mode = 1
                    } else if (val == 2) {
                        document.getElementById('vtuber_like_comment_div').style.display = 'block'
                        comment_mode = 2
                    }
                })
        
                interact('.resizable')
                    .resizable({
                        // resize from all edges and corners
                        edges: { left: true, right: true, bottom: true, top: true },
        
                        listeners: {
                            move(event) {
                                var target = event.target
                                var x = (parseFloat(target.getAttribute('data-x')) || 0)
                                var y = (parseFloat(target.getAttribute('data-y')) || 0)
        
                                // update the element's style
                                target.style.width = event.rect.width + 'px'
                                target.style.height = event.rect.height + 'px'
        
                                // translate when resizing from top or left edges
                                x += event.deltaRect.left
                                y += event.deltaRect.top
        
                                target.style.transform = 'translate(' + x + 'px,' + y + 'px)'
        
                                target.setAttribute('data-x', x)
                                target.setAttribute('data-y', y)
                            }
                        },
                        modifiers: [
                            // keep the edges inside the parent
                            interact.modifiers.restrictEdges({
                                outer: 'parent'
                            }),
        
                        ],
        
                        inertia: true
                    })
        
                interact('.draggable')
                    .draggable({
                        listeners: {
                            move(event) {
                                var target = event.target
                                // keep the dragged position in the data-x/data-y attributes
                                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
                                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
        
        
                                target.style.position = "absolute"//edited
        
                                // translate the element
                                target.style.webkitTransform =
                                    target.style.transform =
                                    'translate(' + x + 'px, ' + y + 'px)';
                                // update the posiion attributes
                                target.setAttribute('data-x', x);
                                target.setAttribute('data-y', y);
                            }
                        },
                        inertia: true,
                        modifiers: [
                            interact.modifiers.restrictRect({
                                restriction: 'parent',
                                endOnly: true
                            })
                        ]
                    })
        
        
            </script>
        </body>
        
        </html>
        `

    HandleDownload(output_html)
}

function HandleDownload(content) {
    var blob = new Blob([content], {
        "type": "text/html"
    });
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, "slide.html");
        window.navigator.msSaveOrOpenBlob(blob, "slide.html");
    } else {
        download_btn=document.getElementById("download")
        download_btn.href = window.URL.createObjectURL(blob);
        download_btn.click()
    }
}

function GetFormatedHTMLString(slide) {
    slide.id = slide.id.split('-')[0]
    slide.classList.remove('card-panel')
    children = slide.children
    for (i = 0; i < children.length; i++) {
        children[i].classList.remove(['draggable', 'theme-elm'])
    }
    return slide.outerHTML
}
