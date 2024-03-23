using Microsoft.AspNetCore.SignalR;
using SimpleChat.API.Hubs.ClientHub;
using SimpleChat.API.Models;

namespace SimpleChat.API.Hubs;

public class ChatHub : Hub<IChatHub>
{
    private readonly ILogger<ChatHub> _logger;
    private static int _usersCount;

    public ChatHub(ILogger<ChatHub> logger)
    {
        _logger = logger;
    }

    public async Task SendMessage(SendMessageRequest request)
    {
        await Clients.All.ReceiveMessage(new ReceiveMessageResponse()
        {
            Author = request.Username,
            Message = request.Message,
            Type = MessageType.Message
        });
    }

    public override async Task OnConnectedAsync()
    {
        _logger.LogInformation($"User connected with id of: {Context.ConnectionId}");
        _usersCount++;
        await Clients.All.UpdateUserCount(_usersCount);
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        _logger.LogInformation($"User disconnected with id of: {Context.ConnectionId}");
        _usersCount--;
        Clients.All.UpdateUserCount(_usersCount);
    }
}