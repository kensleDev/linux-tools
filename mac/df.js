var fs = require('fs');
const dotfiles = require('./dotfiles.json')
const keys = Object.keys(dotfiles)
const locations = keys.map(res => dotfiles[res])
const os = require('os');
const HOME_DIR = os.homedir();
const REPO_DIR = HOME_DIR + '/repos/linux-tools/mac'
var args = process.argv

if (args[2] === 'push') PUSH()
else if (args[2] === 'pull') PULL()


async function PULL() {

    try {
        console.log(await execShellCommand('git pull'))
        locations.forEach(locationArr => {
            locationArr.forEach(location => {
                const sourceFileName = location.substring(location.lastIndexOf('/')+1)
                const source = `${REPO_DIR}/dotfiles/${sourceFileName}`
                location = location.replace('HOME', HOME_DIR)
    
                if (!ARE_FILES_EQUAL) {
                    COPY_FILE(source, location)
                } else {
                    console.log(`-> ${sourceFileName} is already up to date`)
                }
                // 
            }) 
        })
    } catch (e) {
        console.log(e)
    }

    
}

function PUSH() {
    locations.forEach(locationArr => {
        locationArr.forEach(location => {
            const destFileName = location.substring(location.lastIndexOf('/')+1)
            const dest = `${REPO_DIR}/dotfiles/${destFileName}`
            location = location.replace('HOME', HOME_DIR)

            COPY_FILE(location, dest)
        })
    })
    console.log(execShellCommand('git add -A; git commit -m "DOTFILE auto push"; git push'))
}


// FILE OPS

function COPY_FILE(source, destination) {
    fs.copyFile(source, destination, (err) => {
        if (err) throw err;
        console.log(`-> COPY -> ${destination}`);
    });
}

function READ_FILE(location) {
    try {
        var data = fs.readFileSync(location, 'utf8');
        // console.log(data);    
        return data
    } catch(e) {
        console.log('Error:', e.stack);
    }
}

function ARE_FILES_EQUAL(file1, file2) {
    var buf1 = Buffer.from(READ_FILE(source));
    var buf2 = Buffer.from(READ_FILE(location));
    var x = Buffer.compare(buf1, buf2);

    if (x === 1 || x === -1) return false
    else if (x === 0) return true 
    else throw Error('file comparison has gone wrong')
}

function execShellCommand(cmd) {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) console.warn(error);
            resolve(stdout? '-> GIT -> Pull \n' + stdout : stderr);
        });
    });
}