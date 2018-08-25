using Eleveight.Models.Domain.Tools;

namespace Eleveight.Services.Tools
{
    public class EmailValidation
    {
        public bool IsValidEmail(string email)
        {
            if (email == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public bool ValidateMessage(Email email)
        {
            if (!IsValidEmail(email.FromAddress))
            {
                return false;
            }
            else if (email.Subject == null)
            {
                return false;
            }
            else if (email.PlainTextBody == null && email.HtmlBody == null)
            {
                return false;
            }
            return true;
        }
    }
}