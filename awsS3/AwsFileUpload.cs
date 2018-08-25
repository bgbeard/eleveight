using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Eleveight.Services.App;
using System;
using System.IO;

namespace Eleveight.Services.Tools
{
    public class AwsFileUpload : BaseService, IAwsFileUpload
    {
        private IAmazonS3 s3Client;
        private string bucketName;

        private RegionEndpoint bucketRegion = RegionEndpoint.USWest2;

        public string Upload(Stream stream, string fileName)
        {
            try
            {
                string awsAccessKeyId = AppSettingDictionary.Instance.appSettings["awsAccessKeyId"];
                string awsSecretAccessKey = AppSettingDictionary.Instance.appSettings["awsSecretAccessKey"];
                Guid g = Guid.NewGuid();
                string newFileName = g + "_" + fileName;
                s3Client = new AmazonS3Client(awsAccessKeyId, awsSecretAccessKey, bucketRegion);
                bucketName = AppSettingDictionary.Instance.appSettings["awsBucketName"];

                TransferUtility transferUtility = new TransferUtility(s3Client);
                transferUtility.Upload(stream, bucketName, newFileName);
                var awsFile = AppSettingDictionary.Instance.appSettings["awsFileUrl"] + newFileName;

                return awsFile;
            }
            catch (AmazonS3Exception e)
            {
                throw new Exception("Error encountered on server. Message:'{0}' when writing an object" + e.Message);
            }
            catch (Exception e)
            {
                throw new Exception("Unknown encountered on server. Message:'{0}' when writing an object" + e.Message);
            }
        }
    }
}