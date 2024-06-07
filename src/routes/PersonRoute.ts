import { FastifyInstance, FastifyPluginOptions,FastifyRequest,FastifyReply } from "fastify";
import { CreateHeroesAndVillainsController } from "../controllers/CreatePersonController";
import { GetHeroesAndVillainsController } from "../controllers/GetPersonController";
import { DeleteHeroesAndVillainsController } from "../controllers/DeletePersonController";
import { UpdateHeroesAndVillainsController } from "../controllers/UpdatePersonController";
import { PrismaClient } from "@prisma/client";


export async function PersonRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {

  const prisma = new PrismaClient();

  fastify.post("/createPerson", async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateHeroesAndVillainsController(prisma).handle(request, reply);
  });

  fastify.get("/getPerson", async (request: FastifyRequest, reply: FastifyReply) => {
    return new GetHeroesAndVillainsController(prisma).handle(request,reply)
  })

  fastify.delete("/deletePerson", async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteHeroesAndVillainsController(prisma).handle(request,reply)
  })

  fastify.put("/updatePerson", async (request: FastifyRequest, reply: FastifyReply) => {
    return new UpdateHeroesAndVillainsController(prisma).handle(request,reply)
  })
}
