param([String]$repoPath)

$currentDateTime = Get-Date -Format "dddd dd/MM/yyyy HH:mm:ss"

cd $repoPath
git add -A
git commit -m "$currentDateTime - auto push via script"
git push
