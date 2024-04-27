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
          succes: false,
          bericht: 'Verzoekdata ontbreekt.',
        });
      }

      const { email, password } = request.body;

      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return reply.code(401).send({ succes: false, bericht: 'Onjuiste inloggegevens.' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return reply.code(401).send({ succes: false, bericht: 'Onjuiste inloggegevens.' });
        }

        const token = server.jwt.sign({ id: user.id });

        return reply.code(200).send({
          succes: true,
          bericht: 'Succesvol ingelogd.',
          token,
        });
      } catch (error) {
        console.error(error);

        return reply.code(500).send({
          succes: false,
          bericht: 'Interne serverfout. Probeer het later opnieuw.',
        });
      }
    }
  );
}
