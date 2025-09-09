export type SliderImage = {
    id: number;
    images_url: string;
    link: string;
    created_at: string;
    updated_at: string;
};

export type SliderResponse = {
    status: boolean;
    sliderImages: SliderImage[];
    update: string | null;
};
