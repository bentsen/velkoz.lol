export function calcKDA(k: number, d: number, a: number) {
	if (d == 0) return k;
	const kda = (k + a) / d;
	return kda.toFixed();
}