function colebrookWhite(reynolds, rugosidade, diametro){
  if (reynolds < 2100){
    return 64/reynolds;
  } else {
  var atrito1 = 0;
  var atrito2 = 0.1;
  while (Math.abs(atrito1 - atrito2) > 0.0000001){
    atrito1 = atrito2;
    f1 = -2 * Math.log10(rugosidade/(3.7*diametro)+2.51/reynolds*atrito1 ** (.5));
    atrito2 = (1/f1) ** 2;
  }
  return atrito2
}
}
function bernoulli(l, z1, z2, p1, p2, mi, ro, rug, d){
    var v2 = 0;
    var v2f = 1.5;
    var cont = 0;
    var bError = 10;
    var reynolds = 0;

    while (bError > 0.001){
      cont = cont + 1;
      v2 = v2f;
      reynolds = ro * v2 * d / mi;
      f = colebrookWhite(reynolds, rug, d);
      v2f = (((p1 - p2) / ro + (z1 - z2) * 9.81) / (1 / 2 + f * l / (2 * d))) ** (1 / 2);
      bError = Math.abs((v2 - v2f) / v2f);
      if (cont == 100){
        return "erro";

    }
    return v2f;
}
}
// let a = bernoulli(120, 2, 0, 101325, 101325, 0.001, 1000, 0.000045, 0.005);
// console.log(a);

$('#calcular').click(function(){
  let l = Number($('#l').val());
  let z1 = Number($('#z1').val());
  let z2 = Number($('#z2').val());
  let p1 = Number($('#p1').val());
  let p2 = Number($('#p2').val());
  let mi = Number($('#mi').val());
  let ro = Number($('#ro').val());
  let rug = Number($('#rug').val());
  let d = Number($('#d').val());

  resposta = bernoulli(l,z1,z2,p1,p2,mi,ro,rug,d);
  if (resposta = 'NaN') {
    resposta = "Erro"
  }
  $('#resposta').text('Resposta: '+ resposta);
})
