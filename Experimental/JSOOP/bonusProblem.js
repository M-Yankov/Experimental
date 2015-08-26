/*
 a=[];
 function z(p){function f(n){return a[n]?a[n]:a[n]=(n?n*f(n-1):1)}return (f(p*2)/(f(p+1)*f(p)))/2}
 console.log(z(7));*/
function a(p){return[1,1,2,5,14,42,132,429,1430,4862,16796,58786][p[0]]/2}