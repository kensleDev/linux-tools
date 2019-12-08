#Requires -RunAsAdministrator

Set-ExecutionPolicy Bypass -Scope Process -Force

# install chocolatey if not installed
if (!(Test-Path -Path "$env:ProgramData\Chocolatey")) {
  Invoke-Expression((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
}

# for each package in the list run install
Get-Content ".\packages" | ForEach-Object{($_ -split "\r\n")[0]} | ForEach-Object{choco install --force -y $_}
