import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify';
import User from '../models/User';

export default async function (server: FastifyInstance, opts: FastifyPluginOptions) {
  server.post<{
    Body: {
      email: string;
      fullName: string;
      password: string;
    };
  }>(
    '/register',
    {
      schema: {
        body: server.getSchema('https://example.com/schemas/user/login') as FastifySchema,
      },
      attachValidation: true,
    },
    async (request, reply) => {
      if (!request.body) {
        return reply.code(400).send({
          succes: false,
          bericht: 'Verzoekdata ontbreekt.',
        });
      }

      if (request.validationError) {
        return reply.code(400).send(request.validationError);
      }

      const { email, fullName, password } = request.body;

      try {
        const bestaandeGebruiker = await User.findOne({ email: email });
        if (bestaandeGebruiker) {
          return reply.code(409).send({ succes: false, bericht: 'E-mailadres is al in gebruik.' });
        }

        const user = new User({ email, fullName, password });
        await user.save();
        return reply.code(201).send({
          succes: true,
          bericht: 'Gebruiker succesvol geregistreerd.',
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
