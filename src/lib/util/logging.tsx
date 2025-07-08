export async function log(message: string, level: 'info' | 'warn' | 'error' = 'info', detail: string) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message} | ${detail}`;
    console.log(logMessage);
}
    // Here you could also send logs to an external service if needed
    // e.g., using fetch to send to a logging API
    // await fetch('/api/logs', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ message: logMessage, level }),
    // });