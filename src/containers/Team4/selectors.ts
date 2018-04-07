import { createSelector } from 'reselect';

const httpDataFilter = (state: any) => state.team4HttpQuery.httpDataFilter;
const httpData = (state: any) => state.team4HttpQuery.httpData;

export const getShownHttpData = createSelector(
    [ httpDataFilter, httpData ],
    (httpDataFilter: string, httpData: Array<string>) => {
        switch (httpDataFilter) {
            case 'ALL':
                return httpData;
            case 'EVEN':
                return httpData.filter((data, index) => {
                    console.log("[even in selector] judge will display");
                    return index % 2 === 0;
                });
            case 'ODD':
                return httpData.filter((data, index) => {
                    return index % 2 === 1;
                });
        }
    }
)
