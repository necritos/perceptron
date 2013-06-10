/**
 * Created with JetBrains PhpStorm.
 * User: necros
 * Date: 03/06/13
 * Time: 02:06 PM
 * To change this template use File | Settings | File Templates.
 */
var number=0;
var w1,w2,w3,e;
var patrones=[];
var cmb=-1;
function patron(x1,x2,b,c){
    this.x1 = x1;
    this.x2 = x2;
    this.b = b;
    this.c = c;
}
function crear(){
    number=$("#number").val();

    $("#vals").html('');
    for(var i=0;i<number;i++){

       var thtml="<div> <h3>Patron "+(i+1)+"</h3>";
           thtml+="<div>" +
               "<input placeholder='X1' class='input-mini' type='number' required id='x1"+i+"'>" +
               "<input placeholder='X2' type='number' class='input-mini' required id='x2"+i+"'>" +
               "<input placeholder='b' type='number' class='input-mini' required id='b"+i+"'>" +
               "<input placeholder='clase' type='number' class='input-mini' required id='c"+i+"'>" +
               "</div>";
           thtml+="</div>";
        $("#vals").append(thtml);

    }
}
function result(){

    patrones=[];

    for(var i=0;i<number;i++){
        var p=new patron(parseFloat($('#x1'+i).val()),parseFloat($('#x2'+i).val()),parseFloat($('#b'+i).val()),parseFloat($('#c'+i).val()));
        patrones.push(p);
    }
    e=parseFloat($('#e').val());
    w1=parseFloat($('#w1').val());
    w2=parseFloat($('#w2').val());
    w3=parseFloat($('#w3').val());
    if($('#tipo1').is(':checked'))
        cmb=-1;
    else
        cmb=0;
    calcular();
}
function calcular(){
    var rr=$("#resultado");
    rr.html('');
    var ep=0;
    var no_cumple=true;
    var cont=0;
    while(no_cumple){
        rr.append("<h3> EPOCA "+(ep)+"</h3>");
        for(var i=0;i<number;i++){
            var p=patrones[i];
            var vnet=net(p);
            if(vnet!=0){
                cont=0;
                rr.append("<h5> NET "+(i+1)+" no cumple</h5>");

                aprender(p,vnet);
                rr.append("<span>aprendiendo...</span> <ul>"+
                    " <li>W1:"+w1+"</li><li> W2:"+w2+"</li> <li>W3:"+w3+""+
                    " </li></ul>");
            }else{
                rr.append("<h5> NET "+(i+1)+" cumple!!</h5>");
                cont++;
            }
        }
        if(cont==4||ep==100){
            console.log(cont+" "+ep);
            no_cumple=false;
        }
        cont=0;
        ep++;
    }
    rr.append("<h3> RESULTADO </h3>");
    rr.append(" <span>valores finales</span> <ul> "+
        " <li>W1:"+w1+"</li><li> W2:"+w2+"</li> <li>W3: "+w3+""+
        " </li></ul> ");
    $("#resultado").mCustomScrollbar({
        scrollButtons:{
            enable:true
        }
    });
}
function aprender(p,v){
    w1=w1 + e*v* p.x1;
    w2=w2 + e*v* p.x2;
    w3=w3 + e*v* p.b;
}
function net(p){
    var d;
    var t= p.c;
    var val= p.x1*w1+p.x2*w2+p.b*w3;
    if(val<=0)
        d=cmb;
    else
        d=1;
    return (t-d);
}