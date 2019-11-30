

git remote update                           #update remote
$msg = git remote show origin               #capture status
$update = $msg -like '*local out of date*'
if($update.length -gt 0){                   #if local needs update
    Write-Host ('needs update')
    # git pull
    # git reset --hard origin/master
    # Write-Host ('local updated')
} else {
    Write-Host ('no update needed')
}
