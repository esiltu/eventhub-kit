export default {
  $id: "https://example.com/schemas/user/login",
  type: "object",
  properties: {
    email: {
      $ref: "https://example.com/schemas/user#/properties/email",
    },
    password: {
      type: "string",
      minLength: 4,
      maxLength: 16,
    },
  },
  required: ["password"],
};
