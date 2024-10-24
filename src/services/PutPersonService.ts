import { Names } from "../types/HeroesAndVillainsTypes";
import { PrismaClient } from "@prisma/client";
import { UserExistsError } from "../error/UserExistsError";

class UpdateHeroesAndVillainsService {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(userData: Names) {

    const VerificationId = await this.prisma.createHeroesAndVillains.findUnique(
        {
          where: {
            id: userData.id,
          },
        }
      );
      if (!VerificationId) {
        throw new UserExistsError("Id Doesn't exist in DataBase");
      }
      
    const verificationName = await this.prisma.createHeroesAndVillains.findFirst(
      {
        where: {
          name: userData.name,
        },
      }
    );

    if (verificationName && verificationName.id !== userData.id) {
      // Se o nome já existe e pertence a outro usuário, lançar exceção
      throw new UserExistsError('User with this name exists in database');
    }

    const UpdateHero = await this.prisma.createHeroesAndVillains.update({
      where: {
        id: userData.id,
      },
      data: {
        name: userData.name,
        level: userData.level,
        type: userData.type,
        element: userData.element,
        boss: userData.boss,
      },
    });

    return UpdateHero;
  }
}

export { UpdateHeroesAndVillainsService };
