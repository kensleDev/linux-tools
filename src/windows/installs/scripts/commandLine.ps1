choco install -y fzf

choco install -y oh-my-posh

Copy-Item  -Path '..\..\dotfiles\Microsoft.PowerShell_profile.ps1' -Destination 'C:\Users\$USER\Documents' -Recurse -force
