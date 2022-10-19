import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/future/image";
import Container from "../../../../components/Container";
import { trpc } from "@/utils/trpc";
import { useContext } from "react";
import { VersionContext } from "@/data/VersionContext";
import { TMatch, TMatches } from "@/server/routers/lol/matchRouter";
import { TSummoner } from "@/server/routers/lol/summonerRouter";
import { ChampionContext } from "@/data/ChampionContext";
import { formatTime } from "@/utils/formatTime";
import { convertLaneName } from "@/utils/lanePosition";
import { ItemContext } from "@/data/ItemContext";
import { useItem } from "@/hooks/useItem";
import { LeagueIcon } from "@/components/LeagueHoverIcon/LeagueIcon";
import LeagueHoverIcon from "@/components/LeagueHoverIcon";
import { calcChampFreq, calcKDA, calcWinRate } from "@/utils/calcMatchInfo";
import Link from "next/link";
import { useSummonerSpell } from "@/hooks/useSummonerSpell";
import { RiCopperCoinLine } from "react-icons/ri";

const SummonerPage: NextPage = () => {
  const version = useContext(VersionContext);
  const router = useRouter();
  const region = router.query.region as string;
  const summonerName = router.query.summonerName as string;

  const summoner = trpc.summoner.byName.useQuery({
    name: summonerName,
    region: region,
  });
  const mutateSummoner = trpc.summoner.update.useMutation({
    onSuccess: async () => {
      await summoner.refetch();
    },
  });

  const matches = trpc.match.getMatches.useQuery({
    name: summonerName,
    region: region,
  });
  const mutateMatch = trpc.match.update.useMutation({
    onSuccess: async () => {
      await matches.refetch();
    },
  });

  const handleUpdate = async () => {
    mutateMatch.mutate({ name: summonerName, region: region });
    mutateSummoner.mutate({ name: summonerName, region: region });
  };

  return (
    <Container>
      <SummonerHeader
        summoner={summoner.data}
        handleUpdate={handleUpdate}
        isLoading={mutateSummoner.isLoading}
      />
      {summoner.data && (
        <div className={"flex flex-row"}>
          <MatchHistory summoner={summoner.data} matches={matches.data} />
        </div>
      )}
    </Container>
  );
};

