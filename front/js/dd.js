interact('.resizable')
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width / 0.6 + 'px'
        target.style.height = event.rect.height / 0.6  + 'px'

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

        /*
      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 }
      })
      */
    ],

    inertia: true
  })

  interact('.draggable')
  .draggable({
    listeners: { move: dragMoveListener },
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ]
  })


  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        scale=0.6//editor内のスライドのtransform:scale()の値
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx/scale,//edited //transform:scale(0.6)の状態では要素の移動距離が0.6倍になるので、0.6で割ってマウスの動きと合わせる
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy/scale;//edited


    target.style.position="absolute"//edited

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';
    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

