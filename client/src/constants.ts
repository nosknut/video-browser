const SERVER_PORT = 8000;

export const CONSTANTS = {
    API_URL: location.origin.replace(location.port, String(SERVER_PORT)),
}