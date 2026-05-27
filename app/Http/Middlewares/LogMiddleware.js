import fs from 'fs';
import path from 'path';

export default function LogMiddleware(request, response, next) {
    const route = request.originalUrl.split('?')[0];
    const log = `[${new Date().toISOString()}] ${request.method} :: ${route}`;
    const logsDir = path.resolve(process.cwd(), 'storage', 'logs');
    const logFile = path.join(logsDir, 'log.txt');

    console.log(log);

    fs.mkdir(logsDir, { recursive: true }, (mkdirError) => {
        if (mkdirError) {
            console.error(mkdirError);
            return next();
        }

        fs.appendFile(logFile, `${log}\n`, (appendError) => {
            if (appendError) {
                console.error(appendError);
            }

            return next();
        });
    });
}
