import Link from "next/link";
import { Globe, Share2, User } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/5 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-xl font-bold font-heading gradient-text">AgentFlow AI</span>
            </Link>
            <p className="text-text-secondary text-sm max-w-xs mb-6">
              Automate your professional social media presence with the power of Gemini AI. 
              Built for creators, by creators.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-text-muted hover:text-brand-violet transition-colors">
                <Share2 className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-text-muted hover:text-brand-violet transition-colors">
                <Globe className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-text-muted hover:text-brand-violet transition-colors">
                <User className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-6 text-sm uppercase tracking-widest">Product</h4>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li><Link href="/features" className="hover:text-brand-violet transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-brand-violet transition-colors">Pricing</Link></li>
              <li><Link href="/about" className="hover:text-brand-violet transition-colors">About</Link></li>
              <li><Link href="/blog" className="hover:text-brand-violet transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-6 text-sm uppercase tracking-widest">Legal</h4>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li><Link href="/privacy" className="hover:text-brand-violet transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-brand-violet transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-brand-violet transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} AgentFlow AI. All rights reserved.</p>
          <p>Built with Gemini AI + Supabase + Vercel — 100% Free</p>
        </div>
      </div>
    </footer>
  );
}
