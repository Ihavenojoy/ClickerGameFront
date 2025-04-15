const IMAGE_BASE_URL = "https://localhost:8080/image";
import type { Ref } from 'vue';


export async function useruploadFile(userId: number, file: File, filename: string): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', filename);
    formData.append('contentype', file.type);
    formData.append('userId', userId.toString());
    console.log("Uploading image");
    try {
        const response = await fetch(`${IMAGE_BASE_URL}/userupload`, {
            method: 'POST',
            body: formData,
        });

        const result = await response.text();
        alert(result);
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function uploadFile(): Promise<void> {
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    const filename = (document.getElementById('filename') as HTMLInputElement).value;
    const contentype = (document.getElementById('contentype') as HTMLInputElement).value;
    const bucket = (document.getElementById('bucket') as HTMLInputElement).value;

    const formData = new FormData();
    const file = fileInput.files?.[0];
    if (!file) {
        alert('No file selected!');
        return;
    }

    formData.append('file', file);
    formData.append('filename', filename);
    formData.append('contentype', contentype);
    formData.append('bucket', bucket);

    try {
        const response = await fetch(`${IMAGE_BASE_URL}/upload`, {
            method: 'POST',
            body: formData,
        });

        const result = await response.text();
        alert(result);
    } catch (error) {
        console.error('Error:', error);
    }
}

export const handleuserUpload = async (
    userId: number,
    fileInput: Ref<HTMLInputElement | null>,
    fileName: Ref<string>
): Promise<void> => {
    const file = fileInput.value?.files?.[0];
    console.log('handleuserUpload called');
    console.log('File:', file);
    console.log('Filename:', fileName.value);

    if (file && fileName.value) {
        await useruploadFile(userId, file, fileName.value);
    } else {
        alert('Please select a file and enter a filename!');
    }
};

export const handleUpload = async (): Promise<void> => {
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    const fileName = (document.getElementById('filename') as HTMLInputElement).value;

    if (fileInput && fileName) {
        await uploadFile();
    } else {
        alert('Please select a file and enter a filename!');
    }
};