using Backend_Blog.Data;
using Backend_Blog.Entities;
using Backend_Blog.Models;
using Backend_Blog.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend_Blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDTO request)
        {
            var result = await authService.RegisterAsync(request);
            if (result is null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDTO request)
        {
            var result = await authService.LoginAsync(request);
            if (result is null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }   
    }
}
