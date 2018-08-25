using Eleveight.Models.Domain.Tools;
using Eleveight.Services.App;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Eleveight.Services.Tools
{
    public class EmailMessenger : IEmailMessenger
    {
        private EmailValidation validate = new EmailValidation();
        AppSettingService _appSettingService = new AppSettingService();

        public async Task<string> SendMail(Email email)
        {
            try
            {
                if (validate.ValidateMessage(email) && validate.IsValidEmail(email.To[0].Email))
                {
                    var apiKey = AppSettingDictionary.Instance.appSettings["sendGridApi"];

                    var client = new SendGridClient(apiKey);
                    var msg = new SendGridMessage()
                    {
                        From = new EmailAddress(email.FromAddress, email.FromName),
                        Subject = email.Subject,
                        PlainTextContent = email.PlainTextBody,
                        HtmlContent = email.HtmlBody
                    };
                    msg.AddTo(email.To[0].Email, email.To[0].Name);
                    var response = await client.SendEmailAsync(msg);
                    return response.StatusCode.ToString();
                }
                else
                {
                    throw new Exception("Message not sent: invalid message");
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        public async Task<string> SendMailList(Email email)
        {
            try
            {
                if (validate.ValidateMessage(email))
                {
                    var apiKey = AppSettingDictionary.Instance.appSettings["sendGridApi"];
                    var client = new SendGridClient(apiKey);
                    List<EmailAddress> list = new List<EmailAddress>();
                    List<string> exceptionList = new List<string>();
                    await Task.Run(() => Parallel.ForEach(email.To, (toEmail) =>
                    {
                        if (validate.IsValidEmail(toEmail.Email))
                        {
                            var msg = new SendGridMessage()
                            {
                                From = new EmailAddress(email.FromAddress, email.FromName),
                                Subject = email.Subject,
                                PlainTextContent = email.PlainTextBody,
                                HtmlContent = email.HtmlBody
                            };
                            msg.AddTo(toEmail.Email, toEmail.Name);
                            client.SendEmailAsync(msg);
                        }
                        else
                        {
                            exceptionList.Add(toEmail.Name);
                        }
                    }));

                    return "Messages sent";
                }
                else
                {
                    throw new Exception("Message not sent: invalid message");
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
    }
}