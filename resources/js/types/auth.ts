export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    notification_email?: string | null;
    telegram_chat_id?: string | null;
    email_notifications_enabled?: boolean;
    telegram_notifications_enabled?: boolean;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type Auth = {
    user: User;
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
