import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './dto/file.model';
import * as crypto from 'crypto';
import { UploadPost, DownloadPost, ResultDownload } from './dto/minio.dto';
@Injectable()
export class MinioNestService {
    constructor(private readonly minio: MinioService) { }

    private readonly expireTime = parseInt(process.env.MINIO_EXPIRE_TIME);
    private readonly minio_key = process.env.MINIO_KEY;
    public get client() {
        return this.minio.client;
    }

    encrypt(data: string) {
        let mykey = crypto.createCipher('aes-128-cbc', this.minio_key);
        let mystr = mykey.update(data, 'utf8', 'hex');
        mystr += mykey.final('hex');
        return mystr;
    }
    decrypt(data: string) {
        var mykey = crypto.createDecipher('aes-128-cbc', this.minio_key);
        var mystr = mykey.update(data, 'hex', 'utf8');
        mystr += mykey.final('utf8');
        return mystr;
    }

    async uploadSingle(file: BufferedFile, data: UploadPost) {
        try {
            const baseBucket = data.folder;

            this.client.makeBucket(baseBucket, 'us-east-1');

            let temp_filename = Date.now().toString();
            let hashedFileName = crypto
                .createHash('md5')
                .update(temp_filename)
                .digest('hex');
            let ext = file.originalname.substring(
                file.originalname.lastIndexOf('.'),
                file.originalname.length,
            );

            const metaData = {
                'Content-Type': file.mimetype,
                'Origin-Filename': file.originalname,
            };

            let filename = hashedFileName + ext;
            const fileName: string = `${data.directory}/${filename}`;
            const fileBuffer = file.buffer;
            const fileSize = file.size;
            const token = this.encrypt(`${baseBucket}:${fileName}`);
            const resultUpload = await this.client.putObject(
                data.folder,
                fileName,
                fileBuffer,
                fileSize,
                metaData,
            );
            const resultDownload = await this.client.presignedUrl(
                'GET',
                data.folder,
                fileName,
                this.expireTime,
            );
            let output = new ResultDownload();

            output.fileName = filename;
            output.mimeType = file.mimetype;
            output.originFileName = file.originalname;
            output.size = fileSize;
            output.token = token;
            output.url = resultDownload;
            return {
                isError: false,
                data: output,
                statusCode: 201,
            };
        } catch (error) {
            console.error(error);
            return { isError: true, data: error.message, statusCode: 500 };
        }
    }

    async download(post: DownloadPost) {
        try {
            const decryptToken = this.decrypt(post.token);
            const decryptTokenArray = decryptToken.split(':');
            const bucket = decryptTokenArray[0];
            const filename = decryptTokenArray[1];
            const resultDownload = await this.client.presignedUrl(
                'GET',
                bucket,
                filename,
                this.expireTime,
            );
            return {
                isError: false,
                data: {
                    url: resultDownload,
                },
                statusCode: 201,
            };
        } catch (error) {
            console.error(error);
            return { isError: true, data: error.message, statusCode: 500 };
        }
    }
}
