export function fMasc(objeto, mascara) {
  let obj = objeto;
  let masc = mascara;
  setTimeout(() => {
    fMascEx(obj, masc);
  }, 500);
}

export function fMascEx(obj, masc) {
  obj.value = masc(obj.value);
}

export function numberToReal(numero) {
  numero = Number(numero).toFixed(2).split(".");
  numero[0] = numero[0].split(/(?=(?:...)*$)/).join(".");
  return numero.join(",");
}

export function mTel(tel) {
  tel = tel.replace(/\D/g, "");
  tel = tel.replace(/^(\d)/, "($1");
  tel = tel.replace(/(.{3})(\d)/, "$1)$2");
  if (tel.length == 9) {
    tel = tel.replace(/(.{1})$/, "-$1");
  } else if (tel.length == 10) {
    tel = tel.replace(/(.{2})$/, "-$1");
  } else if (tel.length == 11) {
    tel = tel.replace(/(.{3})$/, "-$1");
  } else if (tel.length == 12) {
    tel = tel.replace(/(.{4})$/, "-$1");
  } else if (tel.length > 12) {
    tel = tel.replace(/(.{4})$/, "-$1");
  }
  return tel;
}

export function mCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, "");
  cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
  cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");
  return cnpj;
}

export function mCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf;
}

export function mCEP(cep) {
  cep = cep.replace(/\D/g, "");
  cep = cep.replace(/^(\d{2})(\d)/, "$1.$2");
  cep = cep.replace(/\.(\d{3})(\d)/, ".$1-$2");
  return cep;
}

export function mNum(num) {
  num = num.replace(/\D/g, "");
  return num;
}

export function mDataNasc(data) {
  data = data.replace(/\D/g, "");
  data = data.replace(/(\d{2})(\d)/, "$1/$2");
  data = data.replace(/(\d{2})(\d)/, "$1/$2");
  return data;
}

export function mValidadeCartao(data) {
  data = data.replace(/\D/g, "");
  data = data.replace(/(\d{2})(\d)/, "$1/$2");
  return data;
}

export function mCartao(v) {
  v = v.replace(/\D/g, "");
  v = v.replace(/(\d{4})/g, "$1 ");
  v = v.replace(/\.$/, "");
  v = v.substring(0, 19);

  return v;
}

export function moeda(i) {
  let v = i.value.replace(/\D/g, "");
  v = (v / 100).toFixed(2) + "";
  v = v.replace(".", ",");
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
  i.value = v;
}

export function mCPFCNPJ(v) {
  v = v.replace(/\D/g, "");

  if (v.length < 14) {
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
  }

  return v;
}

export function mRG(v) {
  v = v.replace(/\D/g, "");
  v = v.replace(/(\d{2})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1-$2");

  return v;
}
