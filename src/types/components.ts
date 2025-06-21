// Component Props Types
export interface BenefitItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export interface CoreValueItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export interface TeamMemberItemProps {
    imageSrc: string;
    name: string;
    role: string;
}

export interface ImageCardProps {
    src: string;
    label: string;
}

export interface NewsCardProps {
    article: {
        title: string;
        description: string;
        url: string;
        urlToImage: string;
        publishedAt: string;
        author: string;
        source: {
            name: string;
        };
        content?: string;
    };
    onClick?: () => void;
}

export interface NewsArticle {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    author: string;
    source: {
        name: string;
    };
    content?: string;
}
