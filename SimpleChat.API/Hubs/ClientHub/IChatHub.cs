using SimpleChat.API.Models;

namespace SimpleChat.API.Hubs.ClientHub;

public interface IChatHub
{
    Task ReceiveMessage(ReceiveMessageResponse receiveMessageResponse);
}