# Set-ExecutionPolicy Unrestricted


# Chocolatey profile
$ChocolateyProfile = "$env:ChocolateyInstall\helpers\chocolateyProfile.psm1"
if (Test-Path($ChocolateyProfile)) {
  Import-Module "$ChocolateyProfile"
}

Import-Module posh-git
Import-Module oh-my-posh
Set-Theme robbyrussell

Import-Module Get-ChildItemColor

# Aliases

Set-Alias c Clear-Host
Set-Alias s Invoke-FuzzyEdit
Set-Alias sh Invoke-FuzzyHistory
Set-Alias l Get-ChildItemColor -Option AllScope
Set-Alias ls Get-ChildItemColorFormatWide -Option AllScope

# Set UNIX-like aliases for the admin command, so sudo <command> will run the command
# with elevated rights.
Set-Alias -Name su -Value admin
Set-Alias -Name sudo -Value admin

function admin {
  if ($args.Count -gt 0)
  {
      $argList = "& '" + $args + "'"
      Start-Process "$psHome\powershell.exe" -Verb runAs -ArgumentList $argList
  }
  else
  {
      Start-Process "$psHome\powershell.exe" -Verb runAs
  }
}

function repos() { cd E://Dev/repos }

function csearch() { choco search $args }

function csearch() { choco install -y $args }


# Git

function clone() {
  clear
  echo "Enter repo name"
  echo "-----------------"
  $repo = Read-Host -Prompt '|=>'

  $start=$repo.substring(0, 4)

  clear

  if ($start -eq "http") {
    git clone $repo
  } Else {
    git clone git@github.com:kensleDev/$repo
  }

}

function addc() {

  clear
  echo "Enter emoji"
  $emoji = Read-Host -Prompt '|=>'

  clear
  echo "Enter commit message"
  $msg = Read-Host -Prompt '|=>'

  $commitMsg1 = "${emoji}: $msg"
  $commitMsg2 = ":$commitMsg"

  clear

  git add -A
  git commit -m ":"$commitMsg
}

# Simple function to start a new elevated process. If arguments are supplied then
# a single command is started with admin rights; if not then a new admin instance
# of PowerShell is started.

# PSReadLine

Set-PSReadLineKeyHandler -Key Tab -Function Complete
if ($host.Name -eq 'ConsoleHost') {
  Import-Module PSReadLine
}

