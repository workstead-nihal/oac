export interface LinkItem {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  badge?: string;
  badgeColor?: 'red' | 'gold' | 'emerald' | 'purple' | 'blue';
  thumbnailUrl?: string;
  isFeatured?: boolean;
  highlightGlow?: boolean;
  actionText?: string;
  iconName?: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  handle: string;
  color: string;
  hoverBg: string;
}

export interface CommunityTranslation {
  text: string;
  lang: string;
  nativeName: string;
  code: string;
}
