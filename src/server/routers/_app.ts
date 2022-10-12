import { router, publicProcedure } from '../trpc';
import {summonerRouter} from "./lol/summonerRouter";
import * as trpc from "@trpc/server"
import {matchRouter} from "@/server/routers/lol/matchRouter";


export const appRouter = router({
	summoner: summonerRouter,
	match: matchRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;