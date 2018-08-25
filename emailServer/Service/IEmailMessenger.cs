using Eleveight.Models.Domain.Tools;
using System.Threading.Tasks;

namespace Eleveight.Services.Tools
{
    public interface IEmailMessenger
    {
        Task<string> SendMail(Email email);

        Task<string> SendMailList(Email email);
    }
}