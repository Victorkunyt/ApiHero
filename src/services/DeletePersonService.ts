import { Names } from "../types/HeroesAndVillainsTypes";
import { PrismaClient } from "@prisma/client";
import { UserExistsError } from "../error/UserExistsError";

class DeleteHeroesAndVillainsService {
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

    await this.prisma.createHeroesAndVillains.delete({
      where: {
        id: userData.id,
      },
    });
    return;
  }
}

export { DeleteHeroesAndVillainsService };
