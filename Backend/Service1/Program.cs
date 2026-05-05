var builder = WebApplication.CreateBuilder(args);

// ✅ Enable CORS (Frontend connect karega)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

var app = builder.Build();

// ❌ HTTPS avoid (Docker/EC2 ke liye)
 // app.UseHttpsRedirection();

// ✅ Use CORS
app.UseCors("AllowAll");

// ✅ Health Check Endpoint
app.MapGet("/", () => new {
    service = "Service1",
    status = "Running 🚀"
});

// ✅ Main API Endpoint
app.MapGet("/api/data", () =>
{
    return new
    {
        message = "Hello from Service1 🎯",
        time = DateTime.Now.ToString("HH:mm:ss"), // clean format
        service = "Service1"
    };
});

app.Run();
