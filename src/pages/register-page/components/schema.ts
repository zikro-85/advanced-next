import * as Yup from "yup"

const registerSchema = Yup.object().shape({
  firstname: Yup.string().min(3, "Minimal 3 Karakter").required("Wajib Diisi"),
  lastname: Yup.string().required("Wajib Diisi"),
  email: Yup.string().email("Format E-Mail Salah").required("Wajib Diisi"),
  password: Yup.string()
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 
    "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
  )
  .required("Wajib Diisi"),
})

export default registerSchema