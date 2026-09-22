"use client"
import React, { FC, useState } from 'react';
import {
    Terminal,
    Check,
    Copy,
    ExternalLink,
    Zap,
    Lock,
    ShieldCheck,
    CheckCircle2,
    Code2,
    Layers,
    Cpu,
    ChevronDown,
    RefreshCw,
    ArrowUpRight,
    Radio,
    FileCode,
    AlertCircle,
    Share2,
    Server,
    ArrowRightFromLine,
    ArrowUpRightFromSquareIcon
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface InquiryOption {
    id: string;
    title: string;
    description: string;
    category: string;
    iconName: 'code' | 'cpu' | 'layers';
}

export interface FormState {
    name: string;
    email: string;
    projectType: string;
    message: string;
}

export interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export type TransmissionStage = 'idle' | 'encrypting' | 'transmitting' | 'success';

export interface SocialLink {
    name: string;
    handle: string;
    url: string;
    icon: string;
}

export interface ToastNotification {
    id: number;
    message: string;
    type: 'info' | 'success' | 'warning';
}

const PROJECT_TYPES: string[] = [
    "Full-Stack Web Application",
    "Modern Front-end Development",
    "Collaboration",
    "System Architecture & Scaling",
    "Engineering Leadership & Advisory",
];

const INQUIRY_OPTIONS: InquiryOption[] = [
    {
        id: "fullstack",
        title: "Full-Stack Web Application",
        description: "Open to select client projects, engineering leadership, or high-impact full-stack contracts. Have an idea, a codebase that needs scaling, or want to discuss modern systems architecture? Reach out.",
        category: "Core Service",
        iconName: "code"
    },
    {
        id: "architecture",
        title: "System Architecture & Scaling",
        description: "Open to select client projects, engineering leadership, or high-impact full-stack contracts. Have an idea, a codebase that needs scaling, or want to discuss modern systems architecture? Reach out.",
        category: "Infrastructure",
        iconName: "cpu"
    },
    {
        id: "leadership",
        title: "Engineering Leadership & Advisory",
        description: "Open to select client projects, engineering leadership, or high-impact full-stack contracts. Have an idea, a codebase that needs scaling, or want to discuss modern systems architecture? Reach out.",
        category: "Advisory",
        iconName: "layers"
    }
];

const SOCIAL_LINKS: SocialLink[] = [
    { name: "GitHub", handle: "cyril@-cyril9-dev", url: "https://github.com", icon: "github" },
    { name: "X / Twitter", handle: "@alexchen_tech", url: "https://twitter.com", icon: "twitter" },
    { name: "LinkedIn", handle: "in/alexchen-eng", url: "https://linkedin.com", icon: "linkedin" },
];

const CustomStyles: FC = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

    .font-mono {
      font-family: 'Fira Code', monospace;
    }

    .font-sans {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .custom-scrollbar::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #080d11;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #1a2630;
      border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #00ff88;
    }

    .scanline-grid {
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 24px 24px;
    }

    .neon-glow-soft {
      box-shadow: 0 0 15px rgba(0, 255, 136, 0.12);
    }
    .neon-glow-strong {
      box-shadow: 0 0 30px rgba(0, 255, 136, 0.25);
    }
    .white-btn-glow {
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.25);
    }
    .white-btn-glow:hover {
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.5), 0 0 15px rgba(0, 255, 136, 0.3);
    }

    @keyframes cursorBlink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .animate-terminal-cursor {
      animation: cursorBlink 1s infinite;
    }
  `}</style>
);

export default function ContactMe() {
    const [formState, setFormState] = useState<FormState>({
        name: 'Alex Chen',
        email: 'alex@company.com',
        projectType: 'Full-Stack Web Application',
        message: ''
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [selectedOptionId, setSelectedOptionId] = useState<string>('fullstack');
    const [viewMode, setViewMode] = useState<'form' | 'json'>('form');
    const [transmissionStage, setTransmissionStage] = useState<TransmissionStage>('idle');
    const [transmissionLog, setTransmissionLog] = useState<string[]>([]);
    const [copiedLink, setCopiedLink] = useState<string | null>(null);
    const [toasts, setToasts] = useState<ToastNotification[]>([]);
    const [referenceId, setReferenceId] = useState<string>('');

    const addToast = (message: string, type: 'info' | 'success' | 'warning' = 'info') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3200);
    };

    const validate = (): boolean => {
        const errors: FormErrors = {};
        if (!formState.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!formState.email.trim()) {
            errors.email = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
            errors.email = 'Please enter a valid email';
        }
        if (!formState.message.trim()) {
            errors.message = 'Please provide message details';
        } else if (formState.message.length < 10) {
            errors.message = 'Message must be at least 10 characters';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));

        if (formErrors[name as keyof FormErrors]) {
            setFormErrors((prev) => ({ ...prev, [name]: undefined }));
        }

        if (name === 'projectType') {
            const matchedOption = INQUIRY_OPTIONS.find((opt) => opt.title === value);
            if (matchedOption) {
                setSelectedOptionId(matchedOption.id);
            }
        }
    };

    const handleScopeSelect = (option: InquiryOption) => {
        setSelectedOptionId(option.id);
        setFormState((prev) => ({ ...prev, projectType: option.title }));
        addToast(`Selected scope: ${option.title}`, 'info');
    };

    const handleCopySocial = (link: SocialLink) => {
        navigator.clipboard.writeText(link.handle);
        setCopiedLink(link.name);
        addToast(`Copied ${link.name} handle: ${link.handle}`, 'success');
        setTimeout(() => setCopiedLink(null), 2000);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) {
            addToast('Please fix errors in the form before transmitting.', 'warning');
            return;
        }

        setTransmissionStage('encrypting');
        setTransmissionLog(['> Initializing TLS 1.3 handshake...', '> Generating ephemeral ECC public keys...']);

        setTimeout(() => {
            setTransmissionStage('transmitting');
            setTransmissionLog((prev) => [
                ...prev,
                '> AES-256-GCM cipher buffer locked.',
                '> Sending payload packet to backend endpoint...'
            ]);
        }, 1200);

        setTimeout(() => {
            const generatedId = 'REQ_' + Math.random().toString(36).substring(2, 9).toUpperCase();
            setReferenceId(generatedId);
            setTransmissionStage('success');
            setTransmissionLog((prev) => [
                ...prev,
                `> HTTP 200 OK. Reference ID: ${generatedId}`,
                '> Dispatch completed successfully.'
            ]);
            addToast('Inquiry payload transmitted successfully!', 'success');
        }, 2600);
    };

    const handleReset = () => {
        setTransmissionStage('idle');
        setFormState({
            name: 'Alex Chen',
            email: 'alex@company.com',
            projectType: 'Full-Stack Web Application',
            message: ''
        });
        setFormErrors({});
    };

    return (
        <div className="relative overflow-x-hidden flex w-full mt-10" id="contact">
            <CustomStyles />

            <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`tracking-widest text-xs px-4 py-3 rounded-lg shadow-2xl flex items-center gap-2.5 border transition-all animate-bounce ${t.type === 'success'
                            ? 'bg-background border-border text-primary'
                            : t.type === 'warning'
                                ? 'bg-background border-destructive text-amber-400'
                                : 'bg-background border-chart-4 '
                            }`}
                    >
                        <Terminal size={14} className="shrink-0 animate-pulse" />
                        <span>{t.message}</span>
                    </div>
                ))}
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-1 gap-8 lg:gap-12 items-start relative z-10">



                <div className="w-full lg:col-span-6 flex flex-col space-y-6 sm:space-y-7">


                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-10">
                        <div className="flex items-center gap-3">
                            <p className="text-xl font-bold tracking-widest">GET IN TOUCH</p>
                            <span className="w-7 h-0.5 rounded-2xl bg-primary inline-block"></span>
                        </div>
                        <p className="text-foreground/65 text-sm tracking-wide">Available for freelance & full-time roles</p>
                    </div>

                    <div className="space-y-1">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide">
                            Let's build something
                        </h1>
                        <h1 className="text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight text-primary leading-tight">
                            exceptional together.
                        </h1>
                    </div>

                    <p className="text-foreground/65 text-sm sm:text-base tracking-wide">
                        Open to select client projects, engineering leadership, or high-impact full-stack contracts. Have an idea, a codebase that needs scaling, or want to discuss modern systems architecture? Reach out.
                    </p>


                    <Badge variant={"outline"} className='p-3 flex gap-3'>

                        <div className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-chart-4" />
                        </div>
                        <div className="font-mono text-[10px] sm:text-xs font-bold tracking-wider text-primary">
                            STATUS: ACCEPTING NEW PROJECTS
                        </div>

                    </Badge>


                    <div className="space-y-3.5 pt-2">
                        {INQUIRY_OPTIONS.map((card) => {
                            const isSelected = selectedOptionId === card.id;
                            return (
                                <div
                                    key={card.id}
                                    onClick={() => handleScopeSelect(card)}
                                    className={`group relative p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer ${isSelected
                                        ? 'border-border '
                                        : ' border-border hover:border-border hover:bg-secondary'
                                        }`}
                                >

                                    <div
                                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 rounded-r-full transition-all duration-300 ${isSelected ? 'bg-primary ' : 'bg-transparent group-hover:bg-slate-700'
                                            }`}
                                    />

                                    <div className="flex items-start gap-3.5 pl-2">

                                        <div className={`p-2 rounded-lg mt-0.5 transition-colors ${isSelected ? 'bg-[#00ff88]/15 text-primary' : 'bg-muted text-foreground/65 group-hover:text-slate-300'
                                            }`}>
                                            {card.iconName === 'code' && <Code2 size={18} />}
                                            {card.iconName === 'cpu' && <Cpu size={18} />}
                                            {card.iconName === 'layers' && <Layers size={18} />}
                                        </div>

                                        <div className="space-y-1.5 flex-1">
                                            <div className="flex items-center justify-between gap-2">
                                                <h3 className={`text-xs sm:text-sm font-semibold transition-colors font-mono ${isSelected ? 'text-primary' : 'text-slate-200 group-hover:text-white'
                                                    }`}>
                                                    {card.title}
                                                </h3>
                                                <Button variant={"outline"} className="text-[11px] font-mono text-sidebar-accent-foreground">
                                                    {card.category}
                                                </Button>
                                            </div>

                                            <p className="text-xs text-slate-400 leading-relaxed font-mono line-clamp-3 sm:line-clamp-none">
                                                {card.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    { }
                    <div className="pt-2">
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                            {SOCIAL_LINKS.map((link) => (
                                <Button
                                    key={link.name}
                                    variant={"outline"}
                                    type="button"
                                    onClick={() => handleCopySocial(link)}
                                    className="group flex items-center gap-2  font-mono text-xs transition-all hover:border-border hover:text-primary hover:bg-background active:scale-95 cursor-pointer"
                                    title={`Copy ${link.name} handle: ${link.handle}`}
                                >
                                    <span>{link.name}</span>
                                    {copiedLink === link.name ? (
                                        <Check size={13} className="text-primary" />
                                    ) : (
                                        <ArrowUpRightFromSquareIcon size={13} className=" group-hover:text-primary transition-colors" />
                                    )}
                                </Button>
                            ))}
                        </div>
                    </div>

                </div>



                <div className="lg:col-span-6 w-full">
                    <div className="relative rounded-2xl  border border-border shadow-2xl overflow-hidden transition-all duration-300 hover:border-chart-5">


                        <div className="flex items-center justify-between px-4 py-3  border-b border-border">

                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/30 hover:opacity-80 cursor-pointer" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/30 hover:opacity-80 cursor-pointer" />
                                <div className="w-3 h-3 rounded-full bg-primary border border-border hover:opacity-80 cursor-pointer" />
                            </div>


                            <div className="flex items-center gap-2 font-mono  text-[14px]">
                                <FileCode size={19} className="text-primary" />
                                <span className=" font-semibold">send_inquiry.sh</span>
                            </div>


                            <div className="flex items-center gap-2">
                                <Button
                                    variant={"outline"}
                                    type="button"
                                    onClick={() => setViewMode((prev) => (prev === 'form' ? 'json' : 'form'))}
                                    className="font-mono text-[12px] h-8"
                                    title="Toggle raw JSON preview"
                                >
                                    {viewMode === 'form' ? '{ } JSON' : 'Form'}
                                </Button>
                                <Button variant={"outline"} className="font-mono text-[12px] h-8 text-primary">
                                    bash
                                </Button>
                            </div>
                        </div>


                        <div className="p-5 sm:p-7 relative  flex flex-col justify-between">


                            {(transmissionStage === 'encrypting' || transmissionStage === 'transmitting') && (
                                <div className="absolute inset-0 z-30  backdrop-blur-sm p-6 flex flex-col items-center justify-center space-y-4 font-mono text-xs">
                                    <div className="p-3.5 rounded-full  text-primary neon-glow-strong animate-pulse">
                                        <Radio size={30} className="animate-spin" />
                                    </div>
                                    <div className="text-primary font-bold text-sm tracking-wider">
                                        {transmissionStage === 'encrypting' ? 'ENCRYPTING PAYLOAD BUFFER' : 'DISPATCHING TLS PACKETS'}
                                    </div>

                                    <div className="w-full max-w-sm bg-background border border-border rounded-lg p-3.5 space-y-2 text-left text-slate-400 text-[11px] font-mono">
                                        {transmissionLog.map((log, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <span className="text-primary">{log}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            { }
                            {transmissionStage === 'success' ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-5 py-8 font-mono">
                                    <div className="w-16 h-16 rounded-2xl bg-background border border-[#00ff88]/40 flex items-center justify-center text-primary neon-glow-soft">
                                        <CheckCircle2 size={36} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold ">Payload Received!</h3>
                                        <p className="text-sm text-foreground/65 max-w-xl leading-relaxed">
                                            Thank you for reaching out. Your message has been encrypted and delivered directly to my queue.
                                        </p>
                                    </div>
                                    <div className="p-3.5 bg-secondary border border-border rounded-lg text-[14px] text-foreground/65 font-mono text-left w-full max-w-sm space-y-1.5">
                                        <div><span className="text-primary">STATUS:</span> 200 OK (Delivered)</div>
                                        <div><span className="text-primary">REF_ID:</span> {referenceId}</div>
                                        <div><span className="text-primary">EST_RESPONSE:</span> &lt; 24 Hours</div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-background  text-sm transition-all border border-border active:scale-95 cursor-pointer"
                                    >
                                        <RefreshCw size={14} />
                                        <span>Send Another Inquiry</span>
                                    </button>
                                </div>
                            ) : viewMode === 'json' ? (
                                <div className="flex-1 font-mono text-xs space-y-3">
                                    <div className="text-foreground/65 text-[11px]">// Live inspection of payload schema</div>
                                    <pre className="p-4 rounded-xl bg-secondary/20 border border-border text-primary overflow-x-auto custom-scrollbar leading-relaxed">
                                        {JSON.stringify({
                                            timestamp: new Date().toISOString(),
                                            sender: {
                                                name: formState.name || null,
                                                email: formState.email || null,
                                            },
                                            inquiry: {
                                                type: formState.projectType,
                                                message: formState.message || "Brief summary of your product goals...",
                                                charLength: formState.message.length
                                            },
                                            security: {
                                                tlsVersion: "TLS 1.3",
                                                cipher: "AES-256-GCM"
                                            }
                                        }, null, 2)}
                                    </pre>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5 font-mono">


                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">


                                        <div className="space-y-1.5">
                                            <label className="text-xs text-foreground/65 font-medium flex items-center justify-between">
                                                <span className="flex items-center gap-1.5 text-sm">
                                                    Your Name
                                                    <span className="text-primary">*</span>
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formState.name}
                                                onChange={handleInputChange}
                                                placeholder="Alex Chen"
                                                className={`w-full border rounded-lg px-3.5 py-2.5 text-xs placeholder-slate-600 focus:outline-none transition-all ${formErrors.name
                                                    ? 'border-destructive focus:border-destructive'
                                                    : 'border-border focus:border-primary '
                                                    }`}
                                            />
                                            {formErrors.name && (
                                                <span className="text-[10px] text-destructive flex items-center gap-1 mt-1">
                                                    <AlertCircle size={10} />
                                                    {formErrors.name}
                                                </span>
                                            )}
                                        </div>


                                        <div className="space-y-1.5">
                                            <label className="text-xs text-foreground/65 font-medium flex items-center justify-between">
                                                <span className="flex items-center gap-1.5">
                                                    Email Address
                                                    <span className="text-primary">*</span>
                                                </span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formState.email}
                                                onChange={handleInputChange}
                                                placeholder="alex@company.com"
                                                className={`w-full  border rounded-lg px-3.5 py-2.5 text-xs  placeholder-slate-600 focus:outline-none transition-all ${formErrors.email
                                                    ? 'border-destructive focus:border-destructive'
                                                    : 'border-border focus:border-primary'
                                                    }`}
                                            />

                                            {formErrors.email && (
                                                <span className="text-[10px] text-destructive flex items-center gap-1 mt-1">
                                                    <AlertCircle size={10} />
                                                    {formErrors.email}
                                                </span>
                                            )}
                                        </div>

                                    </div>


                                    <div className="space-y-1.5">
                                        <label className="text-sm text-foreground/65 font-medium flex items-center gap-1.5">
                                            <span>Project Type / Inquiry</span>
                                        </label>

                                        <div className="relative">
                                            <select
                                                name="projectType"
                                                value={formState.projectType}
                                                onChange={handleInputChange}
                                                className="w-full border border-border rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer pr-10"
                                            >
                                                {PROJECT_TYPES.map((type) => (
                                                    <option key={type} value={type} className="bg-secondary text-primary py-1">
                                                        {type}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <ChevronDown size={14} />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium flex items-center gap-1.5">
                                                <span>Message Details</span>
                                                <span className="text-primary">*</span>
                                            </label>
                                            <span className="text-[10px] text-primary">
                                                {formState.message.length} chars
                                            </span>
                                        </div>
                                        <textarea
                                            name="message"
                                            rows={5}
                                            value={formState.message}
                                            onChange={handleInputChange}
                                            placeholder="Brief summary of your product goals, scope, and timeline....."
                                            className={`w-full bg-background border rounded-lg p-3.5 text-sm text-text placeholder-slate-600 focus:outline-none transition-all resize-none custom-scrollbar leading-relaxed ${formErrors.message
                                                ? 'border-destructive focus:border-destructive'
                                                : 'border-border focus:border-border '
                                                }`}
                                        />
                                        {formErrors.message && (
                                            <span className="text-[10px] text-destructive flex items-center gap-1 mt-1">
                                                <AlertCircle size={10} />
                                                {formErrors.message}
                                            </span>
                                        )}
                                    </div>


                                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-border">

                                        <div className="flex items-center gap-2 text-[11px] text-primary">
                                            <span className="text-primary font-bold animate-terminal-cursor">&gt;</span>
                                            <Lock size={15} className="text-primary" />
                                            <span className="tracking-tight text-[13px]">Payload encrypted via TLS</span>
                                        </div>

                                        <Button type="submit" className="group relative inline-flex ">

                                            <span>Transmit Message</span>

                                            <Zap size={14} className="fill-black group-hover:scale-110 transition-transform text-black" />
                                        </Button>

                                    </div>

                                </form>
                            )}

                        </div>


                        <div className="px-4 py-2 bg-background border-t flex items-center justify-between text-[13px] font-mono text-text">

                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1">

                                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                                    UTF-8

                                </span>
                                <span>TTY: /dev/pts/1</span>
                            </div>

                            <div>
                                <span>SECURE_SHELL_V2</span>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}