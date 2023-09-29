

// Função para aplicar a máscara de CPF
function mascaraCPF(cpf) {
  cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Insere o primeiro ponto
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Insere o segundo ponto
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Insere o traço
  return cpf;
}

// Função para validar o CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

  if (cpf.length !== 11 || !/[0-9]{11}/.test(cpf)) {
    return false;
  }

  // Realiza a validação do dígito verificador
  const digits = cpf.split('').map(Number);
  let sum = 0;
  let i;

  for (i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }

  const mod = sum % 11;
  const firstVerifier = mod < 2 ? 0 : 11 - mod;

  if (digits[9] !== firstVerifier) {
    return false;
  }

  sum = 0;

  for (i = 0; i < 10; i++) {
    sum += digits[i] * (11 - i);
  }

  const secondVerifier = mod < 2 ? 0 : 11 - mod;

  if (digits[10] !== secondVerifier) {
    return false;
  }

  return true;
}

// Adicionar um ouvinte de eventos para formatar o CPF enquanto o usuário digita
const cpfInput = document.getElementById('cpfInput');
cpfInput.addEventListener('input', function (event) {
  const formattedCPF = mascaraCPF(event.target.value);
  event.target.value = formattedCPF;
});

// Adicionar um ouvinte de eventos para validar o CPF quando o campo perder o foco
cpfInput.addEventListener('blur', function (event) {
  const cpf = event.target.value;
  if (validarCPF(cpf)) {
    alert('CPF válido!');
  } else {
    alert('CPF inválido!');
    event.target.focus(); // Volta o foco para o campo para correção
  }
});

{/* <script defer src="./js/script.js"></script>

<!-- <script>
const scriptURL = 'https://docs.google.com/spreadsheets/d/1bB6_yMJJTtnRznMkcjiV3jc4oExEUTJHCaPDJO_VASM/edit#gid=0'
    const form = document.forms['form']
    // const form = document.getElementById('form')
    // const cpf = document.getElementById('cpf')
    const formData = new FormData(form)
    
    form.addEventListener('submit', e => {
        e.preventDefault() //para não seguir a action default do form                
        console.log(formData)
        // fetch(scriptURL, { method: 'POST', body: {cpf}})
        // .then(response => console.log('Success!', response))
        // .catch(error => console.error('Error!', error.message))
})
</script> --> */}