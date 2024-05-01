import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email('Ongeldig e-mailadres').required('E-mailadres is verplicht'),
  password: Yup.string().required('Wachtwoord is verplicht'),
});

export default ValidationSchema;
