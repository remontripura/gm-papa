import { z } from "zod";

export const playerIdSchema = z.object({
  player_id: z.string().min(3, "আপনার গেমের আইডি দিন"),
});
