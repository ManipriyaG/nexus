import useAuthForm from "../hooks/useAuthForm"
import styles from "./authPage.module.css"

const AuthPage = () => {
    const { mode, formData, formErrors, serverError, isLoading, showPassword,
        handleChange, handleSubmit, switchMode,
        dismissError, togglePasswordVisibility } = useAuthForm();
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {/* Logo */}
                <div className={styles.logo}>
                    <div className={styles.logoDot} />
                    <span className={styles.logoText}>Nexus</span>
                </div>
                {/* Heading */}
                <div className={styles.heading}>
                    <h1 className={styles.title}>
                        {mode === 'Login' ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className={styles.subtitle}>{
                        mode === 'Login' ? 'Sign in to your workspace' : 'Start collaborating in real time'
                    }</p>

                </div>
                {/* ServerError */}
                {serverError &&
                    <div className={styles.errorBanner}>
                        <span>{serverError}</span>
                        <button className={styles.errorClose} onClick={dismissError}>
                            x
                        </button>
                    </div>}
                {/* Form */}
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    {mode === 'Register' &&
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="name">Full Name</label>
                            <input type="text" id="name" onChange={handleChange('name')}
                                placeholder="John Doe" autoComplete="name"
                                className={`${styles.input} ${formErrors.name ? styles.inputError : ''}`} />
                            {formErrors.name &&
                                <span className={styles.fieldError}>{formErrors.name}</span>}
                        </div>
                    }
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="email">Email Address</label>
                        <input type="email" id="email" value={formData.email} onChange={handleChange('email')}
                            placeholder="name@gmail.com" autoComplete="email" autoFocus
                            className={`${styles.input} ${formErrors.email ? styles.inputError : ''}`} />
                        {formErrors.email &&
                            <span className={`${styles.fieldError}`}>{formErrors.email}</span>}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="password">Password</label>
                        <div className={styles.passwordWrapper}>
                            <input id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange('password')}
                                className={`${styles.input} ${formErrors?.password ? styles.inputError : ''}`}
                                autoComplete={mode === 'Login' ? 'current-password' : 'new-password'}
                                placeholder={
                                    mode === 'Register'
                                        ? 'Min 8 chars, upper, lower, number'
                                        : '••••••••'
                                } />
                            <button type="button" onClick={togglePasswordVisibility}
                                className={styles.passwordToggle} aria-label={
                                    showPassword ? 'Hide password' : 'Show password'
                                }>{showPassword ? '🙈' : '👁️'} </button>
                        </div>
                        {formErrors.password &&
                            <span className={styles.fieldError}>{formErrors.password}</span>}
                    </div>

                    {mode === 'Register' &&
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="confirmPassword">Confirm Password</label>
                            <div className={styles.passwordWrapper}>

                                <input className={`${styles.input} ${formErrors.confirmPassword ? styles.inputError : ''}`} id="confirmPassword" value={formData.confirmPassword}
                                    onChange={handleChange('confirmPassword')} autoComplete="new-password"
                                    placeholder="Repeat your password" type={showPassword ? 'text' : 'password'} />
                            </div>
                            {formErrors.confirmPassword &&
                                <span className={styles.fieldError}>{formErrors.confirmPassword}</span>}
                        </div>}

                    <button type="submit" className={styles.submitButton} disabled={isLoading}>
                        {mode === 'Login' ? 'Sign in' : 'Create account'}
                    </button>
                </form>

                <div className={styles.switchRow}>
                    <span className={styles.switchText}>
                        {mode === 'Login' ? "Don't have an account already? " : "Already have an account"}
                    </span>
                    <button type="button" onClick={switchMode} className={styles.switchButton}>
                        {mode === 'Login' ? "Sign up" : "Sign in"}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default AuthPage