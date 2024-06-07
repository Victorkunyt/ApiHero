import { FastifyRequest, FastifyReply, FastifyLoggerOptions } from "fastify";
import { Names } from "../types/HeroesAndVillainsTypes";
import { DeleteHeroesAndVillainsService } from "../services/DeletePersonService";
import { deleteHeroesAndVillainsSchema } from "../types/HeroesAndVillainsTypes";
import { UserExistsError } from "../error/UserExistsError";
import { PrismaClient } from "@prisma/client";

class DeleteHeroesAndVillainsController {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
     const { error } = deleteHeroesAndVillainsSchema.validate(request.query);
     if (error) {
       return reply.status(400).send({ error: error.details[0].message });
     }

    const userData = request.query as Names;
    const service = new DeleteHeroesAndVillainsService(this.prisma);
    try {
      await service.execute(userData);
      reply.code(204)
    } catch (err) {
      if (err instanceof UserExistsError) {
        reply.status(400).send({ error: err.message });
      } else {
        reply.send(err);
      }
    }
  }
}

export { DeleteHeroesAndVillainsController };
