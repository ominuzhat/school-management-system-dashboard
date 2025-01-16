export const GetErrorMassage = (error: any): string => {
    if (error.error?.data.details) {
      const firstKey = Object.keys(error.error.data.details)[0];
      return `${firstKey.split("_").join(" ")}: ${error.error.data.details[firstKey][0]}`;
    }
    return error.error?.data.message || "Error";
  };
  