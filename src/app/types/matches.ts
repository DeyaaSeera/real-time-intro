export type MatcheResponse = Match[]

export interface Match {
    id: number
    createdTime: string
    startTime: string
    endTime: any
    isStarted: boolean
    isEnd: boolean
    matchData: MatchData
}

export interface MatchData {
    teams: Team[]
    location: Location
    scores: Score[]
    result: Result | any
}

export interface Team {
    name: string
    country: string
    flag: string
}

export interface Location {
    staduim: string
    country: string
}

export interface Score {
    team: string
    player: string
    time: string
    isPelenty: boolean
    isOwnGoal: boolean
}

export interface Result {
    "Real Madrid": number
    Barcelona: number
}
