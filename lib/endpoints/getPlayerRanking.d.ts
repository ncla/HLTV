import { PlayerRanking } from '../models/PlayerRanking';
import { MatchType } from '../enums/MatchType';
import { RankingFilter } from '../enums/RankingFilter';
import { Map } from '../enums/Map';
import { HLTVConfig } from '../config';
import { BestOfFilter } from '../enums/BestOfFilter';
export declare const getPlayerRanking: (config: HLTVConfig) => ({ startDate, endDate, matchType, rankingFilter, maps, minMapCount, country, bestOfX }: {
    startDate?: string | undefined;
    endDate?: string | undefined;
    matchType?: MatchType | undefined;
    rankingFilter?: RankingFilter | undefined;
    maps?: Map[] | undefined;
    minMapCount?: number | undefined;
    country?: string[] | undefined;
    bestOfX?: BestOfFilter | undefined;
}) => Promise<PlayerRanking[]>;
