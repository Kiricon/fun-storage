const fs = require('fs');
const os = require('os');

class storage {

    /**
     * 
     * @param {string} storageName 
     */
    cosntructor(storageName) {
        this.appDir = os.homedir() + '/.' +storageName + '/';
    }

    getStorage() {
        this.getStorageFile('storage');
    }

    getStorageFile(fileName) {
        fileName = fileName.replace('.json', '');
        if(!this._storageExists() || this._storageFileExists(fileName)) {
            this._createFile(fileName, {});
        }

        return JSON.parse(fs.readFileSync(this.appDir+fileName+'.json', 'utf-8'));
    }

    writeStorageFile(object, fileName) {
        this._createFile(fileName, object);
    }

    writeStorage(object) {
        this_createFile('storage', object);
    }

    _storageExists() {
        return fs.existsSync(this.appDir);
    }

    _storageFileExists(fileName) {
        return fs.existsSync(this.appDir+fileName+'.json');
    }

    _createFile(fileName, object) {
        if(!this._storageExists()) {
            fs.mkdirSync(this.appDir);
        }

        fs.writeFileSync(this.appDir+fileName+'.json', JSON.stringify(object));
    }
}

module.exports = storage;