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

function cd...  { cd ..\.. }
function cd.... { cd ..\..\.. }
function repos() { cd c://Dev/repos }

function csearch() { choco search $args }

function csearch() { choco install -y $args }


# Gits

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

# PSReadLine

Set-PSReadLineKeyHandler -Key Tab -Function Complete
if ($host.Name -eq 'ConsoleHost') {
  Import-Module PSReadLine
}

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

# Helper function to set location to the User Profile directory
# function cuserprofile { Set-Location ~ }
# Set-Alias ~ cuserprofile -Option AllScope

# Helper function to show Unicode character
function U {
    param
    (
        [int] $Code
    )

    if ((0 -le $Code) -and ($Code -le 0xFFFF))
    {
        return [char] $Code
    }

    if ((0x10000 -le $Code) -and ($Code -le 0x10FFFF))
    {
        return [char]::ConvertFromUtf32($Code)
    }

    throw "Invalid character code $Code"
}

# We don't need these any more; they were just temporary variables to get to $isAdmin.
# Delete them to prevent cluttering up the user profile.
# Remove-Variable identity
# Remove-Variable principal

# Need this if you are using github as your remote git repository
# if (! (ps | ? { $_.Name -eq 'ssh-agent'})) {
#     Start-SshAgent
# }

