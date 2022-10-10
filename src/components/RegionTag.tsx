interface IRegion {
	short: string,
	long: string,
	color: string,
	keyValue: string,
}
const RegionTag = (region: IRegion) => {
	return (
		<div className={"px-2"}>
			<div className={`text-white text-base font-bold px-2 py-1 rounded-xl ${region.color}`}>
				<p>
					{region.short}
				</p>
			</div>
		</div>
	)
}

export default RegionTag