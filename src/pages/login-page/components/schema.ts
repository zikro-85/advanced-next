import * as Yup from "yup"

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Format E-Mail Salah").required("Wajib Diisi"),
  password: Yup.string().required("Wajib Diisi"),
})

export default loginSchema