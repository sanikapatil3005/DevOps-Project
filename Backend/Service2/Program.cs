var builder = WebApplication.CreateBuilder(args);

// ✅ Enable CORS (frontend connect karne ke liye)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

// ✅ Use CORS
app.UseCors("AllowAll");

// ❌ HTTPS redirection hata diya (EC2/Docker me issue deta hai)
// app.UseHttpsRedirection();

// ✅ Simple test endpoint
app.MapGet("/", () => "🚀 Service2 is running");

// ✅ API endpoint (frontend call karega)
app.MapGet("/api/data", () => new
{
    service = "Service2",
    message = "Hello from Service2 🎯"
});

app.Run();

