import {publicProcedure, router} from "@/server/trpc";
import {z} from "zod";
import {prisma} from "@/server/util/prisma";
import axios from "axios";
import {ISummoner} from "@/utils/@types/summoner.t";

export const matchRouter = router({
})