import { FastifyRequest, FastifyReply } from "fastify";
import { Names } from "../types/HeroesAndVillainsTypes";
import { UpdateHeroesAndVillainsService } from "../services/PutPersonService";
import { updateHeroesAndVillainsSchema } from "../types/HeroesAndVillainsTypes";
import { UserExistsError } from "../error/UserExistsError";
import { PrismaClient } from "@prisma/client";

class UpdateHeroesAndVillainsController {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { error } = updateHeroesAndVillainsSchema.validate(request.body);
    if (error) {
      return reply.status(400).send({ error: error.details[0].message });
    }
    const userData = request.body as Names; 
    const service = new UpdateHeroesAndVillainsService(this.prisma);
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

export { UpdateHeroesAndVillainsController };
