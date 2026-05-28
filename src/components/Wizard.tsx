import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Terminal as TerminalIcon, 
  Settings2, 
  Rocket, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight,
  Globe,
  Code2,
  Box,
  Layers
} from 'lucide-react';
import { Button, Input, Card, Badge, Progress } from '@blinkdotnew/ui';
import { cn } from '@/lib/utils';

type Step = 'welcome' | 'repo' | 'detect' | 'config' | 'deploying' | 'success';

const LOGS = [
  "Cloning repository...",
  "Installing dependencies...",
  "Running build script: vite build",
  "Optimizing assets...",
  "Uploading build artifacts...",
  "Configuring global edge network...",
  "Setting up custom domain redirects...",
  "Verifying deployment...",
  "Deployment successful!"
];

export function Wizard() {
  const [step, setStep] = useState<Step>('welcome');
  const [repoUrl, setRepoUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step === 'deploying') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep('success'), 1000);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 800);

      const logInterval = setInterval(() => {
        setCurrentLogIndex(prev => {
          if (prev >= LOGS.length - 1) {
            clearInterval(logInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);

      return () => {
        clearInterval(interval);
        clearInterval(logInterval);
      };
    }
  }, [step]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentLogIndex]);

  const renderStep = () => {
    switch (step) {
      case 'welcome':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 max-w-xl mx-auto py-12"
          >
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
              <Rocket size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Deploy your site <span className="text-gradient">instantly</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              The fastest way to take your GitHub projects from repository to global edge network. No configuration required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" onClick={() => setStep('repo')} className="h-12 px-8">
                Get Started <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8">
                How it works
              </Button>
            </div>
          </motion.div>
        );

      case 'repo':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 max-w-lg mx-auto py-8"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Connect Repository</h2>
              <p className="text-muted-foreground">Enter your GitHub repository URL to start the deployment process.</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  placeholder="https://github.com/username/repo" 
                  className="pl-10 h-12"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                />
              </div>
              <Button 
                className="w-full h-12" 
                disabled={!repoUrl.includes('github.com')}
                onClick={() => setStep('detect')}
              >
                Continue
              </Button>
            </div>
            <div className="pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground text-center">
                Can't find your repo? <a href="#" className="text-primary hover:underline">Import using a ZIP file</a>
              </p>
            </div>
          </motion.div>
        );

      case 'detect':
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 max-w-xl mx-auto py-8"
          >
            <div className="text-center space-y-2">
              <div className="animate-pulse inline-flex p-3 rounded-full bg-primary/10 text-primary mb-2">
                <Layers size={32} />
              </div>
              <h2 className="text-2xl font-semibold">Detecting Framework</h2>
              <p className="text-muted-foreground">Analyzing repository structure and dependencies...</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className={cn("p-4 border-2 transition-all cursor-pointer", "border-primary bg-primary/5")}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">Vite + React</h4>
                    <p className="text-xs text-muted-foreground">Detected from package.json</p>
                  </div>
                  <CheckCircle2 className="ml-auto text-primary" size={18} />
                </div>
              </Card>
              <Card className="p-4 border-border/50 opacity-50 cursor-not-allowed">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted text-muted-foreground">
                    <Box size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">Next.js</h4>
                    <p className="text-xs text-muted-foreground">Not detected</p>
                  </div>
                </div>
              </Card>
            </div>

            <Button className="w-full h-12" onClick={() => setStep('config')}>
              Looks Good <ChevronRight className="ml-2" size={18} />
            </Button>
          </motion.div>
        );

      case 'config':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 max-w-xl mx-auto py-8"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Build Settings</h2>
              <p className="text-muted-foreground">We've pre-filled the recommended settings for your project.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Build Command</label>
                <div className="relative">
                  <TerminalIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input defaultValue="npm run build" className="pl-10 font-mono text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Output Directory</label>
                <div className="relative">
                  <Box className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input defaultValue="dist" className="pl-10 font-mono text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Install Command</label>
                <div className="relative">
                  <Settings2 className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input defaultValue="npm install" className="pl-10 font-mono text-sm" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep('detect')}>Back</Button>
              <Button className="flex-[2] h-12" onClick={() => setStep('deploying')}>
                Start Deployment
              </Button>
            </div>
          </motion.div>
        );

      case 'deploying':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 max-w-2xl mx-auto py-8"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="animate-spin text-primary">
                    <Rocket size={24} />
                  </div>
                  <h2 className="text-xl font-semibold text-gradient">Deploying project...</h2>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                  {Math.round(progress)}%
                </Badge>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="rounded-lg bg-black/50 border border-border/50 p-4 font-mono text-sm h-[300px] overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="text-xs text-muted-foreground ml-2">Build Logs</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2">
                {LOGS.slice(0, currentLogIndex + 1).map((log, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-3"
                  >
                    <span className="text-muted-foreground select-none shrink-0 w-4 text-right">{i + 1}</span>
                    <span className={cn(
                      "text-white/80",
                      i === currentLogIndex && "terminal-cursor"
                    )}>
                      {log}
                    </span>
                  </motion.div>
                ))}
                <div ref={logsEndRef} />
              </div>
            </div>
          </motion.div>
        );

      case 'success':
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 max-w-xl mx-auto py-12"
          >
            <div className="relative inline-flex">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
              <div className="relative p-6 rounded-full bg-primary/10 text-primary border border-primary/20">
                <CheckCircle2 size={64} />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-4xl font-bold">Successfully Deployed!</h2>
              <p className="text-muted-foreground text-lg">Your project is now live on the global edge network.</p>
            </div>

            <Card className="p-6 glass-panel space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                <div className="flex items-center gap-3">
                  <Globe className="text-primary" size={20} />
                  <span className="font-medium text-sm">my-awesome-site.deploy.net</span>
                </div>
                <Button size="sm" variant="ghost" onClick={() => window.open('#', '_blank')}>
                  Visit Site
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-left space-y-1">
                  <p className="text-xs text-muted-foreground uppercase font-semibold">Environment</p>
                  <p className="text-sm font-medium">Production</p>
                </div>
                <div className="text-left space-y-1">
                  <p className="text-xs text-muted-foreground uppercase font-semibold">Build Time</p>
                  <p className="text-sm font-medium">42 seconds</p>
                </div>
              </div>
            </Card>

            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="outline" onClick={() => setStep('welcome')}>
                Dashboard
              </Button>
              <Button size="lg" onClick={() => window.open('#', '_blank')}>
                Go Live
              </Button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {step !== 'welcome' && (
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4 custom-scrollbar">
          {[
            { id: 'repo', label: 'Repository', icon: Github },
            { id: 'detect', label: 'Detection', icon: Layers },
            { id: 'config', label: 'Configure', icon: Settings2 },
            { id: 'deploying', label: 'Deployment', icon: Rocket },
          ].map((s, i) => {
            const isActive = step === s.id;
            const isCompleted = ['repo', 'detect', 'config', 'deploying', 'success'].indexOf(step) > ['repo', 'detect', 'config', 'deploying', 'success'].indexOf(s.id as any);
            
            return (
              <div key={s.id} className="flex items-center gap-2 shrink-0 px-2">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border",
                  isActive && "bg-primary border-primary text-primary-foreground scale-110",
                  isCompleted && "bg-primary/20 border-primary text-primary",
                  !isActive && !isCompleted && "bg-muted border-border text-muted-foreground"
                )}>
                  {isCompleted ? <CheckCircle2 size={16} /> : i + 1}
                </div>
                <span className={cn(
                  "text-sm font-medium hidden md:inline",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}>
                  {s.label}
                </span>
                {i < 3 && <ChevronRight className="text-muted-foreground/30 mx-2 hidden md:block" size={16} />}
              </div>
            );
          })}
        </div>
      )}
      
      <AnimatePresence mode="wait">
        <div key={step}>
          {renderStep()}
        </div>
      </AnimatePresence>
    </div>
  );
}
