import { router, publicProcedure } from '../trpc';
import {summonerRouter} from "./summonerRouter";

export const appRouter = router({
	summoner: summonerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;