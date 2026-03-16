const experiences = [
    {
        title: 'Software Engineer',
        company: 'ChiroHD',
        location: 'Remote',
        timeframe: 'Apr 2024 - Present',
        highlights: [
            'Architected and implemented automated ERA ingestion workflows converting X12 remittance files into structured EOBs, eliminating manual data entry for 2,500+ chiropractic clinics.',
            'Designed a configurable rules engine to allocate insurance remittances across procedures, supporting default and clinic-specific business logic at scale.',
            'Built a queue-based Twilio SMS processing system using AWS SQS and Lambda to manage burst traffic and track patient opt-in/out status, ensuring compliant and reliable clinic messaging.',
            'Contributed to the design and implementation of a double-entry accounting system used to track all financial transactions across the platform, including payments, transfers, refunds, and taxes.',
            'Enhanced platform security by implementing app-based MFA using AWS Cognito, improving account protection for patient and billing data.',
            'Partnered directly with clinics to analyze complex billing workflows and translate operational requirements into scalable product improvements.',
        ],
    },
    {
        title: 'Software Engineer',
        company: 'Thomson Reuters',
        location: 'Hybrid',
        timeframe: 'Jan 2021 - Apr 2024',
        highlights: [
            'Modernized legacy data workflows by migrating acquisition and distribution systems from on-prem infrastructure to AWS, enabling scalable processing of 250M+ documents annually.',
            'Developed a shared performance monitoring library used across multiple microservices to track execution times of critical operations, reducing court docket ingestion latency from 3 minutes to 15 seconds and lowering cloud compute costs by $10K+ in 2023.',
            'Architected and implemented a secure upload portal using Spring Boot and AWS S3 that enabled external partners to submit datasets, triggering automated data processing pipelines for downstream systems.',
            'Designed a shared Python workspace in AWS S3 for Selenium-based web scraping pipelines used by 50+ developers, centralizing reusable modules and reducing duplicated logic across 1,000+ scraper projects.',
        ],
    },
    {
        title: 'Software Engineer Intern (Thomson Reuters)',
        company: 'Maverick Software Consulting',
        location: 'Minneapolis, MN',
        timeframe: 'May 2019 - Dec 2020',
        highlights: [
            'Designed and implemented the first automated test suites for the CLEAR public-records platform using Java and TestNG, introducing automated code coverage and real-data regression testing across previously untested systems.',
            'Developed CI-driven testing pipelines using Gradle and Jenkins to execute automated test suites against multiple applications, improving reliability and enabling early defect detection.',
            'Created onboarding documentation and trained new engineers on internal tooling, coding standards, and secure handling of PII within large-scale public records systems.',
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
