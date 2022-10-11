import { initTRPC, TRPCError } from '@trpc/server';

// Avoid exporting the entire t-object since it's not very
// descriptive and can be confusing to newcomers used to t
// meaning translation in i18n libraries.
const t = initTRPC.create();

// Base router and procedure helpers
export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;

// If you have authentication you can create protected procedures
// NOTE: Below is just an example
/**
export const authedProcedure = t.procedure.use(({ ctx, next}) => {
	if (!ctx.session) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}
	// Express-compliant `next` method
	return next({
		ctx: {
			// explicitly passing `session` infers the value as non-nullable to the next middleware or resolve function
			session: ctx.session,
		},
	});
});
 */
