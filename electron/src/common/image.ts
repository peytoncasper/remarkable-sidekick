export type ImageType = "image"

export interface Image {
    type:   ImageType
    name:   string
    data:   string
}

export interface LocalImages {
    type: "local_images"
    images: Image[]
}
