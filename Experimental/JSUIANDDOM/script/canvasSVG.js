function init() {
    var stage = new Kinetic.Stage({
        container: 'canvas-container',
        width: 500,
        height: 500
    })
    var layer =  new Kinetic.Layer({});
    var circle = new Kinetic.Circle({
        x: 20,
        y: 80,
        radius: 20,
        fill: '#0f0',
        stroke: '#000'
    });


    layer.add(circle);
    stage.add(layer);

    function move(){

        var x = circle.getX() | 0,
            y = circle.getY() | 0,
            change = 3;
        circle.setX('x', x + change);

        circle.setY('y', y + change);
        requestAnimationFrame(move);
        layer.draw();
    }


    move();
}

init();