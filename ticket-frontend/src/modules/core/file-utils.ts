export interface FileToBase64Result {
    fileName: string;
    file: string;
    fileMimePrefix: string;
}

export class FileUtils {

    static async fileToBase64(file: File): Promise<FileToBase64Result> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result as string;
                const resultSplitted = result.split(',');
                if (resultSplitted.length > 1) {
                    resolve({
                        fileName: file.name,
                        file: resultSplitted[1],
                        fileMimePrefix: resultSplitted[0]
                    })
                } else {
                    reject("invalid image type")
                }
            };
            reader.onerror = error => reject(error);
        });
    }

}