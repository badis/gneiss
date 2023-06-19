/* eslint-disable indent */
import type { Request } from 'express';
import type { IncomingMessage } from 'http';
import type { Params } from 'nestjs-pino';
import { multistream } from 'pino';
import { randomUUID } from 'crypto';

const passUrl = new Set(['/health', '/graphql']);

// this.logger.trace('trace');
// this.logger.debug('debug');
// this.logger.info('info');
// this.logger.warn('warn');
// this.logger.error('error');
// this.logger.fatal('fatal');

export const loggerOptions: Params = {
  pinoHttp: [
    {
      // https://getpino.io/#/docs/api?id=timestamp-boolean-function
      // Change time value in production log.
      // timestamp: stdTimeFunctions.isoTime,
      quietReqLogger: true,
      // Define a custom request id function
      // genReqId: function (req, res) {
      //   const existingID = req.id ?? req.headers['x-request-id'];
      //   if (existingID) return existingID;
      //   const id = randomUUID();
      //   res.setHeader('X-Request-Id', id);
      //   return id;
      // },
      ...(process.env.NODE_ENV === 'production'
        ? {}
        : {
            level: 'debug',
            // https://github.com/pinojs/pino-pretty
            transport: {
              target: 'pino-pretty',
              options: {
                sync: true,
                singleLine: true,
                colorize: true,
                levelFirst: false,
                // eslint-disable-next-line quotes
                translateTime: "yyyy-mm-dd'T'HH:MM:ss.l'Z'",
                messageFormat:
                  '{req.headers.x-correlation-id} [{context}] {msg}',
                ignore: 'pid,hostname,context,req,res',
              },
            },
          }),
      autoLogging: {
        ignore: (req: IncomingMessage) =>
          passUrl.has((<Request>req).originalUrl),
      },
    },

    multistream(
      [
        // https://getpino.io/#/docs/help?id=log-to-different-streams
        { level: 'debug', stream: process.stdout },
        { level: 'error', stream: process.stderr },
        { level: 'fatal', stream: process.stderr },
      ],
      { dedupe: true },
    ),
  ],
};
