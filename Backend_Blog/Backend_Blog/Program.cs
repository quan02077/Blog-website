using Backend_Blog.Data;
using Backend_Blog.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using CloudinaryDotNet;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173").
        AllowAnyHeader().
        AllowAnyMethod().
        AllowCredentials();
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["AppSettings:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["AppSettings:Audience"],
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:Token"]!)),
            ValidateIssuerSigningKey = true
        };
    });

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<IUploadPhotoService, UploadPhotoService>();

builder.Services.AddDbContext<MyBlogContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var cloudName = builder.Configuration["CloudinarySettings:CloudName"];
var apiKey = builder.Configuration["CloudinarySettings:ApiKey"];   
var apiSecret = builder.Configuration["CloudinarySettings:ApiSecret"];

var cloudinary = new Cloudinary(new Account(cloudName, apiKey, apiSecret));

builder.Services.AddSingleton(cloudinary);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowReact");
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
