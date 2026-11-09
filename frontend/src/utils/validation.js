/**
 * Validation utilities and constants for MealMind authentication and user management
 */

// Matches backend StrongPassword validator (min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special character)
export const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/

// Email regex pattern (RFC 5322 compliant subset)
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Vietnam phone number format (10 to 11 numeric digits)
export const PHONE_REGEX = /^[0-9]{10,11}$/

/**
 * Checks if a password satisfies strong password criteria
 * @param {string} password 
 * @returns {boolean}
 */
export const isStrongPassword = (password) => {
  return typeof password === 'string' && STRONG_PASSWORD_REGEX.test(password)
}

/**
 * Validates email format
 * @param {string} email 
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  return typeof email === 'string' && EMAIL_REGEX.test(email.trim())
}

/**
 * Validates phone format (optional field; empty is valid)
 * @param {string} phone 
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  if (!phone || !phone.trim()) return true
  return PHONE_REGEX.test(phone.replace(/\s/g, ''))
}

export const PASSWORD_REQUIREMENTS_MESSAGE =
  'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt (!@#$%^&*...)'
