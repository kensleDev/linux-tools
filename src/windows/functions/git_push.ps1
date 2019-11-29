
$date = Get-Date -format dd/MM/yyyy HH:mm:ss
$commit_message = $date

git add -A
git commit -m $commit_message
git push
