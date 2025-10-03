import env from "#config/env/env.js"
import pino from "pino"

export type LoggerInfo = {
    from: string,
}

export const newLogger = (loggerInfo: LoggerInfo): pino.Logger => {
    return pino({
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
            },
        },
        level: env.NODE_ENV != "production" ? "debug" : "info",
    }).child(loggerInfo)
}
