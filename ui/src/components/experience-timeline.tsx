import {
    Braces,
    Cloud,
    Database,
    DollarSign,
    type LucideIcon,
    MapPin,
    MessageSquare,
    Server,
    TestTube2,
    Workflow,
} from 'lucide-react';
import { useState } from 'react';

type ExperienceSkill = {
    label: string;
    icon: LucideIcon;
};

type ExperienceItem = {
    title: string;
    company: string;
    location: string;
    timeframe: string;
    skills: ExperienceSkill[];
    highlights: string[];
};

const experiences: ExperienceItem[] = [
    {
        title: 'Software Engineer',
        company: 'ChiroHD',
        location: 'Remote',
        timeframe: 'Apr 2024 - Present',
        skills: [
            { label: 'TypeScript', icon: Braces },
            { label: 'Node.js', icon: Braces },
            { label: 'AWS', icon: Cloud },
            { label: 'X12/ERA', icon: Database },
            { label: 'Twilio MMS', icon: MessageSquare },
        ],
        highlights: [
            'Architected ERA ingestion pipelines to process X12 835 remittance files into structured EOB records, eliminating manual data entry and improving billing accuracy for 2,500+ chiropractic clinics',
            'Built a queue-based Twilio messaging system with SQS and Lambda supporting 1M+ messages per month while tracking delivery and patient opt-in/out status',
            'Developed core components of a double-entry accounting system for tracking payments, transfers, refunds, and taxes across the platform',
            'Led a platform-wide migration from Node.js 20 to 24 ahead of AWS Lambda runtime deprecation, while replacing Serverless v3 with Open Serverless (osls) to save $2.5K+ in annual licensing costs',
            'Designed and implemented a configurable rules engine for insurance remittance allocation, enabling clinics to customize billing behavior without requiring engineering changes',
            'Partnered directly with clinics to identify pain points in insurance billing workflows, shape product requirements, and translate operational needs into scalable product improvement',
        ],
    },
    {
        title: 'Software Engineer',
        company: 'Thomson Reuters',
        location: 'Hybrid',
        timeframe: 'Jan 2021 - Apr 2024',
        skills: [
            { label: 'Java', icon: Braces },
            { label: 'Python', icon: Braces },
            { label: 'AWS', icon: Cloud },
            { label: 'Spring Boot', icon: TestTube2 },
            { label: 'Cost Optimization', icon: DollarSign },
        ],
        highlights: [
            'Modernized legacy data workflows by migrating acquisition and distribution systems from on-premises infrastructure to AWS, enabling scalable processing of 300M+ documents annually',
            'Architected a secure upload portal using Spring Boot and S3, replacing manual partner data transfers with a self-service workflow that automatically triggered downstream processing pipelines',
            'Redesigned the court docket ingestion pipeline, reducing latency from 3 minutes to 15 seconds (12× faster), enabling near real-time legal data delivery for customers',
            'Built a reusable performance monitoring library for microservices running on AWS Lambda and ECS, uncovering workflow bottlenecks and duplicate processing that drove $10K+ in annual cloud cost savings',
            'Designed a cloud-based Python workspace used by 50+ developers, centralizing reusable modules and reducing duplicated code across 1,000+ Selenium-based web scraping projects',
        ],
    },
    {
        title: 'Software Engineer Intern',
        company: 'Maverick Software Consulting',
        location: 'Mankato, MN',
        timeframe: 'May 2019 - Dec 2020',
        skills: [
            { label: 'Java', icon: Braces },
            { label: 'Gradle + Jenkins', icon: Server },
            { label: 'Automation', icon: Workflow },
            { label: 'TestNG', icon: TestTube2 },
        ],
        highlights: [
            'Designed and implemented the first automated test suites for the CLEAR public-records platform using Java and TestNG, introducing automated code coverage and real-data regression testing across previously untested systems',
            'Developed CI-driven testing pipelines using Gradle and Jenkins to execute automated test suites against multiple applications, improving reliability and enabling early defect detection',
            'Created onboarding documentation and trained new engineers on internal tooling, coding standards, and secure handling of PII within large-scale public records systems',
        ],
    },
];

const HIGHLIGHT_PREVIEW_COUNT = 3;

function ExperienceCard({ experience }: { experience: ExperienceItem }) {
    const [expanded, setExpanded] = useState(false);
    const visibleHighlights = expanded
        ? experience.highlights
        : experience.highlights.slice(0, HIGHLIGHT_PREVIEW_COUNT);

    return (
        <article className="relative" key={`${experience.company}-${experience.timeframe}`}>
            <div className="absolute top-0 left-[-1.5rem] h-4 w-4 rounded-full border-2 border-background bg-ring sm:left-[-1.75rem]" />

            <div className="rounded-2xl border border-border/80 bg-card/70 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm sm:p-6">
                <div className="flex flex-col gap-1">
                    <div className="space-y-1">
                        <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xl font-semibold">
                            <span className="text-ring-gradient">{experience.company}</span>
                            <span className="text-xs font-medium text-muted-foreground">{experience.timeframe}</span>
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                            <p className="text-base font-medium text-foreground">{experience.title}</p>
                            <span aria-hidden="true" className="text-muted-foreground/70">
                                -
                            </span>
                            <p className="inline-flex items-center gap-1.5 text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5 text-ring" />
                                {experience.location}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {experience.skills.map((skill) => {
                        const Icon = skill.icon;

                        return (
                            <span
                                className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-black/15 px-2.5 py-1 text-xs text-muted-foreground"
                                key={skill.label}
                            >
                                <Icon className="h-3.5 w-3.5 text-ring" />
                                {skill.label}
                            </span>
                        );
                    })}
                </div>

                <ul className="mt-5 space-y-2 text-sm leading-6 text-muted-foreground">
                    {visibleHighlights.map((highlight) => (
                        <li className="flex gap-2" key={highlight}>
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ring" />
                            <span>{highlight}</span>
                        </li>
                    ))}
                </ul>

                {experience.highlights.length > HIGHLIGHT_PREVIEW_COUNT ? (
                    <button
                        className="mt-4 inline-flex items-center rounded-md border border-border/70 bg-white/[0.03] px-2.5 py-1 text-xs font-semibold text-muted-foreground transition-[transform,box-shadow,border-color,background-color,color] duration-200 ease-out hover:-translate-y-0.5 hover:border-border hover:bg-white/[0.08] hover:text-foreground active:translate-y-0"
                        onClick={() => setExpanded((current) => !current)}
                        type="button"
                    >
                        {expanded ? 'Show less' : 'Show more'}
                    </button>
                ) : null}
            </div>
        </article>
    );
}

export function ExperienceTimeline() {
    return (
        <section className="mt-10" id="experience-timeline">
            <div className="space-y-2">
                <h2 className="text-ring-gradient text-center text-3xl font-semibold tracking-tight sm:text-4xl">
                    My Professional Experience
                </h2>
            </div>

            <div className="relative mt-10 pl-8 sm:pl-10">
                <div className="absolute top-0 bottom-0 left-4 w-px bg-border/80 sm:left-5" />

                <div className="space-y-8 sm:space-y-10">
                    {experiences.map((experience) => (
                        <ExperienceCard experience={experience} key={`${experience.company}-${experience.timeframe}`} />
                    ))}
                </div>
            </div>
        </section>
    );
}