const SummonerHeader = ({
  summoner,
  handleUpdate,
  isLoading,
}: {
  summoner: TSummoner | undefined;
  handleUpdate: () => void;
  isLoading: boolean;
}) => {
  const version = useContext(VersionContext);
  const date = new Date(summoner ? summoner.lastUpdated : Date.now());
  const lastUpdated = formatTime(date.getTime());

  return (
    <>
      <header className={"py-6 flex flex-row w-full"}>
        {!summoner ? (
          <>
            <div className={"block"}>
              <div
                className={
                  "relative border-2 border-neutral-900 bg-neutral-800 rounded-2xl w-24 h-24"
                }
              />
            </div>
          </>
        ) : (
          <>
            <div className={"block"}>
              <Avatar
                img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.profileIconId}.png`}
                lvl={summoner.summonerLevel}
              />
            </div>
            <div className={"flex flex-col ml-4"}>
              <h2 className={"text-white font-bold text-4xl"}>
                {summoner.name}
              </h2>
              <div className={"flex justify-start mt-4"}>
                <button
                  className={
                    "bg-neutral-900 text-white rounded-2xl px-4 py-2 outline-none border-2 border-neutral-900 hover:border-neutral-700 focus:border-neutral-700 transition-all duration-100"
                  }
                  onClick={handleUpdate}
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
              </div>
              {summoner.lastUpdated && (
                <p className={"text-sm text-neutral-700 font-semibold"}>
                  {lastUpdated}
                </p>
              )}
            </div>
          </>
        )}
      </header>
    </>
  );
};

const MatchHistory = ({
  summoner,
  matches,
}: {
  summoner: TSummoner;
  matches: TMatches | undefined;
}) => {
  if (!matches) return <div>Loading...</div>;
  const sortedMatches = matches?.sort(
    (a, b) =>
      parseInt(b.info!.gameEndTimestamp) - parseInt(a.info!.gameEndTimestamp)
  );
  const times = 20;
  const champFreq = calcChampFreq(summoner?.puuid, matches, times);
  const [wins, loses] = calcWinRate(summoner?.puuid, matches, times);
  return (
    <>
      <div className={"w-full flex flex-col"}>
        <div className={"bg-neutral-900 mb-2 rounded-xl"}>
          <div
            className={"flex flex-row justify-between items-center px-7 py-2"}
          >
            <div className={"inline-block"}>
              <p>Last {times} games</p>
              <p>
                {wins}W-{loses}L
              </p>
            </div>
            <div className={"flex flex-row gap-4"}>
              {champFreq?.map((c) => (
                <div key={c.champId} className={"flex flex-col"}>
                  <p>
                    {c.name} {c.played}
                  </p>
                  <p>
                    {c.wins}W - {c.played - c.wins}L
                  </p>
                  <p>{calcKDA(c.kills, c.deaths, c.assists)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={"rounded-xl bg-neutral-900 overflow-auto"}>
          {sortedMatches.map((match) => (
            <Match key={match.matchId} match={match} summoner={summoner} />
          ))}
        </div>
      </div>
    </>
  );
};

const Match = ({ match, summoner }: { match: TMatch; summoner: TSummoner }) => {
  const champContext = useContext(ChampionContext);
  if (!match || !match.info || !match.metaData || !summoner)
    return <div>Loading...</div>;

  const sumInfo = match.info.participants.find(
    (e) => e.puuid == summoner?.puuid
  );
  const win = sumInfo?.win;
  const winBorder = win ? "border-blue-400" : "border-red-500";
  const winText = win ? "text-blue-400" : "text-red-500";
  const timeSince = formatTime(match.info.gameEndTimestamp);
  const lane = convertLaneName(sumInfo?.individualPosition ?? "Invalid");

  const champ = champContext?.find(
    (c) => parseInt(c.key) == sumInfo?.championId
  );
  return (
    <>
      <Link href={"/"} passHref>
        <div
          className={`w-full bg-neutral-900 active:bg-neutral-800 hover:bg-neutral-800 border-l-8 ${winBorder} cursor-pointer transition-all duration-100`}
        >
          <div className={"flex flex-col px-4 border-b border-b-neutral-800"}>
            <div className={"mx-2 flex flex-row items-center justify-between"}>
              <h2 className={`text-2xl font-bold ${winText}`}>
                {win ? "Victory" : "Defeat"}
              </h2>
              <div
                className={
                  "flex flex-row text-neutral-500 font-semibold items-center justify-end gap-2"
                }
              >
                <div className={"w-4 h-4 relative"}>
                  <Image
                    src={lane.imgUrl}
                    alt={lane.role}
                    fill
                    sizes={"16px"}
                  />
                </div>
                <p>{lane.role}</p>
                <p> • </p>
                <p>{timeSince}</p>
              </div>
            </div>
            <div className={"flex flex-row px-2 py-4"}>
              <div
                className={"w-16 h-16 relative rounded-xl overflow-hidden mx-2"}
              >
                {champ ? (
                  <Image
                    src={champ ? champ.image.sprite : ""}
                    alt={`Image of ${champ?.name}`}
                    className={"scale-[1.1]"}
                    fill
                    sizes={"128px"}
                  />
                ) : (
                  <div className={"bg-neutral-900 w-full h-full"} />
                )}
              </div>
              <div className={"flex flex-col pr-2 gap-1.5"}>
                <SumSpellIcon spellId={sumInfo?.summoner1Id} />
                <SumSpellIcon spellId={sumInfo?.summoner2Id} />
              </div>

              <div className={"flex flex-col"}>
                <div className={"text-neutral-500"}>
                  <h3 className={"text-md font-semibold"}>
                    {calcKDA(sumInfo!.kills, sumInfo!.deaths, sumInfo!.assists)}{" "}
                    KDA
                  </h3>
                  <p>
                    {sumInfo?.kills}/{sumInfo?.deaths}/{sumInfo?.assists}
                  </p>
                </div>
                <div className={"flex flex-row items-end gap-1.5"}>
                  <ItemIcon itemId={sumInfo?.item0} />
                  <ItemIcon itemId={sumInfo?.item1} />
                  <ItemIcon itemId={sumInfo?.item2} />
                  <ItemIcon itemId={sumInfo?.item3} />
                  <ItemIcon itemId={sumInfo?.item4} />
                  <ItemIcon itemId={sumInfo?.item5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

const ItemIcon = ({ itemId }: { itemId: number | undefined }) => {
  const item = useItem(itemId);

  return (
    <LeagueHoverIcon img={item?.image.full}>
      {item && (
        <>
          <div className={"flex flex-row max-w-sm"}>
            <LeagueIcon img={item.image.full} />
            <div className={"flex flex-col pl-4"}>
              <h2 className={"font-bold"}>{item.name}</h2>
              <span className={"inline-flex items-center"}>
                <RiCopperCoinLine className={"fill-yellow-500 mr-2"} />{" "}
                {item?.gold.total}
              </span>
            </div>
          </div>
          <div
            className={"pt-3 item-parser"}
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </>
      )}
    </LeagueHoverIcon>
  );
};

const SumSpellIcon = ({ spellId }: { spellId: number | undefined }) => {
  const sumSpell = useSummonerSpell(spellId);
  return (
    <LeagueHoverIcon img={sumSpell?.image.full}>
      <div className={"flex flex-row max-w-sm"}>
        <LeagueIcon img={sumSpell?.image.full} />
        <div className={"flex flex-col pl-4"}>
          <h2 className={"font-bold text-md"}>{sumSpell?.name}</h2>
          <p className={"text-neutral-400"}>{sumSpell?.description}</p>
        </div>
      </div>
    </LeagueHoverIcon>
  );
};

const Avatar = ({ img, lvl }: { img: string; lvl: number }) => {
  return (
    <div className={"relative"}>
      <div
        className={
          "absolute flex justify-center items-center border-2 border-neutral-800 z-10 -bottom-4 left-1/2 -translate-x-1/2 bg-brand text-white rounded-2xl px-2"
        }
      >
        {lvl}
      </div>
      <div
        className={
          "relative border-2 border-neutral-800 rounded-2xl overflow-hidden"
        }
      >
        <div className={"w-24 h-24 flex-shrink-0"}>
          <Image src={img} alt={`Profile icon`} fill priority />
        </div>
      </div>
    </div>
  );
};

export default SummonerPage;
