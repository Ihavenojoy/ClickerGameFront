import { ref, type Ref } from 'vue';

const IMAGE_BASE_URL = "http://localhost:8080/image";

// Reactive state
const imageUrl = ref<string | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);
const imageNames = ref<string[]>([]);
export const imageUrls = ref<string[]>([]);


export function useUserImage() {
    return {
        imageUrl,
        loading,
        error,
        loadImage,
        useruploadFile,
        handleuserUpload,
        uploadFile,
        handleUpload,
        loadUserImages,
        handleImageSelection,
        imageNames,
        imageUrls
    };
}

//  Load an image for a user (MinIO -> byte[] -> blob)
async function loadImage(userId: number, filename: string): Promise<void> {
    loading.value = true;
    error.value = null;

    console.log(`Loading image for user ${userId}, filename: ${filename}`); // Debugging log

    try {
        // Send a GET request to the backend to fetch the image
        const response = await fetch(`${IMAGE_BASE_URL}/userimages/${userId}/${filename}`, {
            method: "GET", // Use GET instead of POST
        });

        if (!response.ok) {
            throw new Error(`Failed to load image: ${response.statusText}`);
        }

        const blob = await response.blob();

        // Clean up old blob URL if needed
        if (imageUrl.value) {
            URL.revokeObjectURL(imageUrl.value);
        }

        // Create a new object URL for the blob and set it to the imageUrl reactive reference
        imageUrl.value = URL.createObjectURL(blob);
        console.log('Image loaded successfully'); // Debugging log

    } catch (err: any) {
        console.error("Error loading image:", err);
        error.value = err.message || "Unknown error";
    } finally {
        loading.value = false;
    }
}

//  Upload file associated with a user
async function useruploadFile(userId: number, file: File, filename: string): Promise<void> {
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

//  Upload generic file (non-user-specific)
async function uploadFile(): Promise<void> {
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    const filename = (document.getElementById('filename') as HTMLInputElement).value;
    const contentype = (document.getElementById('contentype') as HTMLInputElement).value;
    const bucket = (document.getElementById('bucket') as HTMLInputElement).value;

    const file = fileInput?.files?.[0];
    if (!file) {
        alert('No file selected!');
        return;
    }

    const formData = new FormData();
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

//  File upload handler using Refs (e.g., for Vue inputs)
const handleuserUpload = async (
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


async function loadUserImages(userId: number): Promise<void> {
    loading.value = true;
    error.value = null;

    console.log(`Sending request to load images for user ${userId}`);  // Debugging log

    try {
        const response = await fetch(`${IMAGE_BASE_URL}/getalluserimages/${userId}`, {
            method: 'GET',
        });

        console.log("Response received:", response);  // Debugging log

        if (!response.ok) {
            throw new Error(`Failed to load images: ${response.statusText}`);
        }

        const byteArrays: number[][] = await response.json();

        // Clear any previous images
        imageUrls.value = [];
        imageNames.value = [];  // Clear image names as well

        // Convert each byte array into a Blob URL and store the filenames
        byteArrays.forEach((byteArray, index) => {
            const blob = new Blob([new Uint8Array(byteArray)], { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            imageUrls.value.push(url);

            // Store the filenames (for example, based on userId and index)
            imageNames.value.push(`image-${userId}-${index}.jpg`);
        });

    } catch (err: any) {
        console.error("Error loading images:", err);
        error.value = err.message || "Unknown error";
    } finally {
        loading.value = false;
    }
}

//  Function to handle image selection and update the main image URL
const handleImageSelection = (selectedImageUrl: string): void => {
    // This could be a state change or passing the selected image URL to the parent component
    imageUrls.value = [selectedImageUrl];  // Update to just the selected image for display
};

//  Simple DOM-based upload handler
const handleUpload = async (): Promise<void> => {
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    const fileName = (document.getElementById('filename') as HTMLInputElement).value;

    if (fileInput && fileName) {
        await uploadFile();
    } else {
        alert('Please select a file and enter a filename!');
    }
};
