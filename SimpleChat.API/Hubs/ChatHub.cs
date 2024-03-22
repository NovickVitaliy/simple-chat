using Microsoft.AspNetCore.SignalR;
using SimpleChat.API.Hubs.ClientHub;
using SimpleChat.API.Models;

namespace SimpleChat.API.Hubs;

public class ChatHub : Hub<IChatHub>
{
    private readonly ILogger<ChatHub> _logger;

    public ChatHub(ILogger<ChatHub> logger)
    {
        _logger = logger;
    }

    public async Task SendMessage(SendMessageRequest request)
    {
        await Clients.All.ReceiveMessage(new ReceiveMessageResponse()
        {
            Author = request.Username,
            Message = request.Message
        });
    }

    public override Task OnConnectedAsync()
    {
        _logger.LogInformation($"User connected with id of: {Context.ConnectionId}");
        return base.OnConnectedAsync();
    }
}