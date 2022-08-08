import * as yup from 'yup';

const dateRegex = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
const nameRegex = /^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/;

const validationSchema = yup.object().shape({
  cpf: yup.string().required("O cpf é obrigatório!").max(11, "O CPF tem 11 números!").min(11, "O CPF tem 11 números!").matches(/^[0-9]+$/, "O CPF aceita apenas números!"),
  nomeCompleto: yup.string().required("O nome do paciente é obrigatório!").matches(nameRegex, "Formato do nome inválido!"),
  telefone: yup.string().required("O telefone é obrigatório!").matches(/^[0-9]+$/, "O telefone aceita apenas números!").max(12, "O telefone tem 12 números!").min(12, "O telefone tem 12 números!"),
  dtNascimento: yup.string().required("A data de nascimento é obrigatória!").matches(dateRegex, "O formato deve ser dd/mm/yyyy!"),
  numeroEndereco: yup.string().required("O número de endereço é obrigatório!").matches(/^[0-9]+$/, "O número de endereço aceita apenas números!"),
  logradouroEndereco: yup.string().required("O logradouro é obrigatório!"),
  cepEndereco: yup.string().required("O cep é obrigatório!").matches(/^([0-9]{5})\-([0-9]{3})$/, "O formato do cep deve ser nnnnn-nnn!"),
  cidade: yup.string().required("A cidade é obrigatória!"),
});

export { validationSchema }