export type AuthMode = 'Login' | 'Register'

export interface AuthFormData {
  email: string
  name: string
  password: string
  confirmPassword: string
}

export interface FormErrors {
  email?: string
  name?: string
  password?: string
  confirmPassword?: string
}

export const INITIAL_FORM_DATA: AuthFormData = {
  email: '',
  name: '',
  password: '',
  confirmPassword: ''
}

const validateName = (name: string): string | undefined => {
  if (!name.trim()) return "Name is required"
  if (name.trim().length < 2) return "Name must be atleast 2 characters"
}

const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) return "Email is required"
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return "Enter valid email address"
}

const validatePassword = (password: string): string | undefined => {
  if (!password.trim()) return "Password is required"
  if (password.length < 8) return "Password must be atleast 8 characters"
  if (!/(?=.*[a-z])/.test(password)) return 'Must contain a lowercase letter'
  if (!/(?=.*[A-Z])/.test(password)) return 'Must contain an uppercase letter'
  if (!/(?=.*\d)/.test(password)) return 'Must contain a number'
}

const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
  if (!confirmPassword) return "Please confirm your password"
  if (confirmPassword !== password) return "Passwords do not match"
}

export const validateAuthForms = (data: AuthFormData, mode: AuthMode): FormErrors => {
  const errors: FormErrors = {}
  if (mode === 'Register') {
    const nameError = validateName(data.name)
    if (nameError) errors.name = nameError
  }

  const emailError = validateEmail(data.email)
  if (emailError) errors.email = emailError

  const passwordError = validatePassword(data.password)
  if (passwordError) errors.password = passwordError

  if (mode === 'Register') {
    const confirmPasswordError = validateConfirmPassword(data.password, data.confirmPassword)
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError
  }
  return errors
}

// Called on every keystroke AFTER the field has already shown an error
// This makes errors disappear in real time as user fixes them
export const validateField = (field: keyof AuthFormData, value: string, formData: AuthFormData, mode: AuthMode): string | undefined => {
  switch (field) {
    case 'name':
      return mode === 'Register' ? validateName(value) : undefined
    case 'email':
      return validateEmail(value)
    case 'password':
      return validatePassword(value)
    case 'confirmPassword':
      return mode === 'Register' ? validateConfirmPassword(formData.password, value) : undefined
    default:
      return undefined
  }

}