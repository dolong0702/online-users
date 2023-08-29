using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Threading.Tasks;
namespace onlineUsers
{
    public class MiddlewareAddCookies
    {
        private readonly RequestDelegate _next;
        private readonly string _cookieName;
        private readonly int _lastActivityMinutes = 20;

        public MiddlewareAddCookies(RequestDelegate next, string cookieName = "UserGuid", int lastActivityMinutes = 20)
        {
            _next = next;
            _cookieName = cookieName;
            _lastActivityMinutes = lastActivityMinutes;
        }

        public Task InvokeAsync(HttpContext context, IMemoryCache memoryCache)
        {
            // Kiểm tra xem cookie đã được gửi từ client hay chưa
            var userGuidCookie = context.Request.Cookies["UserGuid"];
            if (string.IsNullOrEmpty(userGuidCookie))
            {
                // Nếu cookie không tồn tại, thêm cookie mới vào phản hồi
                var userGuid = Guid.NewGuid().ToString();
                context.Response.Cookies.Append(_cookieName, userGuid, new CookieOptions { HttpOnly = true, MaxAge = TimeSpan.FromDays(30) });
            }

            // Chuyển yêu cầu cho middleware tiếp theo trong pipeline
            return _next(context);
        }
    }
}
