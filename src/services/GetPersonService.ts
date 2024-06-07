import { PrismaClient } from "@prisma/client";

class GetHeroesAndVillainsService {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute() {
    const GetAll = await this.prisma.createHeroesAndVillains.findMany({});

    return GetAll;
  }
}

export { GetHeroesAndVillainsService };
