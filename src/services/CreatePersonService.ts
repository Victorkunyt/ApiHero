import { Names } from "../types/HeroesAndVillainsTypes";
import { PrismaClient } from "@prisma/client";
import { UserExistsError } from "../error/UserExistsError";

class CreateHeroesAndVillainsService {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(userData: Names) {
    const verificationName = await this.prisma.createHeroesAndVillains.findMany({
      where: {
        name: userData.name,
      },
    });

    if (verificationName.length > 0) {
      throw new UserExistsError('User with this name exists in database');
    }
  
    const createHero = await this.prisma.createHeroesAndVillains.create({
      data: {
        name: userData.name,
        level: userData.level,
        type: userData.type,
        element: userData.element,
        boss: userData.boss,
      },
    });

    return createHero;
  }
}

export { CreateHeroesAndVillainsService };
