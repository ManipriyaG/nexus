import React, { useState } from "react"
import useAuth from "./useAuth"
import { type FormErrors, INITIAL_FORM_DATA, type AuthFormData, type AuthMode, validateField, validateAuthForms } from "../utils/authValidation"

const useAuthForm = () => {
    const { login, register, dismissError, isLoading, error } = useAuth()
    const [mode, setMode] = useState<AuthMode>('Login')
    const [formData, setFormData] = useState<AuthFormData>(INITIAL_FORM_DATA)
    const [formErrors, setFormErrors] = useState<FormErrors>({})
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleChange = (field: keyof AuthFormData) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            setFormData((prev) => ({ ...prev, [field]: value }))

            if (formErrors[field] !== undefined) {
                const fieldError = validateField(field, value, formData, mode)
                if (fieldError) {
                    setFormErrors((prev) => ({ ...prev, [field]: fieldError }))
                }
            }
        }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        dismissError()
        const errors = validateAuthForms(formData, mode)
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return
        }
        let success = false
        if (mode === 'Login') {
            success = await login({ email: formData.email, password: formData.password })
        } else if (mode === 'Register') {
            success = await register({ name: formData.name, email: formData.email, password: formData.password })
        }

        if (success) {
            // navigation logic
        }
    }

    const switchMode = () => {
        setMode((prev) => (prev === 'Login' ? 'Register' : 'Login'))
        setFormData(INITIAL_FORM_DATA)
        setFormErrors({})
        dismissError()
        setShowPassword(false)
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

    return { mode, formData, formErrors, showPassword, handleChange, handleSubmit, switchMode, togglePasswordVisibility, isLoading, serverError: error, dismissError }

}
export default useAuthForm