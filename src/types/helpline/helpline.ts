export type SocialLink = {
    id: number;
    name: string;
    image: string;
    url: string;
    created_at: string | null;
    updated_at: string | null;
  };
  
  export type SocialLinkResponse = {
    status: boolean;
    data: SocialLink[];
  };
  