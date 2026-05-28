import { Page, PageBody, PageHeader, PageTitle, Button } from '@blinkdotnew/ui'
import { SharedAppLayout } from './layouts/shared-app-layout'
import { Wizard } from './components/Wizard'
import { Zap, Github, Globe, Terminal, Cpu, Shield, Sparkles } from 'lucide-react'

function Feature({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-colors group">
      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

export default function App() {
  return (
    <SharedAppLayout appName="DeployWizard">
      <Page>
        <PageBody>
          <div className="relative pt-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
            
            <div className="relative z-10 space-y-24 pb-20">
              <Wizard />

              <section className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built for modern developers</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Everything you need to deploy, scale, and monitor your web applications with confidence.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Feature 
                    icon={Github} 
                    title="GitHub Integration" 
                    description="Seamless connection with your GitHub repositories. Deploy on every push with automatic CI/CD."
                  />
                  <Feature 
                    icon={Globe} 
                    title="Global Edge Network" 
                    description="Your content is served from 300+ locations worldwide for ultra-low latency."
                  />
                  <Feature 
                    icon={Terminal} 
                    title="Real-time Logs" 
                    description="Monitor your build and runtime performance with detailed streaming logs."
                  />
                  <Feature 
                    icon={Cpu} 
                    title="Framework Detection" 
                    description="Smart detection of your favorite frameworks. Auto-config for React, Next.js, and more."
                  />
                  <Feature 
                    icon={Shield} 
                    title="Automatic SSL" 
                    description="Free SSL certificates for all your domains, automatically provisioned and renewed."
                  />
                  <Feature 
                    icon={Sparkles} 
                    title="AI Optimization" 
                    description="Intelligent resource allocation to ensure your site is always lightning fast."
                  />
                </div>
              </section>
            </div>
          </div>
        </PageBody>
      </Page>
    </SharedAppLayout>
  )
}
