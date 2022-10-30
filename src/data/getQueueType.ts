const queues = new Map<number, string>([
	[400, "Draft Pick"],
	[420, "Ranked Solo"],
	[430, "Blind Pick"],
	[440, "Ranked Flex"],
	[450, "ARAM"],
])

export default function getQueueType(queueId: number): string {
	return queues.get(queueId) ?? "Invalid";
}