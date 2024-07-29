import { Body, ResponseType as TauriResponseType } from '@tauri-apps/api/http';
import buildUrl from 'build-url-ts';
import URLParse from 'url-parse';
export const base64Decode = (str) => Buffer.from(str, 'base64').toString('binary');
export const base64Encode = (str) => Buffer.from(str, 'binary').toString('base64');
export function buildBasicAuthorization(basicCredentials) {
    const username = basicCredentials.username || '';
    const password = basicCredentials.password ? encodeURIComponent(basicCredentials.password) : '';
    return {
        Authorization: `Basic ${base64Encode(`${username}:${password}`)}`,
    };
}
export function buildJWTAuthorization(jwt) {
    return {
        Authorization: `Bearer ${jwt}`,
    };
}
export function getTauriResponseType(type) {
    let responseType = TauriResponseType.JSON;
    if (type !== undefined && type !== null) {
        switch (type.toLowerCase()) {
            case 'json': {
                responseType = TauriResponseType.JSON;
                break;
            }
            case 'text': {
                responseType = TauriResponseType.Text;
                break;
            }
            default: {
                responseType = TauriResponseType.Binary;
            }
        }
    }
    return responseType;
}
export function buildTauriRequestData(data) {
    if (data === undefined || data === null) {
        return undefined;
    }
    if (typeof data === 'string') {
        return Body.text(data);
    }
    else if (typeof data === 'object') {
        return Body.json(data);
    }
    else if (data instanceof FormData) {
        // @ts-ignore
        return Body.form(data);
    }
    return Body.bytes(data);
}
export const buildRequestUrl = (config) => {
    if ((config.baseURL === undefined || config.baseURL === null || config.baseURL.trim() === '') &&
        (config.url === undefined || config.url === null || config.url.trim() === '')) {
        throw new Error('config.baseURL or config.url must be specified');
    }
    if (config.baseURL) {
        return buildUrl(config.baseURL, { path: config.url, queryParams: config.params });
    }
    const url = config.url ? config.url : '';
    let urlObj = URLParse(url, true);
    const path = urlObj.pathname === '/' ? undefined : urlObj.pathname;
    const params = urlObj.query;
    urlObj.set('pathname', '');
    urlObj.set('query', '');
    return buildUrl(urlObj.toString(), { path: path, queryParams: mergeQueryParams(params, config.params) });
};
export function mergeQueryParams(...queryParams) {
    let params = {};
    queryParams.forEach((queryParam) => Object.assign(params, queryParam));
    return Object.keys(params).length === 0 ? undefined : params;
}
