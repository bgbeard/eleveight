using Eleveight.Models.Domain.App;
using Eleveight.Models.Requests.App;
using Eleveight.Services.Tools;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Eleveight.Services.App
{
    public class AppLogService : BaseService, IAppLogService
    {
        public List<AppLog> ReadAll(int pageSize, int pageNumber, int appLogTypeId)
        {
            List<AppLog> list = new List<AppLog>();

            DataProvider.ExecuteCmd("dbo.AppLog_SelectAll",
                inputParamMapper: (SqlParameterCollection inputs) =>
                {
                    inputs.AddWithValue("@PageSize", pageSize);
                    inputs.AddWithValue("@PageNumber", pageNumber);
                    inputs.AddWithValue("@AppLogTypeId", appLogTypeId);
                }, singleRecordMapper: (IDataReader reader, short resultSet) =>
                 {
                     list.Add(DataMapper<AppLog>.Instance.MapToObject(reader));
                 });

            return list;
        }

        public AppLog ReadById(int id)
        {
            AppLog appLog = new AppLog();
            DataProvider.ExecuteCmd("dbo.AppLog_SelectById",
                inputParamMapper: (SqlParameterCollection inputs) =>
                {
                    inputs.AddWithValue("@Id", id);
                },
                singleRecordMapper: (IDataReader reader, short resultSet) =>
                {
                    appLog = DataMapper<AppLog>.Instance.MapToObject(reader);
                });

            return appLog;
        }

        public int Insert(AppLogAddRequest model)
        {
            int returnValue = 0;

            DataProvider.ExecuteNonQuery("dbo.AppLog_Insert",
                inputParamMapper: (SqlParameterCollection inputs) =>
                {
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@Title", model.Title, SqlDbType.NVarChar, 150));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@Message", model.Message, SqlDbType.NVarChar, 4000));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@StackTrace", model.StackTrace, SqlDbType.NVarChar, 4000));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@AppLogTypeId", model.AppLogTypeId, SqlDbType.Int));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@UserBaseId", model.UserBaseId, SqlDbType.Int));
                    inputs.Add(SqlDbParameter.Instance.BuildParameter("@Id", 0, SqlDbType.Int, paramDirection: ParameterDirection.Output));
                },
                returnParameters: (SqlParameterCollection inputs) =>
                {
                    int.TryParse(inputs["@Id"].Value.ToString(), out returnValue);
                });

            return returnValue;
        }
    }
}