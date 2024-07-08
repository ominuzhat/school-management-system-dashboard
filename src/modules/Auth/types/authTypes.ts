export type LoginTypes = {
  email: string;
  password: string;
};

export type SendOTPTypes = {
  email: string;
};

export type MatchOTPTypes = {
  otp: string;
};

export type ForgotPasswordTypes = {
  password: string;
};

export type ErrorType = {
  status: string;
  data: {
    message: string;
  };
};
