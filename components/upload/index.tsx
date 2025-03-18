"use client";

import { useState } from "react";
import publicApi from "@/src/services/publicApi";

export default function UploadImage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("images", selectedFile); // "images" deve bater com o backend

        setUploading(true);

        try {
            const res = await publicApi.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data && res.data.length > 0) {
                setImageUrl(res.data[0]);
            }
        } catch (error: any) {
            console.error("Erro ao enviar imagem:", error);
            if (error.response) {
                alert(`Erro: ${error.response.data.error}`);
            } else {
                alert("Erro desconhecido. Tente novamente.");
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <button
                onClick={handleUpload}
                className="bg-blue-500 text-white p-2 rounded"
                disabled={uploading}
            >
                {uploading ? "Enviando..." : "Enviar Imagem"}
            </button>

            {imageUrl && (
                <div className="mt-4">
                    <p>Imagem enviada com sucesso!</p>
                    <img src={imageUrl} alt="Imagem enviada" className="w-full mt-2 rounded" />
                </div>
            )}
        </div>
    );
}
