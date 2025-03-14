// export const GetErrorMassage = (error: any): string => {
//   console.log(error.error, "errorerrorerrorerrorerrorerrorerrorerrorerror");
//   if (error.error?.data?.details) {
//     const firstKey = Object.keys(error.error.data.details)[0];
//     return `${firstKey.split("_").join(" ")}: ${
//       error.error.data.details[firstKey][0]
//     }`;
//   }
//   return error.error?.data?.message || "Error";
// };
export const GetErrorMassage = (error: any): string => {
  console.log(error.error, "errorerrorerrorerrorerrorerrorerrorerrorerror");

  // First, check if there are validation messages in the 'message' array
  if (error.error?.data?.message && Array.isArray(error.error.data.message)) {
    const messageArray = error.error.data.message;

    // Map over the message array and return the error details
    return messageArray
      .map((msg: any) => {
        // If there's a 'comment' field, display its error message
        if (msg.comment && Array.isArray(msg.comment)) {
          return `Comment: ${msg.comment.join(", ")}`;
        }
        // Handle other fields or just return the message
        return `Error: ${JSON.stringify(msg)}`;
      })
      .join(", "); // Join all the errors into a single string if there are multiple messages
  }

  // Check if there are validation details for specific fields
  if (error.error?.data?.details) {
    const details = error.error.data.details;

    // Check if the error is related to the 'comment' field and return the error message
    if (details.comment && Array.isArray(details.comment)) {
      return `Comment: ${details.comment.join(", ")}`; // Handling array of errors
    }

    // Check other fields if needed
    const firstKey = Object.keys(details)[0];
    return `${firstKey.split("_").join(" ")}: ${details[firstKey][0]}`;
  }

  // Return a generic error message if no specific error details are found
  return error.error?.data?.message || "An unexpected error occurred.";
};
