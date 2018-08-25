import apiExecute from "../common/apiExecute";

const baseUrl = "/"

const GetLogs = (pageSize, pageNumber, appLogTypeId) => {
    return apiExecute(`${baseUrl}api/app/appLogs/${pageSize}/${pageNumber}/${appLogTypeId}`, 'GET', null);
}

const GetLogById = (id) => {
    return apiExecute(`${baseUrl}api/app/appLogs/${id}`, 'GET', null);
}

export const LogApi = {
    GetLogs,
    GetLogById
}