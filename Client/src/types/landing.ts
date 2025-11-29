export interface NavItem {
    label: string;
    href: string;
}

export interface Service {
    id: number,
    title: string;
    description: string;
    icon: React.ReactNode;
    price: string;
    duration: string;
    features: string[];
}

export interface ContactFormData {
    name: string;
    email: string;
    whatsapp: string;
    subject: string;
    message: string;
}