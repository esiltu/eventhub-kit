export default {
  $id: "https://example.com/schemas/user",
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
      minLength: 4,
      maxLength: 16,
    },
  },
  required: ["email"],
};
