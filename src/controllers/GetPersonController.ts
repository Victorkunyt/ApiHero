import { FastifyRequest, FastifyReply, FastifyLoggerOptions } from "fastify";
import { GetHeroesAndVillainsService } from "../services/GetPersonService";
import { UserExistsError } from "../error/UserExistsError";
import { PrismaClient } from "@prisma/client";

class GetHeroesAndVillainsController {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {

    const service = new GetHeroesAndVillainsService(this.prisma);
    try {
      const AllPerson = await service.execute();
      reply.send(AllPerson)
    } catch (err) {
      if (err instanceof UserExistsError) {
        reply.status(400).send({ error: err.message });
      } else {
        reply.send(err);
      }
    }
  }
}

export { GetHeroesAndVillainsController };
