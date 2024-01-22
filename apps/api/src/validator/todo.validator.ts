// Zod
import { z } from 'zod';

// Middleware
import validatorHandler from '../middleware/validator.handler';

export const todoValidator = (req, res, next) => {
  const schema = z.object({
    title: z.string(),
    status: z.boolean().default(false)
  })
  validatorHandler(schema, req, res, next)
}
