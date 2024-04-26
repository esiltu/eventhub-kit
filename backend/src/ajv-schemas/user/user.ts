export default {
  $id: 'https://example.com/schemas/user',
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      minLength: 4,
      maxLength: 25,
    },
    fullName: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
    },
  },
  required: ['email', 'fullName'],
};
