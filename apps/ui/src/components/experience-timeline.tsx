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
        title: 'Full-Stack Software Engineer',
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
            'Architected automated ERA ingestion pipelines that parse X12 835 remittance files into structured EOB records, eliminating manual data entry for 1000+ chiropractic clinics and improving billing accuracy',
            'Built a queue-based Twilio MMS processing system using SQS and Lambda to manage burst traffic and track patient opt-in/out status, ensuring compliant and reliable clinic messaging',
            'Designed and implemented a configurable rules engine to allocate insurance remittances across procedures, supporting default and clinic-specific business logic at scale',
            'Contributed to the design and implementation of a double-entry accounting system used to track all financial transactions across the platform, including payments, transfers, refunds, and taxes',
            'Enhanced platform security by implementing app-based MFA using AWS Cognito, improving account protection for patient and billing data',
            'Partnered directly with clinics to analyze complex billing workflows and translate operational requirements into scalable product improvements',
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
            'Modernized legacy data workflows by migrating acquisition and distribution systems from on-prem infrastructure to AWS, enabling scalable processing of 250M+ documents annually',
            'Architected and implemented a secure upload portal using Spring Boot and AWS S3 that enabled external partners to submit datasets, triggering automated data processing pipelines for downstream systems',
            'Redesigned the court docket ingestion pipeline, reducing latency from 3 minutes to 15 seconds (12x faster) and enabling near real-time legal data delivery for customers',
            'Built a reusable performance monitoring library for distributed microservices (AWS Lambda, ECS) that enabled end-to-end timings of critical workflows, uncovering bottlenecks and duplicate processing that drove optimizations saving $10k+ in cloud costs annually',
            'Designed a shared Python workspace in AWS S3 for Selenium-based web scraping pipelines used by 50+ developers, centralizing reusable modules and reducing duplicated logic across 1,000+ scraper projects',
        ],
    },
    {
        title: 'Software Engineer Intern',
        company: 'Maverick Software Consulting',
        location: 'Minneapolis, MN',
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

export function ExperienceTimeline() {
    return (
        <section className="mt-10" id="experience-timeline">
            <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight text-ring sm:text-4xl">
                    My Professional Experience
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    A timeline of the roles, systems, and projects that shaped how I build software today.
                </p>
            </div>

            <div className="relative mt-10 pl-8 sm:pl-10">
                <div className="absolute top-6 bottom-0 left-4 w-px bg-border/80 sm:left-5" />

                <div className="space-y-8 sm:space-y-10">
                    {experiences.map((experience) => (
                        <article className="relative" key={`${experience.company}-${experience.timeframe}`}>
                            <div className="absolute top-6 left-[-1.5rem] h-4 w-4 rounded-full border-2 border-background bg-ring sm:left-[-1.75rem]" />

                            <div className="rounded-2xl border border-border/80 bg-card/70 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm sm:p-6">
                                <div className="flex flex-col gap-1">
                                    <div className="space-y-1">
                                        <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xl font-semibold text-ring">
                                            <span>{experience.company}</span>
                                            <span className="text-xs font-medium text-muted-foreground">
                                                {experience.timeframe}
                                            </span>
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
                                    {experience.highlights.map((highlight) => (
                                        <li className="flex gap-2" key={highlight}>
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ring" />
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
