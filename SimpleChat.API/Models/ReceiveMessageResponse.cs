namespace SimpleChat.API.Models;

public class ReceiveMessageResponse
{
    public string Author { get; set; } = String.Empty;
    public string Message { get; set; } = String.Empty;
    public MessageType Type { get; set; }
}