# Gurukripa Prototype – Local static file server (no Python/Node required)
$port = 8080
$root = $PSScriptRoot

$mimeTypes = @{
    '.html' = 'text/html; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.js'   = 'application/javascript; charset=utf-8'
    '.json' = 'application/json; charset=utf-8'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.svg'  = 'image/svg+xml'
    '.ico'  = 'image/x-icon'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host ""
Write-Host "  Gurukripa Restaurant Prototype" -ForegroundColor Cyan
Write-Host "  Running at: http://localhost:$port/" -ForegroundColor Green
Write-Host "  Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

Start-Process "http://localhost:$port/"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request  = $context.Request
        $response = $context.Response

        $localPath = [System.Uri]::UnescapeDataString($request.Url.LocalPath)
        if ($localPath -eq '/') { $localPath = '/index.html' }

        $relative  = $localPath.TrimStart('/').Replace('/', [IO.Path]::DirectorySeparatorChar)
        $filePath  = Join-Path $root $relative

        if ((Test-Path $filePath -PathType Leaf)) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext   = [System.IO.Path]::GetExtension($filePath).ToLower()
            $response.ContentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { 'application/octet-stream' }
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $localPath")
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }

        $response.Close()
    }
} finally {
    $listener.Stop()
}
