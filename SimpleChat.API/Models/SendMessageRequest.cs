namespace SimpleChat.API.Models;

public class SendMessageRequest
{
    public string Username { get; set; } = string.Empty;
    public string Message { get; set; } = String.Empty;
}