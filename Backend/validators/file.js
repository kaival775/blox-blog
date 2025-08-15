const extensionValidator = (ext) => {
    if(ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif'){
        return true
    }else{
        return false
    }
}

module.exports = {extensionValidator};