import { SOCIAL_LINKS } from '../data/links';
import { Mail, Globe, Instagram } from 'lucide-react';

interface SocialLinksProps {
  onCopyNotice?: () => void;
}

export default function SocialLinks({ }: SocialLinksProps) {
  const renderIcon = (id: string) => {
    switch (id) {
      case 'instagram':
        return <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />;
      case 'whatsapp':
        return (
          <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .2 5.3.2 11.9c0 2.1.6 4.2 1.6 6L0 24l6.3-1.7a11.9 11.9 0 0 0 5.8 1.5c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4ZM12.1 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.9 9.9 0 1 1 8.3 4.6Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 2.9 1.3 3.1c.1.2 2.2 3.4 5.3 4.8.8.3 1.3.5 1.8.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4Z" />
          </svg>
        );
      case 'discord':
        return (
          <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.3 4.4a19.8 19.8 0 0 0-4.9-1.5l-.6 1.2a18.3 18.3 0 0 0-5.6 0l-.6-1.2a19.8 19.8 0 0 0-4.9 1.5C.6 9 .0 13.4.3 17.7a19.8 19.8 0 0 0 6 3l1.2-2a12.7 12.7 0 0 1-1.9-.9l.5-.4c3.8 1.8 8 1.8 11.8 0l.5.4a12.7 12.7 0 0 1-1.9.9l1.2 2a19.8 19.8 0 0 0 6-3c.4-5-1-9.4-3.4-13.3ZM8.2 15.1c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.1 1.1 2.1 2.4-.9 2.4-2.1 2.4Zm7.6 0c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.1 1.1 2.1 2.4-.9 2.4-2.1 2.4Z" />
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12c0 2 .2 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.3-1.9.5-3.8.5-5.8 0-2-.2-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
          </svg>
        );
      case 'website':
        return <Globe className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />;
      case 'email':
        return <Mail className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />;
      default:
        return <Globe className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />;
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 xs:gap-2.5 sm:gap-3 flex-wrap px-1">
      {SOCIAL_LINKS.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          title={item.name}
          className={`group relative p-2.5 xs:p-3 min-w-[42px] min-h-[42px] xs:min-w-[46px] xs:min-h-[46px] flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 hover:border-transparent transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-md ${item.hoverBg}`}
        >
          {renderIcon(item.id)}
          <span className="sr-only">{item.name}</span>
        </a>
      ))}
    </div>
  );
}
