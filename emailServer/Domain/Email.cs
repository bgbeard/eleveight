using System.Collections.Generic;

namespace Eleveight.Models.Domain.Tools
{
    public class Email
    {
        public List<MessageAddress> To { get; set; }
        public string FromAddress { get; set; }
        public string FromName { get; set; }
        public string Subject { get; set; }
        public string PlainTextBody { get; set; }
        public string HtmlBody { get; set; }
    }
}