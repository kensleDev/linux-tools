Set-ExecutionPolicy Unrestricted


# Chocolatey profile
$ChocolateyProfile = "$env:ChocolateyInstall\helpers\chocolateyProfile.psm1"
if (Test-Path($ChocolateyProfile)) {
  Import-Module "$ChocolateyProfile"
}

# Import-Module posh-git
# Import-Module oh-my-posh
# Set-Theme robbyrussell

# Import-Module Get-ChildItemColor

# Aliases

Set-Alias c Clear-Host
# Set-Alias s Invoke-FuzzyEdit
# Set-Alias sh Invoke-FuzzyHistory
# Set-Alias l Get-ChildItemColor -Option AllScope
# Set-Alias ls Get-ChildItemColorFormatWide -Option AllScope

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

function cd...  { cd ..\.. }
function cd.... { cd ..\..\.. }

function search() { choco search $args }
function install() { choco install -y $args }

# Git

# function clone() {
#   clear
#   echo "Enter repo name"
#   echo "-----------------"
#   $repo = Read-Host -Prompt '|=>'

#   $start=$repo.substring(0, 4)

#   clear

#   if ($start -eq "http") {
#     git clone $repo
#   } Else {
#     git clone git@github.com:kensleDev/$repo
#   }

# }

# function addc() {

#   clear
#   echo "Enter emoji"
#   $emoji = Read-Host -Prompt '|=>'

#   clear
#   echo "Enter commit message"
#   $msg = Read-Host -Prompt '|=>'

#   $commitMsg1 = "${emoji}: $msg"
#   $commitMsg2 = ":$commitMsg"

#   clear

#   git add -A
#   git commit -m ":"$commitMsg
# }

# PSReadLine

# Set-PSReadLineKeyHandler -Key Tab -Function Complete
# if ($host.Name -eq 'ConsoleHost') {
#   Import-Module PSReadLine
# }

# Set-PSReadLineKeyHandler -Chord 'Oem7','Shift+Oem7' `
#                          -BriefDescription SmartInsertQuote `
#                          -LongDescription "Insert paired quotes if not already on a quote" `
#                          -ScriptBlock {
#     param($key, $arg)

#     $line = $null
#     $cursor = $null
#     [Microsoft.PowerShell.PSConsoleReadLine]::GetBufferState([ref]$line, [ref]$cursor)

#     if ($line[$cursor] -eq $key.KeyChar) {
#         # Just move the cursor
#         [Microsoft.PowerShell.PSConsoleReadLine]::SetCursorPosition($cursor + 1)
#     }
#     else {
#         # Insert matching quotes, move cursor to be in between the quotes
#         [Microsoft.PowerShell.PSConsoleReadLine]::Insert("$($key.KeyChar)" * 2)
#         [Microsoft.PowerShell.PSConsoleReadLine]::GetBufferState([ref]$line, [ref]$cursor)
#         [Microsoft.PowerShell.PSConsoleReadLine]::SetCursorPosition($cursor - 1)
#     }
# }

# Need this if you are using github as your remote git repository
# if (! (ps | ? { $_.Name -eq 'ssh-agent'})) {
#     Start-SshAgent
# }
