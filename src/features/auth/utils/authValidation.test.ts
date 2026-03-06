import { INITIAL_FORM_DATA, validateAuthForms, validateField, type AuthFormData } from "./authValidation";

const validRegisterFormData: AuthFormData = {
    email: "mani@gmail.com",
    name: "mani",
    password: "Mani12345",
    confirmPassword: "Mani12345"
}

const validLoginFormData: AuthFormData = {
    email: "mani@gmail.com",
    name: "",
    password: "Mani12345",
    confirmPassword: ""
}

describe("validateAuthForm on Login", () => {
    it("should return empty errors for valid login form data", () => {
        const errors = validateAuthForms(validLoginFormData, 'Login')
        expect(Object.keys(errors).length).toBe(0)
    })
    it("should return error for invalid email", () => {
        const errors = validateAuthForms({ ...validLoginFormData, email: "mani" }, 'Login')
        expect(errors.email).toBeDefined()
    })
    it("should return error for invalid password", () => {
        const errors = validateAuthForms({ ...validLoginFormData, password: "1" }, 'Login')
        expect(errors.password).toBeDefined()
    })
    it("should return errors when password or email is empty", () => {
        const errors = validateAuthForms({ ...validLoginFormData, email: "", password: "" }, 'Login')
        expect(errors.email).toBeDefined()
        expect(errors.password).toBeDefined()
        expect(Object.keys(errors).length).toBeGreaterThan(0)
    })
})

describe("validationAuthForm on Register", () => {
    it("should return empty errors for valid register form data", () => {
        const errors = validateAuthForms(validRegisterFormData, 'Register')
        expect(Object.keys(errors).length).toBe(0)
    })
    it("should return error for invalid email", () => {
        const errors = validateAuthForms({ ...validRegisterFormData, email: "mani" }, 'Register')
        expect(errors.email).toBeDefined()
    })
    it("should return error for invalid password", () => {
        const errors = validateAuthForms({ ...validRegisterFormData, password: "1" }, 'Register')
        expect(errors.password).toBeDefined()
    })
    it("should return errors when password or email is empty", () => {
        const errors = validateAuthForms({ ...validRegisterFormData, email: "", password: "" }, 'Register')
        expect(errors.email).toBeDefined()
        expect(errors.password).toBeDefined()
        expect(Object.keys(errors).length).toBeGreaterThan(0)
    })
    it("should return error for no name", () => {
        const errors = validateAuthForms({ ...validRegisterFormData, name: "" }, 'Register')
        expect(errors.name).toBeDefined()
    })
    it("should return error when password and confirm password didnt match", () => {
        const errors = validateAuthForms({ ...validRegisterFormData, password: "mani", confirmPassword: "Ui" }, 'Register')
        expect(errors.confirmPassword).toBeDefined()
    })
    it("should return error when confirmPassword is empty", () => {
        const errors = validateAuthForms({ ...validRegisterFormData, password: "mani", confirmPassword: "" }, 'Register')
        expect(errors.confirmPassword).toBeDefined()
    })
})

describe("validateField", () => {
    it("should return error for invalid email", () => {
        const error = validateField("email", "mani", INITIAL_FORM_DATA, 'Login')
        expect(error).toBeDefined()
    })
    it("should return error for invalid password", () => {
        const error = validateField("password", "mani", INITIAL_FORM_DATA, 'Login')
        expect(error).toBeDefined()
    })
    it("should return error for invalid name", () => {
        const error = validateField("name", "", INITIAL_FORM_DATA, 'Register')
        expect(error).toBeDefined()
    })
    it("should return error when confirmPassword doesnot match with password", () => {
        const error = validateField("confirmPassword", "pass", INITIAL_FORM_DATA, 'Register')
        expect(error).toBeDefined()
    })
    it("should not return error when name not given for login", () => {
        const error = validateField("name", "", INITIAL_FORM_DATA, 'Login')
        expect(error).toBeUndefined()
    })
    it("should not return error when confirmPassword not given for login", () => {
        const error = validateField("name", "", INITIAL_FORM_DATA, 'Login')
        expect(error).toBeUndefined()
    })
    it("should return undefined for valid login form or register form", () => {
        const error = validateField("confirmPassword", "", validLoginFormData, 'Login')
        expect(error).toBeUndefined()
    })
})

describe("validateAuthForm, Email rules", () => {
    it("should return error when @ not present", () => {
        const error = validateAuthForms({ ...validLoginFormData, email: "mani" }, 'Login')
        expect(error.email).toBeDefined()
    })
    it("should return error when email is not present", () => {
        const error = validateAuthForms({ ...validLoginFormData, email: "" }, 'Login')
        expect(error.email).toBeDefined()
    })
    it("should not return error for valid email", () => {
        const error = validateAuthForms({ ...validLoginFormData, email: "mani@gmail.com" }, 'Login')
        expect(error.email).toBeUndefined()
    })
})

describe("validateAuthForm, Password rules", () => {
    it("should return error when not present", () => {
        const error = validateAuthForms({ ...validLoginFormData, password: "" }, 'Login')
        expect(error.password).toBeDefined()
    })
    it("should return error when password length is less than 2", () => {
        const error = validateAuthForms({ ...validLoginFormData, password: "1" }, 'Login')
        expect(error.password).toBeDefined()
    })
    it("should return error when password doesnot have uppercase", () => {
        const error = validateAuthForms({ ...validLoginFormData, password: "abcdefdf1" }, 'Login')
        expect(error.password).toBeDefined()
    })
    it("should return error when password doesnot have lowercase", () => {
        const error = validateAuthForms({ ...validLoginFormData, password: "ABCFEEEEE1" }, 'Login')
        expect(error.password).toBeDefined()
    })
    it("should return error when password doesnot have numbers", () => {
        const error = validateAuthForms({ ...validLoginFormData, password: "Manidhani" }, 'Login')
        expect(error.password).toBeDefined()
    })
    it("should not return error for valid password", () => {
        const error = validateAuthForms({ ...validLoginFormData, password: "Mani12345" }, 'Login')
        expect(error.password).toBeUndefined()
    })

})