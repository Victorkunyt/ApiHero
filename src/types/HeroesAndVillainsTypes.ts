import Joi from "joi";

interface Names {
  id?: string;
  name: string;
  level: number;
  type: string;
  element: string;
  boss: boolean;
}

const createHeroesAndVillainsSchema = Joi.object({
  name: Joi.string().required(),
  level: Joi.number().integer().min(1).required(),
  type: Joi.string().valid('hero', 'villain').insensitive().required(),
  element: Joi.string().valid('Earth','Fire','Air','water').insensitive().required(),
  boss: Joi.boolean().required(),
});

const updateHeroesAndVillainsSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
  name: Joi.string().required(),
  level: Joi.number().integer().min(1).required(),
  type: Joi.string().valid('hero', 'villain').insensitive().required(),
  element: Joi.string().valid('Earth','Fire','Air','water').insensitive().required(),
  boss: Joi.boolean().required(),
});

const deleteHeroesAndVillainsSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
});

export { Names, createHeroesAndVillainsSchema, updateHeroesAndVillainsSchema,deleteHeroesAndVillainsSchema};
