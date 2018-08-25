using Eleveight.Services;
using Eleveight.Services.App;
using Eleveight.Services.Tools;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Eleveight.Web.Controllers.Api.Utilities
{
    [RoutePrefix("api/awsFileUpload")]
    public class AwsFileUploadController : ApiController
    {
        private IAwsFileUpload _awsFileUpload;
        private IAppLogService _appLogService;
        private IUserService _userService;

        public AwsFileUploadController(IAwsFileUpload awsFileUpload, IAppLogService appLogService, IUserService userService)
        {
            _awsFileUpload = awsFileUpload;
            _appLogService = appLogService;
            _userService = userService;
        }

        [Route(), HttpPost]
        public HttpResponseMessage Upload()
        {
            var httpRequest = HttpContext.Current.Request;

            HttpPostedFile file = httpRequest.Files["img"];

            var URL = _awsFileUpload.Upload(file.InputStream, file.FileName);

            return Request.CreateResponse(URL);
        }
    }
}