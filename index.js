const fs = require('fs');
const os = require('os');

class Storage {

    /**
     * 
     * @param {string} storageName 
     */
    constructor(storageName) {
        this.appDir = os.homedir() + '/.' +storageName + '/';
    }

    /**
     * Get the storage object
     * @return {any}
     */
    getStorage() {
        return this.getStorageFile('storage');
    }

    /**
     * get the storage object of a specific file
     * @param {string} fileName 
     */
    getStorageFile(fileName) {
        fileName = fileName.replace('.json', '');
        if(!this._storageExists() && !this._storageFileExists(fileName)) {
            this._createFile(fileName, {});
        }

        return JSON.parse(fs.readFileSync(this.appDir+fileName+'.json', 'utf-8'));
    }

    /**
     * Write an object to the storage file
     * @param {any} object 
     * @param {string} fileName 
     */
    writeStorageFile(object, fileName) {
        this._createFile(fileName, object);
    }

    /**
     * Write an object to the storage file
     * @param {any} object 
     */
    writeStorage(object) {
        this._createFile('storage', object);
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


module.exports = Storage;