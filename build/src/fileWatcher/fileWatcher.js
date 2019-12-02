"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar = __importStar(require("chokidar"));
const fs_1 = require("fs");
const settings_1 = require("../settings");
function fileWatcher() {
    const filePaths = Object.values(settings_1._DOTFILES);
    const repoDotfileLocation = (dotfileName) => `${settings_1._OPTIONS.repoLocation}\\src\\assets\\${settings_1._CURRENT_PLATFORM}\\dotfiles\\${dotfileName}`;
    const watcher = chokidar.watch(filePaths, { persistent: true });
    watcher.on('change', (path, event) => {
        const currentDotfileName = path.substring(path.lastIndexOf('\\') + 1);
        fs_1.copyFile(path, repoDotfileLocation(currentDotfileName), (err) => {
            if (err)
                console.log(err);
        });
    });
}
exports.fileWatcher = fileWatcher;
//# sourceMappingURL=fileWatcher.js.map