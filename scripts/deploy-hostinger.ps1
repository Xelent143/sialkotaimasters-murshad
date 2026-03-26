param(
    [string]$Host = $env:HOSTINGER_HOST,
    [string]$Port = $env:HOSTINGER_PORT,
    [string]$Username = $env:HOSTINGER_USERNAME,
    [string]$Password = $env:HOSTINGER_PASSWORD,
    [string]$RemotePath = $env:HOSTINGER_REMOTE_PATH,
    [string]$LocalPath = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
)

$required = @{
    HOSTINGER_HOST = $Host
    HOSTINGER_PORT = $Port
    HOSTINGER_USERNAME = $Username
    HOSTINGER_PASSWORD = $Password
    HOSTINGER_REMOTE_PATH = $RemotePath
}

$missing = $required.GetEnumerator() | Where-Object { [string]::IsNullOrWhiteSpace($_.Value) } | Select-Object -ExpandProperty Key
if ($missing) {
    throw "Missing required environment variables/parameters: $($missing -join ', ')"
}

$winScp = @(
    "$env:ProgramFiles(x86)\WinSCP\WinSCP.com",
    "$env:ProgramFiles\WinSCP\WinSCP.com"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $winScp) {
    throw "WinSCP.com not found. Install WinSCP from https://winscp.net/eng/download.php or use the GitHub Actions workflow instead."
}

$tempScript = [System.IO.Path]::GetTempFileName()
try {
    $escapedPassword = $Password.Replace('"', '""')
    $escapedRemotePath = $RemotePath.Replace('"', '""')
    $escapedLocalPath = $LocalPath.Replace('"', '""')

    @(
        'option batch abort',
        'option confirm off',
        "open sftp://$Username:`"$escapedPassword`"@$Host`:$Port -hostkey=*",
        "synchronize remote -mirror -criteria=time,size -filemask=| .git/;.github/;README.md;DEPLOYMENT_SUMMARY.md;scripts/ `"$escapedLocalPath`" `"$escapedRemotePath`"",
        'exit'
    ) | Set-Content -Path $tempScript -Encoding ASCII

    & $winScp "/script=$tempScript"
    if ($LASTEXITCODE -ne 0) {
        throw "WinSCP deployment failed with exit code $LASTEXITCODE"
    }

    Write-Host "Deployment complete -> $RemotePath"
}
finally {
    Remove-Item $tempScript -ErrorAction SilentlyContinue
}
