
export async function getAddressByZipcode(valor) {
  let cep = valor.replace(/\D/g, "");

  if (cep === "") {
    return null;
  }

  let validateZipcode = /^[0-9]{8}$/;
  if (!validateZipcode.test(cep)) {
    return null;
  }

  const content = await fetchZipcode(cep);
  if ("erro" in content) {
    return null;
  }

  return {
    address: content.logradouro,
    neighborhood: content.bairro,
    city: content.localidade,
    state: content.uf,
  }
}

async function fetchZipcode(zipcode) {
  return await fetch("https://viacep.com.br/ws/" + zipcode + "/json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    },
  }).then(async (res) => await res.json());
}
