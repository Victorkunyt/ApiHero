import { FastifyRequest, FastifyReply } from "fastify";
import { Names } from "../types/HeroesAndVillainsTypes";
import { CreateHeroesAndVillainsService } from "../services/CreatePersonService";
import { createHeroesAndVillainsSchema } from "../types/HeroesAndVillainsTypes";
import { UserExistsError } from "../error/UserExistsError";
import { PrismaClient } from "@prisma/client";

class CreateHeroesAndVillainsController {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { error } = createHeroesAndVillainsSchema.validate(request.body);
    if (error) {
      return reply.status(400).send({ error: error.details[0].message });
    }

    const userData = request.body as Names; 
    const service = new CreateHeroesAndVillainsService(this.prisma);
    try {
      await service.execute(userData);
      reply.code(201)
    } catch (err) {
      if (err instanceof UserExistsError) {
        reply.status(400).send({ error: err.message });
      } else {
        reply.send(err);
      }
    }
  }
}

export { CreateHeroesAndVillainsController };
