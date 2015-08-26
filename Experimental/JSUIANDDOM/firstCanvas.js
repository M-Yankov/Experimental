var traficLight = (function () {

    var theCanvas = document.getElementById('the_canvas');
    var ctx = theCanvas.getContext('2d'); //use lowercase 'd';
    var red = 'rgb(255, 0, 0)',
        green = 'rgb(0, 250, 0)',
        yellow = 'rgb(250, 250, 0)',
        gray = '#888';

    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(0, 0, 20)";

    var redTogreen = function () {
        ctx.arc(250, 70, 60, 0, Math.PI * 2);
        ctx.fillStyle = red;
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(250, 70 + (2 * 60), 60, 0, Math.PI * 2);
        ctx.fillStyle = gray;
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(250, 70 + (4 * 60), 60, 0, Math.PI * 2);
        ctx.fillStyle = gray;
        ctx.fill();
        ctx.stroke();

        window.setTimeout(addYellow, 2000);
        window.setTimeout(grenOnly, 4500);
    };

    function addYellow() {
        ctx.beginPath();
        ctx.arc(250, 70 + (2 * 60), 60, 0, Math.PI * 2);
        ctx.fillStyle = yellow;
        ctx.fill();
        ctx.stroke();
    }

    function grenOnly() {
        ctx.beginPath();
        ctx.arc(250, 70, 60, 0, Math.PI * 2);
        ctx.fillStyle = gray;
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(250, 70 + (2 * 60), 60, 0, Math.PI * 2);
        ctx.fillStyle = gray;
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(250, 70 + (4 * 60), 60, 0, Math.PI * 2);
        ctx.fillStyle = green;
        ctx.fill();
        ctx.stroke();
    }

    return redTogreen;
}());

traficLight();