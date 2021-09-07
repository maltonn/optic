var N=4
var S="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
room_id=Array.from(Array(N)).map(()=>S[Math.floor(Math.random()*S.length)]).join('')
req_origin='http://localhost:3000'
//slide_script=`
socket = io("${req_origin}/d?r=${room_id}");
socket.emit("room", "${room_id}");
var current_slide = top_slide;

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
            responsive: true,
            maintainAspectRatio: false,
        }
    }),
        chart_class
}
charts = document.getElementsByClassName("chart")
chart_count = 0
chart = null
main_func = (() => {
    action = document.querySelector("#" + current_slide.id + " .action")
    if (action) { action.classList.remove("action") }
    else {
        if (current_slide.nextElementSibling.classList.contains("vote")) {
            chart = charts[chart_count]
            chart_count += 1
            q = question_obj[current_slide.nextElementSibling.id]
            socket.emit("question", q)
            chc_list = []
            ans_list = []
            //resulting_div = document.createElement("div")
        }
        else {
            socket.emit("end_voting")
        }
        switch_slide()
    }
})
//switch_slides = document.querySelectorAll("#switch_slides_div > div")

back_slide = (() => {
    current_slide.style.zIndex = "110",
        (current_slide = current_slide.previousElementSibling).style.transform = "rotate(0)"
})
switch_slide = (() => {
    current_slide.style.display = "none",
        current_slide = current_slide.nextElementSibling
})
flag = !0
chart_class = null
socket.on("answer", function (e) {
    index = chc_list.indexOf(e)
    if (index < 0) {
        (chc_list.push(e), ans_list.push(1))
    } else {
        ans_list[index] += 1
    }
    if (flag) {
        chart_class = Drow(chart.getContext("2d"), "sample", chc_list, ans_list, "pie")
    } else {
        chart_class.update()
    }
    flag = !1
})

socket.on("redo", function (e) {
    index = chc_list.indexOf(e),
        ans_list[index] -= 1,
        chart_class.update()
})

socket.on("comment", function (e) {
    console.log(e),
        e.length > 32 && (e = e.slice(0, 33)),
        elm = document.createElement("p"),
        elm.innerHTML = e,
        elm.classList.add("comment"),
        elm.style.top = 90 * Math.random() + "%",
        elm.style.animationName = "shed",
        document.body.appendChild(elm)
})

document.addEventListener("click", function () {
    main_func()
});
//`
