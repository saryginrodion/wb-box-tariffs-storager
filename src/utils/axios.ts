import { AxiosInstance } from "axios"
import axiosRetry, { IAxiosRetryConfig } from "axios-retry"

const defaultRetryConfig: IAxiosRetryConfig = {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
}

export const addRetries = (axios: AxiosInstance, retryConfig: IAxiosRetryConfig) => {
    const cfg = {...defaultRetryConfig, ...retryConfig};
    axiosRetry(axios, cfg);
}
