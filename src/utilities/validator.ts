// ===================== Username Validator =====================
export const nameValidator = (_: unknown, value: string): Promise<void> => {
  if (!value) {
    return Promise.reject(new Error());
  }
  if (!/^[a-zA-Z 0-9]+$/.test(value)) {
    return Promise.reject(new Error("User name must be alphanumeric"));
  }
  if (value.length < 3) {
    return Promise.reject(
      new Error("User name must be at least 3 characters long")
    );
  }
  return Promise.resolve();
};

// ===================== Email Validator =====================
export const emailValidator = (_: unknown, value: string): Promise<void> => {
  if (!value) {
    return Promise.reject(new Error());
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return Promise.reject(new Error("Please enter a valid email address"));
  }
  return Promise.resolve();
};

// ===================== Password Validator =====================
export const passwordValidator = (_: unknown, value: string): Promise<void> => {
  if (!value) {
    return Promise.reject(new Error());
  }

  if (value.length < 8) {
    return Promise.reject(
      new Error("Password must be at least 8 characters long")
    );
  }

  //   const hasUpperCase = /[A-Z]/.test(value);
  //   const hasLowerCase = /[a-z]/.test(value);
  //   const hasDigit = /[0-9]/.test(value);
  //   const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  //   if (!(hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar)) {
  //     return Promise.reject(
  //       new Error(
  //         "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
  //       )
  //     );
  //   }

  return Promise.resolve();
};

// ===================== OTP Validator =====================
export const otpValidator = (_: unknown, value: string): Promise<void> => {
  if (!value) {
    return Promise.reject(new Error());
  }
  const otpRegex = /^\d{6}$/;
  if (!otpRegex.test(value)) {
    return Promise.reject(new Error("Please enter a valid 6-digit OTP"));
  }
  return Promise.resolve();
};

// ===================== BD Phone Number Validator =====================
export const phoneValidator = (_: unknown, value: string) => {
  if (!value) {
    return Promise.reject(new Error());
  }
  if (value.length !== 11 || !value.startsWith("01")) {
    return Promise.reject(
      "Please enter a valid Bangladesh phone number starting with 01"
    );
  }
  return Promise.resolve();
};

// ===================== Normal text Validator =====================
export const textValidator = (_: unknown, value: string): Promise<void> => {
  if (!value) {
    return Promise.reject(new Error());
  }

  if (value.length > 20) {
    return Promise.reject(new Error("Maximum 20 characters allowed"));
  }
  const lowercaseRegex = /^[a-z]+$/;
  if (!lowercaseRegex.test(value)) {
    return Promise.reject(
      new Error("Only lowercase letters (a-z) are allowed")
    );
  }
  return Promise.resolve();
};

// ===================== Number Validator =====================
export const numberValidator = (_: unknown, value: number): Promise<void> => {
  if (!value) {
    return Promise.reject(new Error());
  }
  const numberRegex = /^[+-]?\d*\.?\d+$/;
  if (!numberRegex.test(String(value))) {
    return Promise.reject(new Error("Please enter a valid numeric value"));
  }

  return Promise.resolve();
};
