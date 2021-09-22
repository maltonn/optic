document.getElementById('file-upload-input').addEventListener('change', (e) => {
    var reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = function (e) {
        html = document.createElement('root')
        html.innerHTML = reader.result

        sections = html.getElementsByTagName('section')
        console.log(sections)
        slide_count=sections.length-2
        for (i = 1; i < sections.length-1 ; i++) {//startとendのスライドは除く
            if (i == 1) {
                editor = document.getElementById('editor')
                editor.innerHTML = ''
                editor.appendChild(sections[i].cloneNode(true))
            }
            div=document.getElementById(`slide${i}-clone-div`)
            if(div){
                div.innerHTML=''
            }
            else{
                div=document.createElement('div')
                div.id=`slide${i}-clone-div`
                div.classList.add('clone-div')
                document.getElementById('summary').appendChild(div)
            }
            mask=document.createElement('div')
            mask.id=`slide${i}-clone-mask`
            mask.classList.add('mask')
            mask.addEventListener('click', function () {
                SwitchSlide(this.id.split('-')[0] + "-clone")
            })

            sections[i].id=sections[i].id+"-clone"
            div.appendChild(sections[i].cloneNode(true))
            div.appendChild(mask)
            if(i==1){
                mask.innerHTML = "<p>Now Editing..</p>"
                mask.style.backgroundColor = "rgba(191, 54, 12,.8)"
            }

        }
    }
})