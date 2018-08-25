using Eleveight.Models.Domain.Tools;
using Eleveight.Services.App;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Eleveight.Services.Tools
{
    public class GmailMessenger : IEmailMessenger
    {
        private EmailValidation validate = new EmailValidation();

        public async Task<string> SendMail(Email email)
        {
            string gmailSmtp = AppSettingDictionary.Instance.appSettings["gmailSmtp"];
            int gmailSmtpPort = Int32.Parse(AppSettingDictionary.Instance.appSettings["gmailSmtpPort"]);
            string gmailAccount = AppSettingDictionary.Instance.appSettings["gmailAccount"];
            string gmailPassword = AppSettingDictionary.Instance.appSettings["gmailPassword"];

            EmailValidation validate = new EmailValidation();
            if (!validate.ValidateMessage(email) && !validate.IsValidEmail(email.To[0].Email))
            {
                return "Message not sent: invalid message";
            }
            else
            {
                var client = new SmtpClient(gmailSmtp, gmailSmtpPort)
                {
                    Credentials = new NetworkCredential
                (gmailAccount, gmailPassword),
                    EnableSsl = true
                };
                client.Send(gmailAccount, email.To[0].Email, email.Subject, email.PlainTextBody);
                return await Task.FromResult("Message sent");
            }
        }

        public async Task<string> SendMailList(Email email)
        {
            string gmailSmtp = AppSettingDictionary.Instance.appSettings["gmailSmtp"];
            int gmailSmtpPort = Int32.Parse(AppSettingDictionary.Instance.appSettings["gmailSmtpPort"]);
            string gmailAccount = AppSettingDictionary.Instance.appSettings["gmailAccount"];
            string gmailPassword = AppSettingDictionary.Instance.appSettings["gmailPassword"];

            if (!validate.ValidateMessage(email))
            {
                return "Message not sent: invalid message";
            }
            else
            {
                var client = new SmtpClient(gmailSmtp, gmailSmtpPort)
                {
                    Credentials = new NetworkCredential(gmailAccount, gmailPassword),
                    EnableSsl = true
                };
                List<string> exceptionList = new List<string>();
                int i = 0;
                foreach (MessageAddress address in email.To)
                {
                    if (validate.IsValidEmail(address.Email))
                    {
                        client.Send(gmailAccount, email.To[i].Email, email.Subject, email.PlainTextBody);
                    }
                    else
                    {
                        exceptionList.Add(address.Name);
                    }
                    i++;
                }
                Console.WriteLine(exceptionList);
                return await Task.FromResult("Message Sent");
            }
        }
    }
}