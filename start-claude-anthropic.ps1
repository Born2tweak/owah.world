# Use in Antigravity IDE terminal: clears leftover 9Router/proxy env, then starts Claude Code on Anthropic account auth.
$vars = @(
    'ANTHROPIC_BASE_URL',
    'ANTHROPIC_AUTH_TOKEN',
    'ANTHROPIC_API_KEY',
    'ANTHROPIC_DEFAULT_SONNET_MODEL',
    'ANTHROPIC_DEFAULT_OPUS_MODEL',
    'ANTHROPIC_DEFAULT_HAIKU_MODEL'
)
foreach ($v in $vars) {
    if (Test-Path "Env:$v") { Remove-Item "Env:$v" -ErrorAction SilentlyContinue }
}
Set-Location $PSScriptRoot
Write-Host 'Starting Claude Code (Anthropic account — proxy env cleared)' -ForegroundColor Green
& claude
