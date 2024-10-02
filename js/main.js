document.addEventListener("DOMContentLoaded", () => {
  const cepInput = document.getElementById("cep");
  const streetInput = document.getElementById("street");
  const numberInput = document.getElementById("number");
  const neighborhoodInput = document.getElementById("neighborhood");
  const stateInput = document.getElementById("state");
  const cityInput = document.getElementById("city");
  const cepError = document.getElementById("cepError");

  // Limpar os campos
  function clearFields() {
    streetInput.value = "";
    neighborhoodInput.value = "";
    stateInput.value = "";
    cityInput.value = "";
  }

  // Limpar mensagem de erro
  function clearError() {
    cepError.classList.add("hidden");
    cepInput.classList.remove("input-cep-error");
  }

  // Mostrar mensagem de erro
  function showError() {
    cepError.classList.remove("hidden");
    cepInput.classList.add("input-cep-error");
  }

  // Buscar dados do endereço via API ViaCEP
  function fetchAddress(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.erro) {
          throw new Error("CEP inválido");
        }

        // Preencher os campos com dados da API
        streetInput.value = data.logradouro || "";
        neighborhoodInput.value = data.bairro || "";
        stateInput.value = data.uf || "";
        cityInput.value = data.localidade || "";

        // Limpar erro e focar no campo "Número"
        clearError();
        numberInput.focus();
      })
      .catch(() => {
        clearFields();
        showError();
      });
  }

  function handleCepBlur() {
    const cep = cepInput.value.replace(/\D/g, ""); // Remover caracteres não numéricos

    if (cep.length === 8) {
      fetchAddress(cep); // Buscar dados se CEP tiver 8 dígitos
    } else {
      clearFields();
      showError(); // Mostrar erro se CEP for inválido
    }
  }

  // Limpar mensagens de erro
  function handleCepInput() {
    clearError();
  }

  cepInput.addEventListener("blur", handleCepBlur);
  cepInput.addEventListener("input", handleCepInput);
});
