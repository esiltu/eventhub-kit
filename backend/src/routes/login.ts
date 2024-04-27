import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import User from '../models/User';
import bcrypt from 'bcrypt';

export default async function (server: FastifyInstance, opts: FastifyPluginOptions) {
  server.register(require('@fastify/jwt'), {
    secret: process.env.JWT_SECRET,
  });

  server.post<{
    Body: {
      email: string;
      password: string;
    };
  }>(
    '/login',
    {
      attachValidation: true,
    },
    async (request, reply) => {
      if (!request.body) {
        return reply.code(400).send({
          success: false,
          message: 'Request data is missing.',
        });
      }

      const { email, password } = request.body;

      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return reply.code(401).send({ success: false, message: 'Incorrect login credentials.' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return reply.code(401).send({ success: false, message: 'Incorrect login credentials.' });
        }

        const token = server.jwt.sign({
          id: user.id, // User's ID
          fullname: user.fullName, // User's Full Name
          email: user.email, // User's Email
        });

        return reply.code(200).send({
          success: true,
          message: 'Successfully logged in.',
          token,
        });
      } catch (error) {
        console.error(error);

        return reply.code(500).send({
          success: false,
          message: 'Internal server error. Please try again later.',
        });
      }
    }
  );
}
