'use client'
import publicApi from '@/lib/api'
import { useEffect, useState } from 'react'

type Image = {
    url: string
    publicId: string
    name: string
    order: number
}

export default function PublicGallery() {
    const [images, setImages] = useState<Image[]>([])

    useEffect(() => {
        publicApi.get<any>(`/site-images?folder=registro-site`)
        .then((data) => console.log(data))

        // fetch('https://api.ritterveiculos.com.br/site-images?folder=registro-site')
        //     .then((res) => res.json())
    }, [])

    return (
        <div className="grid grid-cols-3 gap-4">
            {images.map((img) => (
                <img
                    key={img.publicId}
                    src={img.url}
                    alt={img.name}
                    className="rounded-xl shadow-md"
                />
            ))}
        </div>
    )
}
