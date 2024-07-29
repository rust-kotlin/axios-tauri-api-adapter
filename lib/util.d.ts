import { Body, ResponseType as TauriResponseType } from '@tauri-apps/api/http';
import { AxiosBasicCredentials, ResponseType as AxiosResponseType } from 'axios';
import { IQueryParams } from 'build-url-ts';
import { Authorization, TauriAxiosRequestConfig } from './type';
export declare const base64Decode: (str: string) => string;
export declare const base64Encode: (str: string) => string;
export declare function buildBasicAuthorization(basicCredentials: AxiosBasicCredentials): Authorization;
export declare function buildJWTAuthorization(jwt: string): Authorization;
export declare function getTauriResponseType(type?: AxiosResponseType): TauriResponseType;
export declare function buildTauriRequestData(data?: any): Body | undefined;
export declare const buildRequestUrl: (config: Omit<TauriAxiosRequestConfig, 'headers'>) => string;
export declare function mergeQueryParams(...queryParams: IQueryParams[]): IQueryParams | undefined;