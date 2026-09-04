# Bundle all JS into one file (no ES modules – works on file:// and http://)
$root = $PSScriptRoot
$files = @(
    'js\data.js',
    'js\store.js',
    'js\utils.js',
    'js\auth.js',
    'js\charts.js',
    'js\components.js',
    'js\pages\login.js',
    'js\pages\dashboard.js',
    'js\pages\new-order.js',
    'js\pages\orders.js',
    'js\pages\menu.js',
    'js\pages\analytics.js',
    'js\pages\reports.js',
    'js\pages\users.js',
    'js\pages\settings.js',
    'js\pages\inventory.js',
    'js\router.js',
    'js\app.js'
)

$bundle = @"
// Gurukripa Restaurant Prototype – bundled (no ES modules)
(function() {
'use strict';

"@

foreach ($rel in $files) {
    $path = Join-Path $root $rel
    if (-not (Test-Path $path)) {
        Write-Error "Missing: $path"
        exit 1
    }
    $content = Get-Content $path -Raw -Encoding UTF8
    # Remove import statements (single and multi-line)
    $content = [regex]::Replace($content, 'import\s+[\s\S]*?from\s+[''"].*?[''"]\s*;', '')
    # Remove export { ... } lines
    $content = [regex]::Replace($content, 'export\s*\{[^}]*\}\s*;?', '')
    # Remove export keyword
    $content = $content -replace 'export\s+', ''
    $bundle += "// --- $rel ---`n$content`n"
}

$bundle += @"

})();
"@

$out = Join-Path $root 'js\bundle.js'
[System.IO.File]::WriteAllText($out, $bundle, [System.Text.UTF8Encoding]::new($false))
Write-Host "Created $out ($((Get-Item $out).Length) bytes)"
