const path = require('path');
const TMP_Folder = path.resolve(__dirname, '..', '..', 'tmp');  
const UPLOADS_Folder = path.resolve(TMP_Folder, 'uploads');
const multer = require('multer'); 
const crypto = require('crypto');

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_Folder,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const filename = `${fileHash}-${file.originalname}`;

            return callback(null, filename);
        }
    })
};

module.exports = {
    TMP_Folder,
    UPLOADS_Folder,
    MULTER
}