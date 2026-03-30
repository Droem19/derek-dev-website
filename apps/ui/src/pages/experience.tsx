import {
    Braces,
    Cloud,
    Database,
    DollarSign,
    type LucideIcon,
    MessageSquare,
    Server,
    TestTube2,
    Workflow,
} from 'lucide-react';

type ExperienceSkill = {
    label: string;
    icon: LucideIcon;
};

const experiences = [
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
        ] satisfies ExperienceSkill[],
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
        ] satisfies ExperienceSkill[],
        highlights: [
            'Modernized legacy data workflows by migrating acquisition and distribution systems from on-prem infrastructure to AWS, enabling scalable processing of 250M+ documents annually',
            'Architected and implemented a secure upload portal using Spring Boot and AWS S3 that enabled external partners to submit datasets, triggering automated data processing pipelines for downstream systems',
            'Redesigned the court docket ingestion pipeline, reducing latency from 3 minutes to 15 seconds (12x faster) and enabling near real-time legal data delivery for customers',
            'Built a reusable performance monitoring library for distributed microservices (AWS Lambda, ECS) that enabled end-to-end timings of critical workflows, uncovering bottlenecks and duplicate processing that drove optimizations saving $10k+ in cloud costs annually',
            'Designed a shared Python workspace in AWS S3 for Selenium-based web scraping pipelines used by 50+ developers, centralizing reusable modules and reducing duplicated logic across 1,000+ scraper projects',
        ],
    },
    {
        title: 'Software Engineer Intern (Thomson Reuters)',
        company: 'Maverick Software Consulting',
        location: 'Minneapolis, MN',
        timeframe: 'May 2019 - Dec 2020',
        skills: [
            { label: 'Java', icon: Braces },
            { label: 'Gradle + Jenkins', icon: Server },
            { label: 'Automation', icon: Workflow },
            { label: 'TestNG', icon: TestTube2 },
        ] satisfies ExperienceSkill[],
        highlights: [
            'Designed and implemented the first automated test suites for the CLEAR public-records platform using Java and TestNG, introducing automated code coverage and real-data regression testing across previously untested systems',
            'Developed CI-driven testing pipelines using Gradle and Jenkins to execute automated test suites against multiple applications, improving reliability and enabling early defect detection',
            'Created onboarding documentation and trained new engineers on internal tooling, coding standards, and secure handling of PII within large-scale public records systems',
        ],
    },
];

export function ExperiencePage() {
    return (
        <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <section className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight">Experience</h1>
                <p className="text-muted-foreground">A quick overview of my professional background.</p>
            </section>

            <section className="mt-8 space-y-4">
                {experiences.map((experience) => (
                    <article
                        className="rounded-xl border-2 bg-card p-5 text-card-foreground"
                        key={`${experience.company}-${experience.timeframe}`}
                    >
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <h2 className="font-medium">{experience.title}</h2>
                            <p className="text-sm text-muted-foreground">{experience.timeframe}</p>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {experience.company} - {experience.location}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {experience.skills.map((skill) => {
                                const Icon = skill.icon;

                                return (
                                    <span
                                        className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-black/10 px-2.5 py-1 text-xs text-muted-foreground"
                                        key={skill.label}
                                    >
                                        <Icon className="h-3.5 w-3.5 text-ring" />
                                        {skill.label}
                                    </span>
                                );
                            })}
                        </div>
                        <ul className="mt-3 space-y-2 pl-5 text-sm leading-relaxed">
                            {experience.highlights.map((highlight) => (
                                <li className="list-disc" key={highlight}>
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </section>
        </section>
    );
}
