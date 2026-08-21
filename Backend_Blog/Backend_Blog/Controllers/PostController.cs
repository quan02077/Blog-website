using Backend_Blog.Data;
using Backend_Blog.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend_Blog.Controllers
{
    public class PostController(IPostService postService, MyBlogContext context) : Controller
    {
        public async Task<IActionResult> get
        {
            return View();
        }
    }
}
