using System;

namespace Eleveight.Models.Domain.App
{
    public class AppLog
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public int AppLogTypeId { get; set; }
        public string TypeName { get; set; }
        public int UserBaseId { get; set; }
        public int PageCount { get; set; }
        public DateTime DateCreated { get; set; }
        public string FullName { get; set; }
    }
}