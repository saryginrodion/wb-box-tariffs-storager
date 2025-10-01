import pino from "pino"

export type LoggerInfo = {
    from: string,
}

export const newLogger = (loggerInfo: LoggerInfo): pino.Logger => {
    return pino().child(loggerInfo)
}
