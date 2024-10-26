import { PrismaClient } from "@prisma/client";
import { MessageInformation } from "../error/UserMessageInformation";
class GetHeroesAndVillainsService {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute() {
    const GetAll = await this.prisma.createHeroesAndVillains.findMany({});

    if (GetAll.length === 0) {
         throw new MessageInformation('No characters registered')
    }                                  
    return GetAll;
  }
}

export { GetHeroesAndVillainsService };
