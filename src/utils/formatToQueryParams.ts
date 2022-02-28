
export const formatToQueryParams = <T = any>(obj: T): string => {
    let params: Array<string> = [];

    for (let key in obj) {
        params = [
            ...params,
            `${key}=${obj[key]}`
        ]
    }

    return params.join('&');
}
