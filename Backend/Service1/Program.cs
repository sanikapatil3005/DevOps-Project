var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

// ❌ REMOVE if present
// app.UseHttpsRedirection();

// ✅ Root endpoint
app.MapGet("/", () => "🚀 Service1 is running");

// ✅ API endpoint
app.MapGet("/api/data", () =>
{
    return new {
        message = "Hello from Service1 🎯",
        time = DateTime.Now.ToString()
    };
});

// ✅ VERY IMPORTANT
app.Run("http://0.0.0.0:5001");
