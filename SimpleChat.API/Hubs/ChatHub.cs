using Microsoft.AspNetCore.SignalR;
using SimpleChat.API.Configurations;
using SimpleChat.API.Models;

namespace SimpleChat.API.Hubs;

public class ChatHub : Hub
{
    private ILogger<ChatHub> _logger;

    public ChatHub(ILogger<ChatHub> logger)
    {
        _logger = logger;
    }

    public async Task SendMessage(SendMessageRequest request)
    {
        await Clients.All.SendAsync(ClientEndpoints.ReceiveMessageEndpoint, new ReceiveMessageResponse()
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