import * as Minio from 'minio';


const minioConfig =  {
    endPoint: 'localhost',
    port: 9000, // Minio 默认端口
    useSSL: false, // 是否使用 SSL
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
    bucket: 'test',
};
  

function buildMinioClient() {
    const client = new Minio.Client({
      endPoint: minioConfig.endPoint,
      port: minioConfig.port,
      useSSL: false,
      accessKey: (minioConfig.accessKeyId) || 'minioadmin',
      secretKey: (minioConfig.accessKeySecret) || 'minioadmin',
    });
    return client;
}

export async function putMinioFile(file) {
    // Extracting the file extension
    const fileExtension = file.name.split('.').pop();

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const client = buildMinioClient();
    try {
      const { bucket } = minioConfig;
      const objectName = bucket + '_' + new Date().getTime() + '.' + fileExtension;
      await client.putObject(bucket, objectName, buffer);

      const fileSizeInBytes = file.size;
      const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2); // 保留两位小数 1 KB = 1024 Bytes
      const url = `http://${minioConfig.endPoint}:${minioConfig.port}/${bucket}/${objectName}`;
      return {
        file, fileSizeInKB, url
      }
    } catch (error) {
      throw new Error(`Minio upload error: ${error}`);
    }
}
